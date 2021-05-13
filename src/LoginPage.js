import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useContext, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import "./LoginPage.css";
import * as Yup from "yup";
import {Formik, ErrorMessage, Form, Field} from "formik";
import {getAllUsersInGroup, getGroup} from './keycloakUtils'
import Authorization from "./authContext"
import {autho} from "./RoutingTest";




const LoginPage = (props)=> {

//login with credentials on submit, set the login context to true and route to the user page
    //on logout, stop the token from updating. set login to false, redirect to the login page
const [failed, updateFailed] = useState(null)
const {valid, updateValid} = useContext(Authorization)
const [client, updateClient] = useState(props)
//this is crazy
    console.log(client)






    let history = useHistory()




    const initialValues = {
        username: "",
        password: "",
    }


    const SignUpSchema = Yup.object().shape({
        username: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .required("Password Required"),

    });

    async function submitHandler(username, password){


        if(localStorage.getItem("token") === undefined || localStorage.getItem("token") === null || localStorage.getItem("token") === '') {

            let cli2 = await autho(client.client, username, password)
            console.log("tried to auth")
            console.log(localStorage.getItem("username"))

            if (cli2.hasOwnProperty("accessToken")) {
                //updateValid(true)

                updateClient(await cli2)
                console.log(cli2, "sucess")
                localStorage.setItem("validate", "true")


            } else {
                console.log(cli2, "fail")
                updateFailed(cli2.toString())
            }


            if (localStorage.getItem("validate") === "true") {

                //updateClient(await cli2)
                console.log("pushed")
                history.push("/dashboard")
            }


            //console.log(valid)


        }
        else{

            console.log(localStorage.getItem("token"),"something is here, push")
            history.push("/dashboard")
        }

    }



    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className= "card rounded cardShadow">
                    <div className="card-body card-back">
                        <h2 className="text-center mb-5">Sign In</h2>
                        {failed &&(<small className= "text-danger">{failed}</small>) }

                            <Formik
                                initialValues={initialValues}
                                validationSchema={SignUpSchema}
                                validateOnBlur={true}
                                onSubmit={(values) => {
                                    console.log(values);
                                    submitHandler(values.username, values.password)

                                }}
                            >

                                {({values, errors, touched,isValid}) => (


                                    <Form>
                                        <div className="form-group">
                                            <Field
                                                name = "username"
                                                placeholder = "Username"
                                                type = "text"
                                                className = "form-control"

                                            />
                                            <ErrorMessage name = "username"/>
                                        </div>

                                        <div className="form-group mb-4">
                                            <Field
                                                name = "password"
                                                placeholder = "Password"
                                                type = "password"
                                                className = "form-control"

                                            />
                                            <ErrorMessage name = "password"/>
                                        </div>

                                        <button type = "submit" className= "btn-outline-primary w-100 btn-round" disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}>
                                            Log In
                                        </button>
                                        <div className= "W-100 text-center mt-2">
                                            <div className= "W-100 text-center mt-2">
                                                <img src = "https://pbs.twimg.com/profile_images/1135686411968032774/wG0CkGI5_400x400.png" alt = "image of mckenneys logo"
                                                     style = {{maxWidth: "100px", maxHeight: "100px"}}/>
                                            </div>
                                        </div>
                                    </Form>



                                )

                                }

                            </Formik>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default LoginPage
