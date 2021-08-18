import KcAdminClient from 'keycloak-admin';
import {Issuer} from "openid-client";
import {useEffect, useRef} from "react";



// or
// const KcAdminClient = require('keycloak-admin').default;

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080/auth',
//   realmName: 'McKenneys',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }


//to be used by the index/app section if the user is logged in




// Authorize with username / password
async function authTest() {

    const config = {baseUrl: "https://buildingsensedemo.mckenneys.tech/auth",
        realmName:"testAnalyticsRealm",
    }
    const kcAdminClient = new KcAdminClient(config);
    await kcAdminClient.auth({
        username: 'zach2',
        password: 'zach1234',
        grantType: 'password',
        clientId: 'react',
        // optional Time-based One-time Password if OTP is required in authentication flow
    });

    //call get token and then set token every time you call a function

    let users = await kcAdminClient.users.find()
    for(let val of users) {
        if(val.hasOwnProperty('username')) {
            if (val.username === 'bob'){
                console.log(val)
                break;

            }
        }

    }
    authTest().catch(e=>{ console.log(e.response)}).then((r)=>(console.log("done")))

// List all users



}

async function auth(username, pass, realmName = "testAnalyticsRealm" , baseUrl = "https://buildingsensedemo.mckenneys.tech/auth", grantype = "password", clientId = 'react') {

    const config = {baseUrl: baseUrl,
        realmName: realmName,
    }
    const kcAdminClient = new KcAdminClient(config);
    kcAdminClient.auth({
        username: username,
        password: pass,
        grantType: grantype,
        clientId: clientId,
        // optional Time-based One-time Password if OTP is required in authentication flow
    }).then(async (r) =>  {

        const keycloakIssuer = await Issuer.discover(
            'https://buildingsensedemo.mckenneys.tech/auth/realms/testAnalyticsRealm/',
        );

        const client = new keycloakIssuer.Client({
            client_id: 'react', // Same as `clientId` passed to client.auth()
            token_endpoint_auth_method: 'none', // to send only client_id in the header
        });

// Use the grant type 'password'
        let tokenSet = await client.grant({
            grant_type: grantype,
            username: username,
            password: pass,
        });



// Periodically using refresh_token grant flow to get new access token here
        setInterval(async () => {
            localStorage.setItem("token",tokenSet.refresh_token)
            tokenSet = await client.refresh(localStorage.getItem("token"));
            kcAdminClient.setAccessToken(tokenSet.access_token);
        }, 1200 * 1000); // 20 min
    }).catch((e) => {if(e.message.status === 401){ return "invalid credentials";} else {return "network error";}})

    //call get token and then set token every time you call a function




}


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export {auth,useInterval}
