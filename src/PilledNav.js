import './PilledNav.css';
import {NavLink} from "react-router-dom";

const Pilled = () => {

    return (<>
        <ul id="myTab" role="tablist"
            className="nav nav-tabs nav-pills flex-column flex-sm-row text-center mainBack border-0 rounded-nav  " >
            <li className="nav-item flex-sm-fill">
                <NavLink id="UserPage" data-toggle="tab" to={"dashboard/users"} activeClassName = "active" role="tab" aria-controls="home" aria-selected="true"
                   className="nav-link border-0 text-uppercase font-weight-bold ">Users</NavLink>
            </li>
            <li className="nav-item flex-sm-fill">
                <NavLink id="EditUser" data-toggle="tab" exact to={"/edit-user"} activeClassName = "active" role="tab" aria-controls="profile"
                   aria-selected="false" className="nav-link border-0 text-uppercase font-weight-bold">Edit</NavLink>
            </li>
            <li className="nav-item flex-sm-fill">
                <NavLink id="CreateNew" data-toggle="tab" exact to={"/new-user"} activeClassName = "active" role="tab" aria-controls="profile"
                         aria-selected="false" className="nav-link border-0 text-uppercase font-weight-bold">New</NavLink>
            </li>

        </ul>
    </>)
}

export default Pilled
