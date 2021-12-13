import {useRef, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
//import {deleteMember} from "./keycloakUtils";
import {deleteMember} from "./KeycloakHelper"
import {Confirmation} from "./Confirmation";

const UserPage = (props) => {
    const [input, inputChange] = useState("");
    //const [arrayOfInfo, updateArray] = useState(props.people);
    //const {updateEdit} = useState(props.person)
    const history = useHistory();
    const [tempArray, updateTempArray] = useState(props.people)
    const [show, setShow] = useState(false)


    let person = useRef();
    //useEffect(()=>{

    //},[arrayOfInfo])
    function redir(input) {
        console.log(input)
        props.updatePerson(input)
        history.push('/dashboard/edit-user')
        //updateEdit(input)
    }

    function removeFromArray(input) {
        //this loop could be better
        let indexOf = -1;
        for(let i = 0; i<tempArray.length; i++) {
          let person = tempArray[i];
          if(person.id === input.id) {
              indexOf = i;
              break;
          }
        }
        if(indexOf !== -1) {
            let newArray = tempArray.splice(indexOf, 1)
            updateTempArray(newArray)

        }
        props.updateDashboard(input)


    }

    function remove (input) {

        setShow(true);

        person.current = input;

        console.log("click")

        // deleteMember(props.client, input.id,localStorage.getItem("groupID")).catch(reason => {console.log(reason)}).then(
        //     (r) => {removeFromArray(input)}
        // )



    }



    return (
        <div>
            <div className="container">
                {show && <Confirmation caller = {()=>{let input = person.current; deleteMember(person.current.id).catch(reason => {console.log(reason)}).then(
                    (r) => {removeFromArray(input)}
                )}} open = {setShow}/>}


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
                        {props.people && props.people

                            .filter(item => {

                                if (!input) return true
                                if ((item.hasOwnProperty("firstName") && item.firstName.includes(input)) || (item.hasOwnProperty("username") && item.username.includes(input))) {
                                    return true

                                }

                            }).map((input, key) =>(

                                <div className= "wrap m-4 p-2 border-0 "  key = {key}>
                                    <div className="row">

                                        <div className= "col-sm-1">
                                            <i className="bi bi-person-lines-fill"></i>
                                        </div>

                                        <div className="col-sm-10"  onClick= {()=>{redir(input)}}>
                                            <h6>Name:<span className="font-weight-bold">  {input.firstName}</span> / Username: <span className="font-weight-bold">  {input.username}</span></h6>
                                        </div>

                                        <div className="col-sm-1">
                                            <button type='button'
                                                           className='close alert-danger'
                                                    onClick={()=>{remove(input)}}

                                        >
                                                   <span
                                                       aria-hidden="true"
                                                       style = {{color:"whitesmoke", fontWeight: "bolder"}}
                                                   >

                                                       <i className="bi bi-x-circle-fill text-danger"></i>
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
