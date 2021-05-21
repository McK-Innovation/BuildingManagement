import {useState} from "react";

export const confirmation = (props)=> {

   //props will be the function needed for "yes"

    const [show, setShow] = useState(false);


    return <>

        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Are you sure?</h5>
                    <p className="card-text">This action cannot be reversed.</p>
                    <div className="btn-group" role="group" >
                        <button type="button" className="btn btn-outline-dark" onClick={()=>{props.update}}> Yes </button>
                        <button type="button" className="btn btn-outline-dark"> No </button>
                    </div>
                </div>
            </div>
        </div>
    </>

}
