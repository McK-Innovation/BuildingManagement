import logo from './logo.svg';
import './App.css';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from './Keycloak'
import {Routing} from "./Routing";
import KcAdminClient from "keycloak-admin";
import {useEffect, useState} from "react";
import {parse, stringify} from 'flatted';


function App() {

    let config = {

        baseUrl: "https://buildingsensedemo.mckenneys.tech/auth",

        realmName: "testAnalyticsRealm",
    }

    const kcAdminClient = new KcAdminClient(config)

    console.log(kcAdminClient)



    const [cli, updatcli] = useState(kcAdminClient)

    let user = localStorage.getItem("token")
    let old;
    if(user!== null) {

        //old = parse(user)
        //console.log(old)
    }


    useEffect(() => {
        if (user&& user!== '') {
            cli.setAccessToken(user)
            updatcli(cli)
        }
    }, []);



  return (

            <Routing  client = {cli} update = {updatcli} >

            </Routing>


  )
}

export default App;
