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
import {getAllUsersInGroup, logout} from "./KeycloakHelper"
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
        checkExpiration().then((r) => {if(r !== undefined) history.push("/"); else storePeople().then((r) => {
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
        <IdleTimer
            ref={ref => {
                idleNode.current = ref;
            }}
            element={document}
            onActive={onActive}
            onIdle={onIdle}
            onAction={onAction}
            debounce={250}
            timeout={1000 * 60 * 5}
        />
        <div className="wrapper">
            <SideBar className = 'sidebar'>

            </SideBar>

            <div className="main back">

                   <div className="navbar navbar-dark bar font-weight-light navbar-expand text-light text-center ">
                       <div className="navbar navbar-collapse">


                           <span className="mx-auto"> Welcome Back <span className= "font-weight-bold text-light">{name}</span>!</span>
                       </div>
                       {/*{*/}
                       {/*<ul className="navbar-nav navbar-align">*/}
                       {/*    <div className='dropdownmod'>*/}
                       {/*        <div className='dropdownmod-header' onClick={() => {updateDropdown(!dropdown)}}>*/}
                       {/*            {name}*/}
                       {/*            <i className="bi bi-person-square text-light mr-1"></i>*/}
                       {/*        </div>*/}
                       {/*        <div className={`dropdownmod-body ${dropdown && 'open'}`}>*/}
                       {/*                <div className="dropdownmod-item">*/}
                       {/*                    Profile*/}
                       {/*                </div>*/}

                       {/*        </div>*/}
                       {/*    </div>*/}

                       {/*</ul>}*/}
                   </div>

                    <div className= "content p-5">

                        <div className="container-fluid p-0">

                            <div className= "row text-left">
                                <div className="col">
                                    <h4 className= "text-light">Manage <span className= "font-weight-light">Dashboard</span></h4>
                                </div>
                            </div>


                            <div className= "row py-4 text-center">
                                <div className="col">
                                    <div className="p-10 pt-5 mainBack rounded shadow mb-5">
                                        <div className="row pb-5">
                                            <div className="col text-dark">
                                                <Pilled person = {person}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">


                                                <Switch>
                                                        <Route exact path = "/dashboard">
                                                            <UserPage people = {arrayOfPeople} updatePerson = {updatePerson} updateDashboard = {updateDashboard}   />
                                                        </Route>

                                                        <Route path = "/dashboard/edit-user">
                                                            <ViewEdit person = {person} updateDashboard = {updateDashboard}/>
                                                        </Route>
                                                        <Route path = "/dashboard/new-user" >

                                                            <NewUser updateDashboard = {updateDashboard} />

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
