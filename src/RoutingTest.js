import KcAdminClient from 'keycloak-admin';

const RoutingTest = ()=>{

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
    async function authTest() {
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
    authTest().then((r)=>(console.log("done")))

// List all users


    return (<></>)
}

export default RoutingTest
