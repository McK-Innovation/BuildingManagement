import {useEffect, useState} from "react";
import './SideBar.css'
const SideBar = (props)=> {



    //once the state updates, ill have data. Loaded some initial dummy data
    const [open , updateOpen] = useState(props)

    return (

        <nav id="sidebar">

            <div id="dismiss">
                <i className="fas fa-arrow-left"></i>
            </div>

            <div className="sidebar-header">
                <h3>Bootstrap Sidebar</h3>
                <strong>BS</strong>
            </div>

            <ul className="list-unstyled components">
                <p>Dummy Heading</p>
                <li className="active">
                    <a href="#" data-toggle="collapse" aria-expanded="false">Users</a>
                </li>

                <li>
                    <a href="#">Group</a>
                </li>

                <li>
                    <a href="#">Sign out</a>
                </li>

                <li>
                    <a href="#">Setting</a>
                </li>
            </ul>
        </nav>

    )
}

export default SideBar
