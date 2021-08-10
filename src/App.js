import logo from './logo.svg';
import './App.css';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from './Keycloak'
import {Routing} from "./Routing";
import KcAdminClient from "keycloak-admin";
import {useEffect, useState} from "react";
import {parse, stringify} from 'flatted';
import {checkExpiration} from "./KeycloakHelper";
import {useHistory} from "react-router-dom";


function App() {
let history = useHistory();
    // let config = {
    //
    //     baseUrl: "https://buildingsensedemo.mckenneys.tech/auth",
    //
    //     realmName: "testAnalyticsRealm",
    // }
    //
    // const kcAdminClient = new KcAdminClient(config)
    //
    // console.log(kcAdminClient)
    //
    //
    //
    // const [cli, updatcli] = useState(kcAdminClient)

    let user = localStorage.getItem("token")
    let old;
    // if(user!== null) {
    //
    //     //old = parse(user)
    //     //console.log(old)
    // }

//this will keep send an authenticated client whenever there is a refresh. Also, redirect to login if local storage is cleared

    // useEffect(() => {
    //     // if (user && user!== '' && localStorage.getItem("username") != null) {
    //     //     cli.auth({
    //     //         username: localStorage.getItem("username"),
    //     //         password: localStorage.getItem("password"),
    //     //         grantType: 'password',
    //     //         clientId: 'react',
    //     //     }).then((r) => {updatcli(cli); console.log(cli)})
    //     //
    //     // }
    //     checkExpiration().then(r=>{if(r!==undefined) history.push("/")});
    //
    // }, []);



  return (
//client = {cli} update = {updatcli}
            <Routing>

            </Routing>


  )
}

export default App;
