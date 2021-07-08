import react, {useRef, useState} from "react"
import {string} from "prop-types";
import {RequiredActionAlias} from "keycloak-admin/lib/defs/requiredActionProviderRepresentation";
import {useHistory} from "react-router-dom";


let realmName = 'master'
let clientType = 'react'

let baseUrl = 'https://auth.mckenneys.tech/auth' //will change in the future
//let history = useHistory()
//let username = useRef("")
//let groupRef = useRef({})

//checks the expiration date and if the token is expired, gets the refresh token and sets a new access token with it
export async function checkExpiration() {

    let expirationTime = await localStorage.getItem("expire")
    let timeOfLogin = await localStorage.getItem("timeNow")
    let timeNow = Date.now() / 1000;

    console.log(expirationTime)
    console.log(timeOfLogin)
    console.log(timeNow)

    if(expirationTime <= Math.abs(timeNow - timeOfLogin)) {
        alert("Session Expired, Please login again")
        localStorage.clear()
        return Math.abs(timeNow - timeOfLogin)
    }


    //let token = await makeRequest("POST",  "", body, '/realms/testAnalyticsRealm/protocol/openid-connect/token',"login")


    //setToken(token)

    //return token


}

export function getToken() {

    return localStorage.getItem("token");
}

export function setToken(token) {

    localStorage.setItem("token", token)
}


export async function makeRequest(method, headers = "", body, url, type = "") {
    //let urlencoded = new URLSearchParams();

    let res = '';
    let myHeaders;
    myHeaders =  new Headers();

    let requestConfig = {}
    let urlencoded2 = new URLSearchParams();



    if(method === "POST" || method === "PUT") {

        if(type !== "Add") {

            console.log(type)

            Object.entries(body).map(([k, v = string]) => {
                urlencoded2.append(k, v)
            })

            requestConfig = {
                method: method,
                body: urlencoded2,
                redirect: "follow"

            }
        }

        else if(type === "Add" || type === "Edit") {
            console.log("Add/Edit selected")
            myHeaders.append("Content-Type", "application/json");
            body = JSON.stringify(body)

            requestConfig= {
                method: method,
                body: body,
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



    if(headers !== "") {

        myHeaders.append("Authorization", "Bearer " + headers);
        requestConfig.headers = myHeaders;
    }



    let response = await fetch(baseUrl + url, requestConfig)

    response = await response.json()

    if (type === "login") {
        let tok = response.access_token;
        let expire =  response.expires_in;
        localStorage.setItem("expire", expire)


        //let time =

        return tok
    }

    else
        return response;






}

export async function login (request) {
//request = {username: "zach",
//             password: "zach1234",
//             client_id: "react",
//             grant_type: "password",}
    let err = {};
    let body = {
            username: request.username,
            password: request.password,
            client_id: "react",
            grant_type: "password",
    }

        let token = await makeRequest("POST", "", body, '/realms/master/protocol/openid-connect/token', "login")


        setToken(token)
        localStorage.setItem("username", request.username)
        //username.current = request.username;

        let loginTime = Date.now() / 1000 //in seconds
        loginTime = loginTime.toString()
        localStorage.setItem("timeNow", loginTime)



   return token

}

export async function getUser() {
    let tok2 = await getToken()
    //let tok2 = await login();
    //setToken(tok2)

    let users = await makeRequest("GET", tok2, {}, '/admin/realms/master/users')
    console.log(users)
    return users
}
export async function getAllUsersInGroup () {

//localStorage.setItem("username", "zach")

   let users =  await getUser()
    //needs username
    try {
        for (let val of users) {
            if (val.hasOwnProperty('username')) {
                console.log(localStorage.getItem("username"))
                console.log(val)

                if (val.username === localStorage.getItem("username").toLowerCase()) {
                    console.log(val)

                    localStorage.setItem("name", val.firstName)

                    let group = await makeRequest("GET", localStorage.getItem("token"), {}, '/admin/realms/master/users/' + val.id + '/groups')
                    if (group) {
                        console.log(group)
                        //groupRef.current = group

                        localStorage.setItem("groupName", group[0].name)
                        //localStorage.setItem("groupID", group[0].id)



                        console.log("found")

                        //start the second part of the function. Above works

                        let id = group[0].id

                        let members =  await makeRequest("GET", getToken(), {}, '/admin/realms/master/groups/' + id + '/members'  )


                        //return {id: group[0].id, name: group[0].name}//store this maybe
                        return members;
                    }
                } else {
                    console.log("not found")
                }

            }
        }
    }

catch(error)
        {
            console.log(error)
        }

}


export async function deleteMember (userID){

    //await client.users.delFromGroup({id: userID, groupId: groupID});
    await makeRequest("DELETE", getToken(),{},'/admin/realms/master/users/' + userID)
    console.log("done")
}

export async function addUser (credentials = {username: '', email: '', password: '', firstName: '', lastName: ''}) {



    let group = localStorage.getItem("groupName")

    //let group = groupRef.current[0].name

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
            "temporary": false
        }

    ],
        "groups": [group]



    }

    let resp = await makeRequest("POST", getToken(), body, '/admin/realms/master/users', "Add")

    console.log(resp)
    console.log("done")

}


export  async function updateIndividual(userId, credentials = {username: '', email: '', password: '', firstName: '', lastName: ''}, ) {
    let body = {

    }

    for(let creds in credentials) {
        if(credentials[creds] !== '') {
            body[creds] = credentials[creds]
        }
    }

    await makeRequest("PUT",getToken(),body, "/admin/realms/master/users/" + userId, "Add" )

}







//something to check the token expiration before each request. If expired, call the refresh token to get another token. Overall, make the user login again after 30 min.
