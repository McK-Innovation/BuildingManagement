import {useEffect, useState} from "react";
import SideBar from "./SideBar";
import './Dashboard.css'
import {Link} from "react-router-dom";
import Pilled from "./PilledNav";
import {UserPage} from "./UserPage";
import logo from './images/mckenneys-logo.png'
import NewUser from "./NewUser";
import ManageUser from "./ManageUser";
import ViewEdit from "./ManageUser";

const Dashboard = ()=> {

    //props will be the token of the user that logged in. Api call to keycloak to get all information.



    //will be used by useEffect to call the api for certain features of a user and store them here (if group == token.person.group) {}
    async function storePeople() {

    }

    //this is for loading the initial data, keycloak api here for the particular user that logs in

    useEffect(()=>{ //call the update function after api call

        updateUser({name: "tim", lastName: "cooper", id: 11111, group: "MCK" })},[]) //Function: get group info, get user info

    //once the state updates, ill have data. Loaded some initial dummy data

    const [arrayOfPeople , updatePeople] =useState([{FirstName: "sally", LastName: "hanson", id: 11111, }])

    const [user, updateUser] = useState({})

    return (



        <div className="wrapper">




            <SideBar className = 'sidebar'>

            </SideBar>

            <div className="main back">

                   <div className="navbar navbar-dark bar font-weight-light navbar-expand text-light text-center ">
                       <div className="navbar navbar-collapse">

                           <span className="mx-auto"> Welcome Back <span className= "font-weight-bold text-light">{user.name}</span>!</span>
                       </div>
                       <ul className="navbar-nav navbar-align">
                           <li className="nav-item dropdown">
                               <a className= "nav-link dropdown-toggle d-sm-inline-block" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false" href="#">
                                   <i className="bi bi-person-square text-light"></i>
                                   <span className="text-light"> {user.name}</span>
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
                                    <div class="p-10 pt-5 mainBack rounded shadow mb-5">
                                        <div className="row pb-5">
                                            <div className="col text-dark">
                                                <Pilled/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <NewUser/>
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
