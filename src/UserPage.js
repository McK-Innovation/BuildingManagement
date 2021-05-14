import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";

const UserPage = (props) => {
    const [input, inputChange] = useState("");
    //const [arrayOfInfo, updateArray] = useState(props.people);
    //const {updateEdit} = useState(props.person)
    const history = useHistory();

    //useEffect(()=>{

    //},[arrayOfInfo])
    function redir(input) {
        props.updatePerson(input)
        history.push('/dashboard/edit-user')
        //updateEdit(input)
    }


    return (
        <div>
            <div className="container">


                <div className="row mt-4">
                    <div className="col-12">
                        <div className="input-group mb-3 p-2">
                            <div className="input-group-prepend ">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text"  value = {input} className="form-control p-4 select-pre" placeholder="Username" aria-label="Username"
                                   aria-describedby="basic-addon1" onChange={(e)=>{inputChange(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="col-10 offset-1">
                        {props.people

                            .filter(item => {

                                if (!input) return true
                                if ((item.hasOwnProperty("firstName") && item.firstName.includes(input)) || (item.hasOwnProperty("username") && item.username.includes(input))) {
                                    return true

                                }

                            }).map((input, key) =>(

                                <div className= "wrap m-4 p-2 border-0 "  key = {key} onClick= {()=>{redir(input)}}>
                                    <div className="row">


                                        <div className= "col-sm-1">
                                            <i className="bi bi-person-lines-fill"></i>
                                        </div>

                                        <div className="col-sm-10">
                                            <h6>Name:<span className="font-weight-bold">  {input.firstName}</span> / Username: <span className="font-weight-bold">  {input.username}</span></h6>
                                        </div>

                                        <div className="col-sm-1">
                                            <button type='button'
                                                           className='close alert-danger'

                                        >
                                                   <span
                                                       aria-hidden="true"
                                                       style = {{color:"whitesmoke", fontWeight: "bolder"}}
                                                   >

                                                       <i className="bi bi-x-circle text-danger"></i>
                                                   </span>

                                        </button>
                                    </div>

                                    </div>
                                </div>


                        ))}




                    </div>
                </div>

            </div>
        </div>
        )
}

export {UserPage}
