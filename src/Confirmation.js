import {useState} from "react";
import "./confirmation.css";

export const Confirmation = (props)=> {

   //props will be the function needed for "yes"

    const [show, setShow] = useState(true);
    console.log("hello")


    return (<>
        { show ?
            <div className="cover p-1 m-3" onClick={() => {
                 props.open(false)
            }}>
                <div className="card bg-light text-dark shift cardo">
                    <div className="card-body">
                        <h5 className="card-title text-danger text-left">Are you sure?</h5>
                        <p className="card-text text-dark text-left">This action cannot be reversed.</p>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-outline-dark" onClick={()=>{  props.caller(); props.open(false);
                            }}> Yes
                            </button>
                            <button type="button" className="btn btn-outline-dark" onClick={()=>{ props.open(false)}}> No</button>
                        </div>
                    </div>
                </div>
            </div>
            :null
        }
    </>
    )

}
