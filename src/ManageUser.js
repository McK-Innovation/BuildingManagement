import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useRef, useState} from "react";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
//import {addUser, updateIndividual} from "./keycloakUtils";

import {updateIndividual} from "./KeycloakHelper"
import {Confirmation} from "./Confirmation";

const ViewEdit = (props)=> {

    const [person, updatePerson] = useState(props.person);
    //get user from context, then update if update is clicked and route to the users page

    let val = useRef({})
    const [show, setShow] = useState(false)

    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),

        firstname: Yup.string()
            .required("Needed"),

        lastname: Yup.string()
            .required("Needed"),

        newpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

        username: Yup.string()
            .required("Needed"),


    });

    async function editUser(username, email, password, firstname, lastname, permissionLevel ) {
        await updateIndividual(props.person.id, {username: username, email: email, password: password, firstName: firstname, lastName: lastname, permissionLevel: permissionLevel  })
    }

   const initialValues = {

       email: person.email,

       password: '' ,

       firstname: person.firstName,

       lastname: person.lastName,

       newpassword: '',

       username: person.username ,

       currentGroup: person.currentGroup,

       permissionLevel: ''

   }


    return (
        <div className="container text-light">

            {show && <Confirmation caller = {() => {let values = val.current; editUser(values.username, values.email, values.password, values.firstname, values.lastname, values.permissionLevel).catch((e)=>(console.log(e))).then((r) => console.log("done"))}} open = {setShow}/>}

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto overflow-auto">

                    <div className="my-4">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            validateOnBlur={true}
                            onSubmit={(values) => {
                                console.log(values);
                                val.current = values;
                                updatePerson(values);
                                setShow(true)
                                //editUser(values.username, values.email, values.password, values.firstname, values.lastname).catch((e)=>(console.log(e))).then((r) => console.log("done"))
                                //async function to create the user and then assign to a "my" group


                            }}
                        >
                            {({values, errors, touched}) => (
                                <Form>
                                    <div className="row mt-5 align-items-center text-light border border-secondary rounded">
                                        <div className="col">

                                            <div className="row align-items-center">
                                                <div className="col-md-12">
                                                    <h1 className="m-2">{values.firstname ?values.firstname : "First Name"} {values.lastname ? values.lastname : "Last Name"}</h1>
                                                    <p className="small mb-3"><span
                                                        className="badge badge-light ">{values.username? values.username : "Username"}</span></p>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <p className="small mb-0 text-muted ">{values.email ? values.email: "Email"}</p>
                                                    <p className="small mb-0 text-muted ">{localStorage.getItem("groupName")}</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <hr className="my-4"/>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstname">First Name</label>
                                            <Field
                                                name="firstname"
                                                placeholder={initialValues.firstname}
                                                type="text"
                                                className="form-control"

                                            />

                                            <ErrorMessage
                                            name = "firstname"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastname">Last Name</label>
                                            <Field
                                                name="lastname"
                                                placeholder={initialValues.lastname}
                                                type="text"
                                                className="form-control"

                                            />

                                            <ErrorMessage
                                                name = "lastname"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <Field
                                            name="email"
                                            placeholder={initialValues.email}
                                            type="email"
                                            className="form-control"

                                        />

                                        <ErrorMessage
                                            name = "email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress5">Username</label>
                                        <Field
                                            name="username"
                                            placeholder={initialValues.username}
                                            type="text"
                                            className="form-control"

                                        />

                                        <ErrorMessage
                                            name = "username"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6 offset-3">
                                            <label htmlFor="inputCompany5">Company</label>
                                            <Field
                                                name="currentGroup"
                                                placeholder={localStorage.getItem("groupName")}
                                                type="text"
                                                className="form-control"
                                                readOnly

                                            />
                                        </div>

                                        <div className="form-group col-md-6 offset-3">
                                            <label htmlFor="inputCompany5">Permission Level</label>
                                            <Field
                                                name="permissionLevel"
                                                placeholder='Permissions'
                                                as = 'select'
                                                className="form-control"
                                                >
                                                <option>Admin</option>
                                                <option>Supervisor</option>
                                                <option>Engineer</option>
                                                <option>View-Only</option>

                                            </Field>
                                        </div>


                                    </div>
                                    <hr className="my-4"/>
                                    <div className="row mb-4">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="inputPassword5">New Password</label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className="form-control"

                                                />

                                                <ErrorMessage
                                                    name = "password"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputPassword6">Confirm Password</label>
                                                <Field
                                                    name="newpassword"
                                                    type="password"
                                                    className="form-control"

                                                />

                                                <ErrorMessage
                                                    name = "newpassword"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-2">Password requirements</p>
                                            <p className="small mb-2">To create a new password, you have to
                                                meet all
                                                of the following requirements:</p>
                                            <ul className="small pl-4 mb-0 text-light">
                                                <li>Minimum 8 character</li>
                                                <li>At least one special character</li>
                                                <li>At least one number</li>
                                                <li>At least one Uppercase character</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="btn-group m-4">
                                        <button type="submit" className="btn btn-primary" disabled={!touched}>Save Change</button>

                                        <button type="button" className="btn btn-secondary">Cancel</button>

                                        {console.log(errors,touched)}
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

export default ViewEdit
