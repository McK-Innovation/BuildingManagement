import {useContext, useEffect, useState} from "react";
import SideBar from "./SideBar";
import './Dashboard.css'
import {BrowserRouter, Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Pilled from "./PilledNav";
import {UserPage} from "./UserPage";
import logo from './images/mckenneys-logo.png'
import NewUser from "./NewUser";
import ManageUser from "./ManageUser";
import ViewEdit from "./ManageUser";
import Authorization from "./authContext";
import {getAllUsersInGroup} from "./keycloakUtils";
import KcAdminClient from "keycloak-admin";

const Dashboard = (props)=> {

    //props will be the token of the user that logged in. Api call to keycloak to get all information.
    const {valid, updateValid} = useContext(Authorization)

    //store the data here


    let history = useHistory()

    if(localStorage.getItem("validate") === "false") {
        //console.log(valid)
        history.push('/')

    }
    //will be used by useEffect to call the api for certain features of a user and store them here (if group == token.person.group) {}

    //this is for loading the initial data, keycloak api here for the particular user that logs in

    //once the state updates, ill have data. Loaded some initial dummy data

    const [arrayOfPeople , updatePeople] =useState([{FirstName: "sally", LastName: "hanson", id: 11111, }])


    let config = {

        baseUrl: "https://buildingsensedemo.mckenneys.tech/auth",

        realmName: "testAnalyticsRealm",
    }

    const kcAdminClient = new KcAdminClient(config)


    //const [client] = useState(props.client)
    useEffect(() => {
        kcAdminClient.auth({
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            grantType: 'password',
            clientId: 'react',
        }).then((r) => {storePeople(kcAdminClient)})
        //getAllUsersInGroup(cat).then((r) => {updatePeople(r); console.log(arrayOfPeople)})
        async function storePeople(client) {

            let arr = await getAllUsersInGroup(client)
            updatePeople(arr)

        }

    }, []);


    useEffect(() => console.log(arrayOfPeople), [arrayOfPeople]);


    //trying to use tokens here might be better/ IE. store the token and then from it, get the username.


    const [edit, updateEdit] = useState({})



    //trying to use tokens here might be better/ IE. store the token and then from it, get the username.
    const name = localStorage.getItem("username")



    return (



        <div className="wrapper">




            <SideBar className = 'sidebar'>

            </SideBar>

            <div className="main back">

                   <div className="navbar navbar-dark bar font-weight-light navbar-expand text-light text-center ">
                       <div className="navbar navbar-collapse">

                           <span className="mx-auto"> Welcome Back <span className= "font-weight-bold text-light">{name}</span>!</span>
                       </div>
                       <ul className="navbar-nav navbar-align">
                           <li className="nav-item dropdown">
                               <a className= "nav-link dropdown-toggle d-sm-inline-block" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false" href="#">
                                   <i className="bi bi-person-square text-light"></i>
                                   <span className="text-light"> {name}</span>
                               </a>
                               <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                   <a className= "dropdown-item">Profile</a>
                               </div>
                           </li>
                       </ul>
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
                                                <Pilled/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">

                                                    <Switch>
                                                       <Route path = "/dashboard/users">
                                                           <UserPage/>
                                                       </Route>

                                                        <Route path = "/dashboard/edit-user">
                                                            <ViewEdit people = {arrayOfPeople} client = {kcAdminClient}/>
                                                        </Route>
                                                        <Route path = "/dashboard/new-user" >

                                                            <NewUser/>

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


        )
}

export default Dashboard
