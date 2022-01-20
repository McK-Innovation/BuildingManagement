const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const cors = require('cors');
const {string} = require("prop-types");
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
const { request } = require('express');
const session = require('express-session')
const Keycloak = require('keycloak-connect')
const memoryStore = new session.MemoryStore();
//Api Setup + helper functions

// let kcConfig = {
//     ​clientId: 'react',
//     ​bearerOnly: true,
//     ​serverUrl: 'http://localhost:8080/auth',
//     ​realm: 'myrealm',
//     ​realmPublicKey: 'MIIBIjANB...'
// ​};

const key = {
    url: 'http://localhost:8080',
    realm: 'McKenneys',
    clientId: 'react',
    sslRequired: "external",
    publicClient: true,
    confidentialPort: 0,
}

var keycloak = new Keycloak({store: memoryStore}, key)

let baseUrl = 'http://localhost:8080/auth' //will change in the future (env variable)

/*app.use(
    cors({
        origin: 'http://localhost',
        credentials: true,
    })
);*/
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

app.use(keycloak.middleware());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => {
    return res.send('pong')
})

app.get('/', keycloak.checkSso(), (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

async function makeRequest(method, headers = "", body, url, type = "", refresh = "") {
    let myHeaders;
    myHeaders =  new fetch.Headers();
    let requestConfig = {}
    let urlencoded2 = new URLSearchParams();

    if(method === "POST" || method === "PUT") {
    
        if(type === "Add" || type === "Edit") {
            console.log("Add/Edit selected")
            myHeaders.append("Content-Type", "application/json");
            body = JSON.stringify(body)
            requestConfig= {
                method: method,
                body: body,
                redirect: "follow"
            }
        }
        else if(type !== "Add") {
            Object.entries(body).map(([k, v = string]) => {
                urlencoded2.append(k, v)
            })
            requestConfig = {
                method: method,
                body: urlencoded2,
                redirect: "follow"
            }
        }
    }

    else if(method === "GET" || method === "DELETE") {
        requestConfig = {
            method: method,
            redirect: "follow",
            headers: myHeaders
        }
    }
    if(headers != "") {
        myHeaders.append("Authorization", "Bearer " + headers);
        requestConfig.headers = myHeaders;
    }
    try {
        let response = await fetch(baseUrl + url, requestConfig)
    
        if(response.status == 201 || response.status == 204){
            console.log("1")
            return "Resource Created"
        }
        else if(response.status != 200) {
            
            if(response.status != 401){
                console.log(response.status)
                return ({error: "Status" + " " + response.status + ': ' + response.statusText})
            }
        }
        
        if(response.status == 401 && type == "login") {
            console.log('error')
            return ({error: "Username/Password combination incorrect: Try Again"})
        }
        else if(response.status == 401 && type != "login") {
            console.log("4")
            let newBody = {
                client_id: "react",
                grant_type: "refresh_token",
                refresh_token: refresh
            }
            let repeatUrl = '/realms/McKenneys/protocol/openid-connect/token'
            let refreshTok = await makeRequest("POST", "", newBody, baseUrl + repeatUrl, "","")
            let newResponse = await makeRequest(method, refreshTok, body, url, type, refresh)
            newResponse = newResponse.json()
            return {newResponse, refreshTok }
        }
        else {
            console.log("5")
            response = await response.json()
            console.log(response)
            if (type === "login") {
                let tok = response.access_token;
                let expire = response.expires_in;
                let refresh = response.refresh_token
                return {tok, expire, refresh}
            } else
            console.log("error")
                return response;
        }
    }

    catch (error) {
        return error
    }
}

async function login (request) {
    let body = {
        username: request.username,
        password: request.password,
        client_id: "admin-cli",
        grant_type: "password",
    }
    try {
        let token = await makeRequest("POST", "", body, '/realms/McKenneys/protocol/openid-connect/token', "login","")
        return token
    }
    catch (error) {
        return error
    }
}
async function getUser(request) {
    try {
    let user = await makeRequest("GET", request.token, {}, '/admin/realms/McKenneys/users?username=' + request.username, "", request.refresh)
    console.log(request.username)
    return user
    }
    catch(error)
    {return error}
}

async function getUserRevised(request) {
    try {
    let users = await makeRequest("GET", request.token, {}, '/admin/realms/McKenneys/users', "", request.refresh)
    let person = null;
    for(let user of users) {
        if(user.username.toLowerCase() == request.username.toLowerCase()) {
            person = user
        }
    }
    return person
    }
    catch(error)
    {return error}
}
async function getGroupRevised(request) {
    try {
    let group = await makeRequest("GET", request.token, {}, '/admin/realms/McKenneys/users', "", request.refresh)
    return group
    }
    catch(error)
    {return error}
}


async function getGroup(request) {
    try {
    console.log(request.userId)
    let group = await makeRequest("GET", request.token, {}, '/admin/realms/McKenneys/users/' + request.userId + '/groups', "", request.refresh)
    return group
    }
    catch(error) {
        return error
    }
}

async function getSubGroups(request) {
    try {
        let subgroups = await makeRequest('GET', request.token, {}, '/admin/realms/McKenneys/groups/' + request.groupId , request.refresh)
        return subgroups
    } catch (error) {
        return error
    }
}

async function getMembers(request) {
    try {
    let members = await makeRequest("GET", request.token, {}, '/admin/realms/McKenneys/groups/' + request.groupId + '/members',"", request.refresh)
    return members
    }
    catch(error) {
        return error
    }
}

async function deleteUser(request) {
    try {
    let userDeleteRes = await makeRequest("DELETE", request.token,{},'/admin/realms/McKenneys/users/' + request.userID,"", request.refresh)
    return userDeleteRes
    }
    catch(error) {
        return error
    }
}

async function addUser(request) {
    try {
    let add = await makeRequest("POST", request.token, request.body, '/admin/realms/McKenneys/users', "Add", request.refresh)
    console.log(request.body)
    return add
    }
    catch(error) {
        return error
    }
}

async function updateUserPermission(request) {
    try {
    let update = await makeRequest("PUT", request.token, request.groupPermission, "/admin/realms/McKenneys/users/" + request.userId, "Edit", request.refresh)
    console.log(request.groupPermission)
    return update
    }
    catch(error) {
        return error
    }
}

async function updateUser(request) {
    try {
    let update =  await makeRequest("PUT", request.token, request.body, "/admin/realms/McKenneys/users/" + request.userId, "Add", request.refresh)
    return update
    }
    catch(error) {
        return error
    }
}
async function updatePass(request) {
    try {
        let body = { type: "password", temporary: false, value: request.password }
        let update =  await makeRequest("PUT", request.token, body, "/admin/realms/McKenneys/users/" + request.userId + '/reset-password', "Add", request.refresh)
        return update
    }
    catch(error) {
        return error
    }
}
async function logout(request) {
    try {
    let logout =  await makeRequest('PUT', request.token, request.body, '/realms/McKenneys/protocol/openid-connect/logout',"", request.refresh)
    return logout
    }
    catch(error) {
        return error
    }
}

app.get('/api',(req,res) => {
    res.send('Backend is connected to React');
});

app.post('/api/login',async (req,res) => {
    let result = await login(req.body)
    console.log(result)
    res.json(result)
});


app.post('/api/getUser',async (req,res) => {
    let result = await getUser(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/getMembers',async (req,res) => {
    let result = await getMembers(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/deleteUser',async (req,res) => {
    let result = await deleteUser(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/addUser',async (req,res) => {
    let result = await addUser(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/updateUserPermission',async (req,res) => {
    let result = await updateUserPermission(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/updateUser',async (req,res) => {
    let result = await updateUser(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/logout',async (req,res) => {
    let result = await logout(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/getGroup',async (req,res) => {
    let result = await getGroup(req.body)
    console.log(result)
    res.json(result)
});
app.post('/api/getGroupRevised',async (req,res) => {
    let result = await getGroupRevised(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/getSubGroups', async (req,res) => {
    let result = await getSubGroups(req.body)
    console.log(result)
    res.json(result)
})

app.post('/api/getUserRevised',async (req,res) => {
    let result = await getUserRevised(req.body)
    console.log(result)
    res.json(result)
});

app.post('/api/updatePass',async (req,res) => {
    let result = await updatePass(req.body)
    console.log(result)
    res.json(result)
});



app.listen(port,() => console.log(`Listening on port ${port}`));

