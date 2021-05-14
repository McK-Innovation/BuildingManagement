import {useContext, useEffect, useState} from "react";
import './SideBar.css'
import {NavLink} from "react-router-dom";
import clear from "./LoginPage";
import Authorization from "./authContext";
const SideBar = (props)=> {

    //const {valid, updateValid} = useContext(Authorization)

    //once the state updates, ill have data. Loaded some initial dummy data
    //add icons
    const [open , updateOpen] = useState(props)

    function clear() {

        //updateValid(false)

            localStorage.clear()
    }


    return (

        <nav id="sidebar">

            <div id="dismiss">
                <i className="fas fa-arrow-left"></i>
            </div>

            <div className="sidebar-header">
                <h3><span className= "font-weight-bold">Building</span>Key</h3>
                <strong>BK</strong>
            </div>

            <ul className="list-unstyled components">

                <li className="hvr-grow">
                    <a href="#" data-toggle="collapse" aria-expanded="false">
                        <i className="bi bi-person-badge icon-space"></i>
                        <span className="text-light align-middle">Users</span></a>
                </li>

                {/* V2
                    <li className="hvr-grow">

                        <a href="#"> <i className="bi bi-people icon-space"></i><span
                            className="align-middle">Groups</span></a>
                    </li>


                    <li className= "hvr-grow">

                    <a href="#"> <i className="bi bi-gear icon-space"></i><span className="align-middle">Settings</span></a>
                    </li>

                    <hr/>

                */}

                <li className= "hvr-grow">

                <NavLink to = "/" onClick = {()=>(clear())}>  <i className="bi bi-box-arrow-left icon-space"></i><span className="align-middle">Log Out</span></NavLink>
            </li>

            </ul>
        </nav>

    )
}

export default SideBar
