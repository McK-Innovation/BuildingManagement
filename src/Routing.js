import {useKeycloak} from "@react-keycloak/web";
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from './LoginPage'
import Dashboard from "./Dashboard";
import {PrivateRoute} from "./PrivateRoute";
import ManageAllUsers from "./ManageUser";

export const Routing = ()=> {
    const {keycloak, initialized} = useKeycloak();
    if(initialized==null) {
        return <LoginPage/>
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component={LoginPage}/>
                <PrivateRoute roles = {['admin']} path = "/protected" component = {Dashboard}/>
                <Route path = '/users' component= {ManageAllUsers}/>

            </Switch>
        </BrowserRouter>
    )
}
