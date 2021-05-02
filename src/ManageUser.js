import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useState} from "react";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const ViewEdit = ()=> {
    const [person, updatePerson] = useState({firstname: "tim", lastname: "cooper", username: "timmycoop123", newpassword: '',  currentGroup: "MCK", email: "hello@heelo.com"});


    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .required("Password Required"),

        firstname: Yup.string()
            .required("Needed"),
        lastname: Yup.string()
            .required("Needed"),

        newpassword: Yup.string()
            .required("Needed"),

        username: Yup.string()
            .required("Needed"),

       currentGroup: Yup.string()
            .required("Needed"),

    });

   const initialValues = {

       email: person.email,

       password: '' ,

       firstname: person.firstname,

       lastname: person.lastname,

       newpassword: '',

       username: person.username ,

       currentGroup: person.currentGroup,

   }


    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto">

                    <div className="my-4">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            validateOnBlur={true}
                            onSubmit={(values) => {
                                console.log(values);
                                updatePerson(values);
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
                                                    <p className="small mb-0 text-muted ">{values.address ? values.address: "Username"}</p>
                                                    <p className="small mb-0 text-muted ">{values.currentGroup? values.currentGroup: "Group"}</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <hr className="my-4"/>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstname">Lastname</label>
                                            <Field
                                                name="firstname"
                                                placeholder={initialValues.firstname}
                                                type="text"
                                                className="form-control"

                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastname">Lastname</label>
                                            <Field
                                                name="lastname"
                                                placeholder={initialValues.lastname}
                                                type="text"
                                                className="form-control"

                                            />
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
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress5">Username</label>
                                        <Field
                                            name="username"
                                            placeholder={initialValues.username}
                                            type="text"
                                            className="form-control"

                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6 offset-3">
                                            <label htmlFor="inputCompany5">Company</label>
                                            <Field
                                                name="currentGroup"
                                                placeholder={initialValues.currentGroup}
                                                type="text"
                                                className="form-control"

                                            />
                                        </div>

                                    </div>
                                    <hr className="my-4"/>
                                    <div className="row mb-4">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="inputPassword5">New Password</label>
                                                <Field
                                                    name="password"
                                                    placeholder="******"
                                                    type="password"
                                                    className="form-control"

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputPassword6">Confirm Password</label>
                                                <Field
                                                    name="newpassword"
                                                    placeholder="******"
                                                    type="password"
                                                    className="form-control"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-2">Password requirements</p>
                                            <p className="small text-muted mb-2">To create a new password, you have to
                                                meet all
                                                of the following requirements:</p>
                                            <ul className="small text-muted pl-4 mb-0">
                                                <li>Minimum 6 character</li>
                                                <li>At least one special character</li>
                                                <li>At least one number</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="btn-group m-4">
                                        <button type="submit" className="btn btn-primary" disabled={errors||touched}>Save Change</button>

                                        <button type="button" className="btn btn-secondary">Cancel</button>
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
