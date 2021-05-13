import {useKeycloak} from "@react-keycloak/web";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from './LoginPage'
import Dashboard from "./Dashboard";
import {PrivateRoute} from "./PrivateRoute";
import ManageAllUsers from "./ManageUser";
import Authorization from "./authContext";
import KcAdminClient from "keycloak-admin";

export const Routing = (props)=> {

const [clients, updateclient] = useState(props.client)


    if(!localStorage.getItem("token")){
        console.log("nothing here")
    }

    return (

            <BrowserRouter>

                <Switch>
                    <Route exact path ='/'>
                        <LoginPage client = {clients} update = {updateclient}/>
                    </Route>

                    <Route path = '/dashboard'>
                        <Dashboard client = {clients}/>
                    </Route>

                 </Switch>

            </BrowserRouter>

    )
}
