import {useState} from "react";

const userPage = () => {
    const [input, inputChange] = useState("");
    const [arrayOfInfo, updateArray] = useState([{name: "tim cooper", username: "timmycoop123"}, {name: "Elijah", username: "Elijah231"}]);

    //useEffect(()=>{

    //},[arrayOfInfo])



    return (
        <div>
            <div className="container">
                <div className="navbar navbar-light mx-3">
                </div>
                <div className="row">
                    <div className="col">
                        <input/>

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text"  value = {input} className="form-control" placeholder="Username" aria-label="Username"
                                   aria-describedby="basic-addon1" onChange={(e)=>{inputChange(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="col">
                        {arrayOfInfo

                            .filter(item => {

                                if (!input) return true
                                if (item.name.includes(input) || item.username.includes(input)) {
                                    return true

                                }

                            }).map((input, key) =>(

                            <div className= "row">
                                <button type='button'
                                        className='close'
                                >
                                   <span
                                       aria-hidden="true">&times;
                                   </span>

                                </button>

                                <div className="col">
                                    {input.name} - {input.username}
                                </div>

                            </div>
                        ))}




                    </div>
                </div>

            </div>
        </div>
        )
}

export {userPage}
