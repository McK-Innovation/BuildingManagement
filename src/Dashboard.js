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



        <div className="container-fluid px-0">

            <div className="row collapse show no-gutters d-flex h-100 position-relative">

                <div className="col-2 p-0 h-100 w-sidebar navbar-collapse collapse d-none d-md-flex sidebar">
                    <SideBar/>
                </div>

                <div className= "col-10 offset-2 mx-auto">
                   <div className="navbar navbar-dark bg-dark  ">
                       <a className="navbar-brand mx-auto" href="#" >
                           <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30"
                                className="d-inline-block align-top" alt=""/>
                               Bootstrap
                       </a>
                   </div>
                </div>
                <div className="container-fluid p-3 ">

                    <div className="row">
                        <div className="col-9 offset-3">

                            <div className= "row text-center">
                                <div className="col">
                                    <h1>Welcome Back {user.name}</h1>
                                </div>
                            </div>

                            <div className= "row">
                               <div className= "col">
                                    <h2>DashBoard Stuff</h2>
                               </div>
                            </div>

                            <div className= "row">
                                <div className="col">
                                    <h2> What do you want to manage?</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div>

                                            <div className="card text-white bg-dark mb-3" style={{maxWidth: "18rem"}}>
                                                <div className="card-header"></div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Manage Users</h5>
                                                    <p className="card-text">Change user permissions, group membership, username and password</p>
                                                </div>
                                            </div>

                                    </div>
                                </div>

                                <div className="col">
                                    <div>

                                            <div className="card text-white bg-dark mb-3" style={{maxWidth: "18rem"}}>
                                                <div className="card-header"></div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Manage Group</h5>
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
            </div>


        )
}

export default Dashboard
