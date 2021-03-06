import react from "react"
import {isEmptyArray} from "formik";

// let baseUrl = 'http://localhost:8080' //will change in the future
// let adminRoleId = 'ecb6edc2-594e-4ab5-a38d-141f32c793d7'
let refresh = ''

//checks the expiration date and if the token is expired, gets the refresh token and sets a new access token with it
export async function checkExpiration() {

    let expirationTime = await localStorage.getItem("expire")
    let timeOfLogin = await localStorage.getItem("timeNow")
    let timeNow = Date.now() / 1000;
    if(expirationTime <= Math.abs(timeNow - timeOfLogin)) {
        alert("Session Expired, Please login again")
        await logout()
        return Math.abs(timeNow - timeOfLogin)
    }


}

export function getToken() {

    return localStorage.getItem("token");
}

export function setToken(token) {

    localStorage.setItem("token", token)
}


export async function makeRequest(method, headers = "", body, url, type = "") {
    // //let urlencoded = new URLSearchParams();
    //
    // let res = '';
    // let myHeaders;
    // myHeaders =  new Headers();
    //
    // let requestConfig = {}
    // let urlencoded2 = new URLSearchParams();
    //
    //
    //
    // if(method === "POST" || method === "PUT") {
    //
    //     if(type !== "Add") {
    //
    //         console.log(type)
    //
    //         Object.entries(body).map(([k, v = string]) => {
    //             urlencoded2.append(k, v)
    //         })
    //
    //         requestConfig = {
    //             method: method,
    //             body: urlencoded2,
    //             redirect: "follow"
    //
    //         }
    //     }
    //
    //     else if(type === "Add" || type === "Edit") {
    //         console.log("Add/Edit selected")
    //         myHeaders.append("Content-Type", "application/json");
    //         body = JSON.stringify(body)
    //
    //         requestConfig= {
    //             method: method,
    //             body: body,
    //             redirect: "follow"
    //         }
    //     }
    //
    // }
    //
    // else if(method === "GET" || method === "DELETE") {
    //
    //     requestConfig = {
    //         method: method,
    //         redirect: "follow",
    //         headers: myHeaders
    //
    //     }
    // }
    //
    // if(headers !== "") {
    //
    //     myHeaders.append("Authorization", "Bearer " + headers);
    //     requestConfig.headers = myHeaders;
    // }
    //
    //
    //
    // let response = await fetch(baseUrl + url, requestConfig)
    //
    // response = await response.json()
    //
    // if (type === "login") {
    //     let tok = response.access_token;
    //     let expire =  response.expires_in;
    //     let refresh = response.refresh_token
    //     localStorage.setItem("expire", expire)
    //     localStorage.setItem('refresh', refresh)
    //
    //     return tok
    // }
    //
    // else
    //     return response;
    //
    //
    //
    //
    //

}

export async function login (request) {
    let res = await fetch('api/login', {method: 'POST', body: JSON.stringify(request), headers: {'Content-Type': 'application/json'}})
    res = await res.json()
    if (res.tok) {
        localStorage.setItem("username", request.username)
        let loginTime = Date.now() / 1000 //in seconds
        loginTime = loginTime.toString()
        localStorage.setItem("timeNow", loginTime)
        setToken(res.tok)
        localStorage.setItem("expire",res.expire)
        refresh = res.refresh
        // localStorage.setItem("refresh", res.refresh)
        return res
    }
    else {
        return res
    }
}

export async function isUserAdmin() {
    let token = getToken()
    let username = localStorage.getItem("username")
    let res = await fetch('api/getUser', {method: 'POST', body: JSON.stringify({token,username, refresh}), headers: {'Content-Type': 'application/json'}})
    res = await res.json()
    if(res.hasOwnProperty("error")){
        return res
    }
    if(res.permissionLevel.toLowerCase()!=='admin') {
        return false
    }
}

export async function getAllUsersInGroup () {
    let token = getToken()
    let username = localStorage.getItem("username")
    try {
        let res = await fetch('api/getUserRevised', {method: 'POST', body: JSON.stringify({token, username, refresh}), headers: {'Content-Type': 'application/json'}})
        // let user = await makeRequest("GET", getToken(), {}, '//admin/realms/McKenneys/users?username=' + localStorage.getItem("username"))
        res = await res.json()

        if(res.hasOwnProperty("error")){
            return res
        }
        localStorage.setItem("userId", res.id)
        if(res.hasOwnProperty("firstName")){
            localStorage.setItem("name", res.firstName)
        }
        else
        {
            localStorage.setItem("name",res.username)
        }
        // localStorage.setItem("userId", user.id)

        // if(res.attributes = )
        // localStorage.setItem("attributes", JSON.stringify(res.attributes))
        let userId = res.id
        console.log(userId)

        let groupRes = await fetch('api/getGroup', {method: 'POST', body: JSON.stringify({token, userId, refresh }), headers: {'Content-Type': 'application/json'}})
        // let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/McKenneys/users/' + user.id + '/groups')
        groupRes = await groupRes.json()
        // if empty array
        if(!groupRes || groupRes.length === 0) {
            alert("No one is currently in your group. Go to the Add tab to begin adding")
        }
        // if error
        else if(groupRes.hasOwnProperty("error")) {
            return groupRes
        }

        // if array exists
        else {
            if (groupRes && groupRes.length !==0) {
                localStorage.setItem("groupName", groupRes[0].name)
                // localStorage.setItem("groupArray", JSON.Stringify(groupRes))
                //start the second part of the function. Above works

                // let groupId = '97a5ba82-0b58-4264-9f4b-f3fb9aa01d07'
                let groupId = groupRes[0].id
                console.log(groupId);

                // let memberRes = await fetch('api/getGroupRevised', {method: 'GET'})

                let memberRes =  await fetch('api/getGroupRevised', {method: 'POST', body: JSON.stringify({token, groupId, refresh }), headers: {'Content-Type': 'application/json'}})
                // let members = await makeRequest("GET", getToken(), {}, '/admin/realms/McKenneys/groups/' + id + '/members')
                memberRes =  await memberRes.json()
                // memberRes = "hello"
                //return {id: group[0].id, name: group[0].name}//store this maybe
                return memberRes
            }
            
        }
    }
    catch(error) {
        console.log(error)
    }
    
    
    
    
    // let users =  await getUser()
    //needs username
    //     try {
        //         for (let val of users) {
            //             if (val.hasOwnProperty('username')) {
                //                 console.log(localStorage.getItem("username"))
                //                 console.log(val)
                //
                //                 if (val.username === localStorage.getItem("username").toLowerCase()) {
                    //                     console.log(val)
                    //
                    //                     localStorage.setItem("name", val.firstName)
                    //
                    //                     let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/McKenneys/users/' + val.id + '/groups')
                    //                     if (group) {
                        //                         console.log(group)
                        //                         //groupRef.current = group
                        //
                        //                         localStorage.setItem("groupName", group[0].name)
                        //                         //localStorage.setItem("groupID", group[0].id)
                        //
                        //
                        //
                        //                         console.log("found")
                        //
                        //                         //start the second part of the function. Above works
                        //
                        //                         let id = group[0].id
                        //
                        //                         let members =  await makeRequest("GET", getToken(), {}, '/admin/realms/McKenneys/groups/' + id + '/members'  )
                        //
                        //
                        //                         //return {id: group[0].id, name: group[0].name}//store this maybe
                        //                         return members;
                        //                     }
                        //                 } else {
                            //                     console.log("not found")
                            //                 }
                            //
                            //             }
                            //         }
                            //     }
                            //
                            // catch(error)
                            //         {
                                //             console.log(error)
                                //         }
                                
                            }

export async function getGroups () {
    let token = getToken();
    let userId = localStorage.getItem('userId')

    try {
    let groupRes = await fetch('api/getGroup', {method: 'POST', body: JSON.stringify({token, userId, refresh }), headers: {'Content-Type': 'application/json'}})
        // let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/McKenneys/users/' + user.id + '/groups')
        groupRes = await groupRes.json()
        // if empty array
        if(!groupRes || groupRes.length === 0) {
            alert("No one is currently in your group. Go to the Add tab to begin adding")
        }
        // if error
        else if(groupRes.hasOwnProperty("error")) {
            return groupRes
        }
    
    // let groupId = groupRes[0].id
    // let subGroups = await fetch('api/getSubGroups', {method: 'POST', body: JSON.stringify({token, groupId, refresh }), headers: {'Content-Type': 'application/json'}})

    // let subGroupsRes = await subGroups.json()

    // localStorage.setItem('subGroups', subGroupsRes)

    // console.log("hello" + subGroupsRes)

    return groupRes

    } catch (error) {
        console.log(error)
    }

}
                            
export async function deleteMember (userID){
                                
    //await client.users.delFromGroup({id: userID, groupId: groupID});
    let token = getToken()
    let deleteRes = await fetch('api/deleteUser', {method: 'POST', body: JSON.stringify({token, userID, refresh }), headers: {'Content-Type': 'application/json'}})
    deleteRes = await deleteRes.json()
    if(deleteRes.hasOwnProperty("error")) {
        return deleteRes
    }
    else {
        return "User Deleted Successfully"
    }
    // await makeRequest("DELETE", getToken(),{},'/admin/realms/McKenneys/users/' + userID)
}

export async function addUser (credentials = {username: '', email: '', password: '', firstName: '', lastName: '', groups: '',  permissionLevel: ''}) {
    let token = getToken()
    let userId = localStorage.getItem("userId")
    let username = credentials.username
    let groupName = localStorage.getItem('groupName')
    console.log(credentials.groups)
    let newGroups = credentials.groups.map(i => `/${i}`);

    let body = {

        "username": credentials.username,
        "enabled": true,
        "firstName": credentials.firstName,
        "lastName": credentials.lastName,
        "email": credentials.email,
        "credentials": [
        {
            "type": "password",
            "value": credentials.password,
            "temporary": true
        }

    ],
        "groups": newGroups

    }

    //adds the user
    console.log(body)
    let addRes = await fetch('api/addUser', {method: 'POST', body: JSON.stringify({token, body, refresh}), headers: {'Content-Type': 'application/json'}})
    addRes = await addRes.json()
    if(addRes.hasOwnProperty("error")) {
        return addRes
    }
        
    //finds the added user
    let getRes = await fetch('api/getUserRevised', {method: 'POST', body: JSON.stringify({token, username, refresh}), headers: {'Content-Type': 'application/json'}})
    getRes = await getRes.json()
    if(getRes.hasOwnProperty("error")){
        return getRes
    }
    if(getRes.hasOwnProperty("newResponse")) {
        setToken(getRes.refreshTok)
         getRes = getRes.newResponse
    }
    userId = getRes.id

    
    // removes the path name from each string containing it in the array and creates a new array
    // var resultArr = credentials.groups.map(function(x){return x.replace(`/${groupName}/`, '');});

        
    // sets the groupPermissions based on the array from credentials
    // let groupPermission = resultArr.reduce((acc,item,i) => {
    //     acc.attributes[`group${i}`]  = item;
    //     acc.attributes.permissionLevel = credentials.permissionLevel;
    //     return acc
    // },{attributes:{}})

    let groupRes = await fetch('api/getGroup', {method: 'POST', body: JSON.stringify({token, userId, refresh }), headers: {'Content-Type': 'application/json'}})
        // let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/McKenneys/users/' + user.id + '/groups')
        groupRes = await groupRes.json()
        // if empty array
        if(!groupRes || groupRes.length === 0) {
            alert("No one is currently in your group. Go to the Add tab to begin adding")
        }
        // if error
        else if(groupRes.hasOwnProperty("error")) {
            return groupRes
        }

    let attributeArray = []

    credentials.groups.forEach(userGroup => {
        console.log(userGroup)
        groupRes.forEach(groupObj => {
            console.log(groupObj)
            if(groupObj.name == userGroup) {
                console.log(groupObj.attributes)
                console.log(Object.values(groupObj.attributes).toString())
                // let stringValue = 
                let value = Object.values(groupObj.attributes).toString()
                let key = Object.keys(groupObj.attributes)
                let object = {}
                object[key] = value
                attributeArray.push(object)
            }
        })
    })

    console.log(attributeArray)

    let attributes = Object.assign({}, ...attributeArray)

    console.log(attributes)

    attributes.permissionLevel = credentials.permissionLevel

    let groupPermission = {
        attributes
    }

    // let groupPermission = {
    //     attributes: {
    //         group0: "TEST"
    //     }, 
    //     permissionLevel: "TEST"
    // }
        

    //edits the permission of found user
    let editRes = await fetch('api/updateUserPermission', {
        method: 'POST',
        body: JSON.stringify({token, userId, groupPermission, refresh}),
        headers: {'Content-Type': 'application/json'}
    })
    console.log("updated permission")
    // let editRes = await makeRequest("PUT", getToken(), groupPermission, "/admin/realms/McKenneys/users/" + userId, "Edit")
    editRes = await editRes.json()
    if (editRes.hasOwnProperty("error")) {
        return editRes
    }
    if (editRes.hasOwnProperty("newResponse")) {
        setToken(editRes.refreshTok)
        console.log("token reset")
        return "Added User"
    } else {
        return "Added User"
    }

}


export  async function updateIndividual(userId, credentials = {username: '', email: '', password: '', firstName: '', lastName: '', permissionLevel: ''}, ) {
    let object = {}
    let token = getToken()
    let adminId = localStorage.getItem("userId")
    

    for (let creds in credentials) {
        if (credentials[creds] !== '' && creds !== 'permissionLevel') {
            object[creds] = credentials[creds]

        }

        console.log(creds)
        console.log(object)
        if (creds === 'permissionLevel' || creds === 'currentGroups' && credentials[creds] !== '') {
            let groupName = localStorage.getItem('groupName')

            let groupRes = await fetch('api/getAdminGroups', {method: 'POST', body: JSON.stringify({token, adminId, refresh }), headers: {'Content-Type': 'application/json'}})
            // let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/McKenneys/users/' + user.id + '/groups')
            groupRes = await groupRes.json()
            // if empty array
            if(!groupRes || groupRes.length === 0) {
            alert("No one is currently in your group. Go to the Add tab to begin adding")
            }
            // if error
            else if(groupRes.hasOwnProperty("error")) {
                return groupRes
            }

            let attributeArray = []

            object.groups.forEach(userGroup => {
                console.log(userGroup)
                groupRes.forEach(groupObj => {
                    console.log(groupObj)
                    if(groupObj.name == userGroup) {
                        console.log(groupObj.attributes)
                        console.log(Object.values(groupObj.attributes).toString())
                        // let stringValue = 
                        let value = Object.values(groupObj.attributes).toString()
                        let key = Object.keys(groupObj.attributes)
                        let object = {}
                        object[key] = value
                        attributeArray.push(object)
                    }
                })
            })
        
            console.log(attributeArray)
        
            let attributes = Object.assign({}, ...attributeArray)
        
            console.log(attributes)
        
            attributes.permissionLevel = credentials.permissionLevel
        
            let groupPermission = {
                attributes
            }

            // var resultArr = body.currentGroups.map(function(x){return x.replace(`/${groupName}/`, '');});

            // let groupPermission = resultArr.reduce((acc,item,i) => {
            //     acc.attributes[`group${i}`]  = item;
            //     acc.attributes.permissionLevel = credentials.permissionLevel;
            //     return acc
            // },{attributes:{}})

            // let groupPermission = {
            //     attributes: {
            //         group0: "TEST"
            //     }, 
            //     permissionLevel: "TEST"
            // }
               

            let editRes = await fetch('api/updateUserPermission', {method: 'POST', body: JSON.stringify({token, userId, groupPermission, refresh }), headers: {'Content-Type': 'application/json'}})
            if(editRes.hasOwnProperty("error")) {
                console.log(editRes)
                return editRes
            }
            if(editRes.hasOwnProperty("newResponse")) {
                setToken(editRes.refreshTok)
                return editRes.newResponse
            }

            // await makeRequest("PUT", getToken(), groupPermission, "/admin/realms/McKenneys/users/" + userId, "Edit")

            console.log(object)
    const {password, ...body} = object
    console.log(password)
    console.log(body)
    if(password && password !== '') {
        let update = await fetch('api/updatePass', {method: 'POST', body: JSON.stringify({token, userId, password, refresh }), headers: {'Content-Type': 'application/json'}})
        if(update.hasOwnProperty("error")) {
            return update
        }
        if(update.hasOwnProperty("newResponse")) {
            setToken(update.refreshTok)
            return update.newResponse
        }
    }

    let newGroups = object.groups.map(i => `/${i}`);
    body.groups = newGroups

    let update = await fetch('api/updateUser', {method: 'POST', body: JSON.stringify({token, userId, body, refresh }), headers: {'Content-Type': 'application/json'}})
    // await makeRequest("PUT", getToken(), body, "/admin/realms/McKenneys/users/" + userId, "Add")

    update = await update.json()
    // error handling
    if(update.hasOwnProperty("error")) {
        return update
    }
    if(update.hasOwnProperty("newResponse")) {
        setToken(update.refreshTok)
        return update.newResponse
    }

            
        
        console.log(creds)

    // let groupId = 'd9753c5c-605a-4b4a-bb18-467365213338'

    let allGroupNames = []

    groupRes.forEach(groupObj => {
        allGroupNames.push(groupObj.name)
    })

    console.log(allGroupNames)

    let leaveGroups = allGroupNames.filter(val => !object.groups.includes(val))

    let keepGroups = allGroupNames.filter(val => object.groups.includes(val))

    console.log(keepGroups)

    console.log(leaveGroups)

    let leaveGroupIds = []
    let keepGroupIds = []

    leaveGroups.forEach(leaveGroup => {
        groupRes.forEach(groupObj => {
            if(groupObj.name === leaveGroup){
                leaveGroupIds.push(groupObj.id)
            }
        })
    })


    keepGroups.forEach(keepGroup => {
        groupRes.forEach(groupObj => {
            if(groupObj.name===keepGroup){
                keepGroupIds.push(groupObj.id)
            }
        })
    })

    if(keepGroups.length == 0) {
        alert('Are you sure you want to remove this user from every building?')
    }

    console.log(leaveGroupIds)
    await Promise.all(
    leaveGroupIds.forEach(async (groupId) => {
    let remove = await fetch('api/removeUserFromGroup', {method: 'POST', body: JSON.stringify({token, userId, groupId, refresh}), headers: {'Content-Type': 'application/json'}})
    remove = await remove.json()
    if(remove.hasOwnProperty("error")) {
        return remove
    }
    if(remove.hasOwnProperty("newResponse")) {
        setToken(remove.refreshTok)
        return remove.newResponse
    }

    },

    keepGroupIds.forEach(async (groupId) => {
            let add = await fetch('api/addUserToGroup', {method: 'POST', body: JSON.stringify({token, userId, groupId, refresh}), headers: {'Content-Type': 'application/json'}})
            add = await add.json()
            if(add.hasOwnProperty("error")) {
                return add
            }
            if(add.hasOwnProperty("newResponse")) {
                setToken(add.refreshTok)
                return add.newResponse
            }
        
            }
            )
    
    ))

    // console.log(keepGroupIds)
    // await Promise.all(
    //     keepGroupIds.forEach(async (groupId) => {
    //     let add = await fetch('api/addUserToGroup', {method: 'POST', body: JSON.stringify({token, userId, groupId, refresh}), headers: {'Content-Type': 'application/json'}})
    //     add = await add.json()
    //     if(add.hasOwnProperty("error")) {
    //         return add
    //     }
    //     if(add.hasOwnProperty("newResponse")) {
    //         setToken(add.refreshTok)
    //         return add.newResponse
    //     }
    
    //     }
    //     ))


}
    // console.log(body)
    // const {password, ...other} = body
    // console.log(password)
    // console.log(other)
    // if(password && password !== '') {
    //     let update = await fetch('api/updatePass', {method: 'POST', body: JSON.stringify({token, userId, password, refresh }), headers: {'Content-Type': 'application/json'}})
    //     if(update.hasOwnProperty("error")) {
    //         return update
    //     }
    //     if(update.hasOwnProperty("newResponse")) {
    //         setToken(update.refreshTok)
    //         return update.newResponse
    //     }
    // }
    // let update = await fetch('api/updateUser', {method: 'POST', body: JSON.stringify({token, userId, other, refresh }), headers: {'Content-Type': 'application/json'}})
    // // await makeRequest("PUT", getToken(), body, "/admin/realms/McKenneys/users/" + userId, "Add")

    // update = await update.json()
    // // error handling
    // if(update.hasOwnProperty("error")) {
    //     return update
    // }
    // if(update.hasOwnProperty("newResponse")) {
    //     setToken(update.refreshTok)
    //     return update.newResponse
    // }
}
}

export const logout = async () => {
    let token = getToken()
    let body = {client_id: 'react', refresh_token: localStorage.getItem('refresh')}
    let logout = await fetch('api/logout', {method: 'POST', body: JSON.stringify({token, body, refresh}), headers: {'Content-Type': 'application/json'}})
    logout = logout.json()
    if(logout.hasOwnProperty("error")) {
        return logout
    }
    if(logout.hasOwnProperty("newResponse")) {
        setToken(logout.refreshTok)
        return logout.newResponse
    }
    else {
        localStorage.clear()
        return "Logout Successful"
    }
    // await makeRequest('PUT', getToken(), body, '/realms/McKenneys/protocol/openid-connect/logout')
}

//something to check the token expiration before each request. If expired, call the refresh token to get another token. Overall, make the user login again after 30 min.
