import react, {useState} from "react"

let requestConfig = {}
let realmName = 'testAnalyticsRealm'

let baseUrl = 'https://buildingsensedemo.mckenneys.tech/auth' //will change in the future

export function getToken() {

    localStorage.getItem("token");
}

export function makeRequest(method, headers, body = JSON) {

    requestConfig = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }

    fetch(baseUrl, requestConfig)
        .then(res => res.json())
        .then(data => console.log(data))

}

export function login () {

    let body = {
        username: 'zach',
            password: 'zach1234',
            grant_type: 'password',
            client_id: 'react',

    }
    makeRequest("POST", 'application/json', body )
}

function getUser() {

}

function getAllUsersInGroup () {

}

function getGroup () {

}


