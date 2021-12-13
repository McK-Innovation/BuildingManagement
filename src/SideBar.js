import {useContext, useEffect, useState} from "react";
import './SideBar.css'
import {NavLink} from "react-router-dom";
import clear from "./LoginPage";
import Authorization from "./authContext";
import {logout} from "./KeycloakHelper";
import guide from '../src/images/UserGuide.pdf'
import logo from '../src/images/mckenneys-logo.png'
import connect from "../src/images/connectLogo2.png"
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
        <div className = "nav-container">
            <nav>   
            <img id="logo" src = {connect} alt = "image of mckenneys logo" style = {{maxWidth: "400px", maxHeight: "200px"}}/>
                <ul>
                    <li className='actions'>
                        <NavLink className='actions' data-toggle="tab" exact to={"/dashboard"} activeClassName = "active" aria-controls="home" role='tab' aria-selected="true">Manage Users</NavLink>
                    </li>
                    <li className='actions'>
                        <NavLink className='actions' data-toggle="tab" exact to={"/dashboard/new-user"} activeClassName = "active" role="tab" aria-controls="profile" aria-selected="false">Add User</NavLink>
                    </li>
                </ul>
                <ul className="endNav">
                    <li><a href={guide} target="_blank" rel="noreferrer" style={{textDecoration:'none', color:'white', listStyleType: "none", paddingRight:'1em'}}>UserGuide.pdf</a></li>
                    <li><NavLink style={{ textDecoration: 'none', color: "white", background: '#c41230', padding: '.5em', borderRadius: '25px', listStyleType: "none"}} to = "/" onClick = {()=>(clear())}><i className="bi bi-box-arrow-left icon-space"></i></NavLink></li>
                </ul>
            </nav>
        </div>
        

                // <NavLink to = "/" onClick = {()=>(clear())}>  <i className="bi bi-box-arrow-left icon-space"></i><span className="align-middle">Log Out</span></NavLink>
            

    )
}

export default SideBar
