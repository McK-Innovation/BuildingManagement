import {useContext, useEffect, useState} from "react";
import './SideBar.css'
import {NavLink} from "react-router-dom";
import clear from "./LoginPage";
import Authorization from "./authContext";
import {logout} from "./KeycloakHelper";
import guide from '../src/images/UserGuide.pdf'
const SideBar = (props)=> {

    //const {valid, updateValid} = useContext(Authorization)

    //once the state updates, ill have data. Loaded some initial dummy data
    //add icons
    const [open , updateOpen] = useState(props)

    const clear = async () => {
        localStorage.clear()
        await logout()
    }


    return (

        <nav id="sidebar">

            <div id="dismiss">
                <i className="fas fa-arrow-left"></i>
            </div>

            <div className="sidebar-header">
                <h4><span className= "font-weight-bold">building</span>CONNECT</h4>
            </div>

            <ul className="list-unstyled components">

                <li className="hvr-grow">
                    <a href={guide} target="_blank" rel="noreferrer">
                        <i className="bi bi-person-badge icon-space"></i>
                        <span className="text-light align-middle"></span>User Guide</a>
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
