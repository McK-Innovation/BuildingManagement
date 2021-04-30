import {useEffect, useState} from "react";
import SideBar from "./SideBar";
import './Dashboard.css'
import {Link} from "react-router-dom";

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

                   <div className="navbar navbar-dark bar font-weight-light ">
                       <a className="navbar-brand mx-auto my-auto" href="#" >
                           <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30"
                                className="d-inline-block align-top" alt=""/>
                           Welcome Back <span className= "font-weight-bold">{user.name}</span>!
                       </a>
                   </div>



                    <div className= "content p-5">

                        <div className="container-fluid p-0">

                            <div className= "row text-left">
                                <div className="col">
                                    <h3 className= "text-light">Manage <span className= "font-weight-light">Dashboard</span></h3>
                                </div>
                            </div>


                            <div className= "row py-4 text-center">
                                <div className="col">
                                    <h4> What do you want to manage?</h4>
                                </div>
                            </div>

                            <div className="row py-2">
                                <div className="col">
                                    <div>

                                            <div className="card text-white bg-dark mb-3 card-style" style={{maxWidth: "18rem"}}>
                                                <div className="card-header"></div>
                                                <div className="card-body">
                                                    <h6 className="card-title">Manage Users</h6>
                                                    <p className="card-text">Change user permissions, group membership, username and password</p>
                                                </div>
                                            </div>

                                    </div>
                                </div>

                                <div className="col-lg-6 mx-auto">
                                    <div>

                                            <div className="card text-white bg-dark mb-3 card-style" style={{maxWidth: "18rem"}}>
                                                <div className="card-header"></div>
                                                <div className="card-body">
                                                    <h6 className="card-title">Manage Group</h6>
                                                    <p className="card-text">View group permissions and group settings</p>
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
