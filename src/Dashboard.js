import React, {useContext, useEffect, useRef, useState} from "react";
import SideBar from "./SideBar";
import './Dashboard.css'
import {BrowserRouter, HashRouter, Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Pilled from "./PilledNav";
import {UserPage} from "./UserPage";
import logo from './images/mckenneys-logo.png'
import NewUser from "./NewUser";
import ManageUser from "./ManageUser";
import ViewEdit from "./ManageUser";
import Authorization from "./authContext";
//import {getAllUsersInGroup} from "./keycloakUtils";
import {getAllUsersInGroup, logout, getSubGroups} from "./KeycloakHelper"
import KcAdminClient from "keycloak-admin";
import {checkExpiration} from "./KeycloakHelper";
import IdleTimer from "react-idle-timer";


const Dashboard = ()=> {
    //props will be the token of the user that logged in. Api call to keycloak to get all information.
    //store the data here
    let history = useHistory()
    //will be used by useEffect to call the api for certain features of a user and store them here (if group == token.person.group) {}
    //this is for loading the initial data, keycloak api here for the particular user that logs in
    //once the state updates, ill have data. Loaded some initial dummy data

    const [arrayOfPeople , updatePeople] =useState([{FirstName: "sally", LastName: "hanson", id: 11111, }])
    const [arrayOfGroups, updateArray] = useState([])
    const [person, updatePerson] = useState ('')
    const [client, updateCLI] = useState(null)
    const [dashboard, updateDashboard] = useState('')
    let isSubscribed = useRef(true)
    let idleNode = useRef({})


    if(!localStorage.getItem("token")){
        console.log("nothing here")
    }
    const onIdle = async () => {
        if (idleNode.current.getRemainingTime() === 1000 * 60)
            alert("This page will log out in 1 minute if no action is taken")
        if (idleNode.current.getRemainingTime() === 0) {
            alert("No action taken, Logging out")
            await logout()
            history.push("/")
        }
    }

    const onActive = () => {

    }

    const onAction = () => {

    }
    useEffect(() => {
        checkExpiration().then((r) => {if(r !== undefined) history.push("/"); else 
        storePeople().then((r) => {
            storeSubGroups()
            if(r && r.hasOwnProperty("error")) {
                alert(r.error)
            }
        
        }).catch(err=>{alert("Communication Error: Check console for details"); console.log(err)})})

        async function storePeople() {
            let arr = await getAllUsersInGroup()
            if(arr && arr.hasOwnProperty("error")){
                return arr
            }
            console.log(arr)

            updatePeople(arr)
        }

        async function storeSubGroups() {
            let sub = await getSubGroups()
            if(sub && sub.hasOwnProperty('error')) {
                return sub
            }
            console.log(sub)
            console.log(sub.subGroups)
            updateArray(sub.subGroups)
            console.log(arrayOfGroups)
        }

        if(localStorage.getItem("token") === undefined) {
            history.push('/')
        }
        console.log(person)
        console.log(dashboard)
        return () => {isSubscribed.current = false}

    }, [person,dashboard]);


    useEffect(() => console.log(arrayOfPeople), [arrayOfPeople]);
    //trying to use tokens here might be better/ IE. store the token and then from it, get the username.
    const name = localStorage.getItem("name")

    return (
        <>
            <IdleTimer ref={ref => {idleNode.current = ref;}} element={document} onActive={onActive} onIdle={onIdle} onAction={onAction} debounce={250} timeout={1000 * 60 * 5}/>
            <SideBar></SideBar>
            <div className="wrapper" >
                <div className="main back">
                    <div className= "content p-5">
                        <div className="container-fluid p-0">
                            <div className= "row py-4 text-center">
                                <div className="col">
                                    <div className="p-10 pt-5 mainBack rounded shadow mb-5">
                                        <div className="row">
                                            <div className="col">
                                                <Switch>
                                                        <Route exact path = "/dashboard">
                                                            <UserPage people = {arrayOfPeople} updatePerson = {updatePerson} updateDashboard = {updateDashboard}   />
                                                        </Route>
                                                        <Route path = "/dashboard/edit-user">
                                                            <ViewEdit person = {person} groups = {arrayOfGroups} updateDashboard = {updateDashboard}/>
                                                        </Route>
                                                        <Route path = "/dashboard/new-user" >
                                                            <NewUser groups = {arrayOfGroups} updateDashboard = {updateDashboard} />
                                                        </Route>
                                                </Switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</>
        )
}

export default Dashboard
