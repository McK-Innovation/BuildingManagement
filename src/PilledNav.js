import './PilledNav.css';

const Pilled = () => {

    return (<>
        <ul id="myTab" role="tablist"
            className="nav nav-tabs nav-pills flex-column flex-sm-row text-center mainBack border-0 rounded-nav  " >
            <li className="nav-item flex-sm-fill">
                <a id="UserPage" data-toggle="tab" href="#" role="tab" aria-controls="home" aria-selected="true"
                   className="nav-link border-0 text-uppercase font-weight-bold active">Users</a>
            </li>
            <li className="nav-item flex-sm-fill">
                <a id="EditUser" data-toggle="tab" href="#" role="tab" aria-controls="profile"
                   aria-selected="false" className="nav-link border-0 text-uppercase font-weight-bold">Edit</a>
            </li>
            <li className="nav-item flex-sm-fill">
                <a id="CreateNew" data-toggle="tab" href="#" role="tab" aria-controls="profile"
                   aria-selected="false" className="nav-link border-0 text-uppercase font-weight-bold">New</a>
            </li>

        </ul>
    </>)
}

export default Pilled
