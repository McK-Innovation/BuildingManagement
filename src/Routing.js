import React, {useEffect, useRef, useState} from "react";
import {HashRouter, Route, Switch, useHistory} from "react-router-dom";
import LoginPage from './LoginPage'
import Dashboard from "./Dashboard";

export const Routing = ()=> {
    return (
            <HashRouter>
                <Switch>
                    <Route path = '/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route exact path ='/'>
                        <LoginPage />
                    </Route>

                 </Switch>

            </HashRouter>

    )
}
