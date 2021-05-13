import KcAdminClient from 'keycloak-admin';
import authContext from "./authContext";
import {useContext} from "react";
import {parse, stringify} from 'flatted';


// or
// const KcAdminClient = require('keycloak-admin').default;

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080/auth',
//   realmName: 'master',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }
    const config = {baseUrl: "https://buildingsensedemo.mckenneys.tech/auth",
    realmName:"testAnalyticsRealm",
    }
    const kcAdminClient = new KcAdminClient(config);

// Authorize with username / password
  export async function authTest() {
      console.log(kcAdminClient)
        await kcAdminClient.auth({
            username: 'zach',
            password: 'zach1234',
            grantType: 'password',
            clientId: 'react',
             // optional Time-based One-time Password if OTP is required in authentication flow
        });


       let users = await kcAdminClient.users.find()
        for(let val of users) {
            if(val.hasOwnProperty('username')) {
                if (val.username === 'bob'){
                    console.log(val)
                    break;
                }

                    }
        }

    }


    //authTest().then((r)=>(console.log("done")))

// List all users

async function autho(client, username, password, grant = "password", client_type = "react") {

console.log(client)
try {
    let credentials = {
        username: username,
        password: password,
        grantType: grant,
        clientId: client_type,
        // optional Time-based One-time Password if OTP is required in authentication flow
    }

    await client.auth(credentials);

    console.log("done")

    await localStorage.setItem("username", username)
//this is not great
    await localStorage.setItem("password", password)

    let to= await client.getAccessToken()

    let re = client.refreshToken
    console.log(re)

    //let stringClient = JSON.stringify(client)

    let flatClient = parse(stringify(client))
    console.log(flatClient)


    //localStorage.setItem("token", to)

    await localStorage.setItem("token", re )

    await localStorage.setItem("validate", "true")


    return client
}
catch(er)
{
    return er
}






    }




export {autho}
