import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useState} from "react";
import {Redirect} from "react-router-dom";
import Yup from "yup";
import {Field, Form, Formik} from "formik";

const ViewEdit = ()=> {
    const [person, updatePerson] = useState({firstname: "tim", lastname: "cooper", username: "timmycoop123", newpassword: '', city: "atlanta", state: 'Georgia', zip: 30818, address: "MCK ROAD", currentGroup: "MCK", email: "hello@heelo.com"});


    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .required("Password Required"),

        firstname: Yup.string()
            .required("Needed"),
        lastname: Yup.string()
            .required("Needed"),

        address: Yup.string()
            .required("Needed"),

        newpassword: Yup.string()
            .required("Needed"),

        username: Yup.string()
            .required("Needed"),

        city: Yup.string()
            .required("Needed"),

        state: Yup.string()
            .required("Needed"),

        zip: Yup.string()
            .required("Needed"),

       currentGroup: Yup.string()
            .required("Needed"),

    });

   const initialValues = {

       email: person.email,

       password: '' ,

       firstname: person.firstname,
       lastname: person.lastname,

       address: person.address,

       newpassword: '',

       username: person.username ,

       city: person.city,

       state: person.state,

       zip: person.zip,

       currentGroup: person.currentGroup,

   }


    return (
        <div className="container">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#" role="tab"
                       aria-controls="home" aria-selected="false">Profile</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" id="home-tab" data-toggle="tab" href="#" role="tab"
                       aria-controls="home" aria-selected="false">Add</a>
                </li>

            </ul>
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

                                        <Form>
                                            <div className="row mt-5 align-items-center">
                                                <div className="col">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-7">
                                                            <h4 className="mb-1">{person.firstname}, {person.lastname}</h4>
                                                            <p className="small mb-3"><span
                                                                className="badge badge-dark">New York, USA</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col">
                                                            <p className="small mb-0 text-muted">{person.address}-{person.city}-{person.state}</p>
                                                            <p className="small mb-0 text-muted">{person.currentGroup}</p>
                                                            <p className="small mb-0 text-muted">(537) 315-1481</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4"/>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="firstname">Lastname</label>
                                                    <Field
                                                        name = "firstname"
                                                        placeholder = {initialValues.firstname}
                                                        type = "text"
                                                        className = "form-control"

                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="lastname">Lastname</label>
                                                    <Field
                                                        name = "lastname"
                                                        placeholder = {initialValues.lastname}
                                                        type = "text"
                                                        className = "form-control"

                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputEmail4">Email</label>
                                                <Field
                                                    name = "email"
                                                    placeholder = {initialValues.email}
                                                    type = "email"
                                                    className = "form-control"

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress5">Address</label>
                                                <Field
                                                    name = "address"
                                                    placeholder = {initialValues.address}
                                                    type = "text"
                                                    className = "form-control"

                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputCompany5">Company</label>
                                                    <Field
                                                        name = "currentGroup"
                                                        placeholder = {initialValues.currentGroup}
                                                        type = "text"
                                                        className = "form-control"

                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="inputState5">State</label>
                                                    <Field
                                                        name = "state"
                                                        placeholder = {initialValues.state}
                                                        as = "select"
                                                        className = "form-control"

                                                    >
                                                        <select name="state">
                                                            <option value="AL">Alabama</option>
                                                            <option value="AK">Alaska</option>
                                                            <option value="AZ">Arizona</option>
                                                            <option value="AR">Arkansas</option>
                                                            <option value="CA">California</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="CT">Connecticut</option>
                                                            <option value="DE">Delaware</option>
                                                            <option value="FL">Florida</option>
                                                            <option value="GA">Georgia</option>
                                                            <option value="HI">Hawaii</option>
                                                            <option value="ID">Idaho</option>
                                                            <option value="IL">Illinois</option>
                                                            <option value="IN">Indiana</option>
                                                            <option value="IA">Iowa</option>
                                                            <option value="KS">Kansas</option>
                                                            <option value="KY">Kentucky</option>
                                                            <option value="LA">Louisiana</option>
                                                            <option value="ME">Maine</option>
                                                            <option value="MD">Maryland</option>
                                                            <option value="MA">Massachusetts</option>
                                                            <option value="MI">Michigan</option>
                                                            <option value="MN">Minnesota</option>
                                                            <option value="MS">Mississippi</option>
                                                            <option value="MO">Missouri</option>
                                                            <option value="MT">Montana</option>
                                                            <option value="NE">Nebraska</option>
                                                            <option value="NV">Nevada</option>
                                                            <option value="NH">New Hampshire</option>
                                                            <option value="NJ">New Jersey</option>
                                                            <option value="NM">New Mexico</option>
                                                            <option value="NY">New York</option>
                                                            <option value="NC">North Carolina</option>
                                                            <option value="ND">North Dakota</option>
                                                            <option value="OH">Ohio</option>
                                                            <option value="OK">Oklahoma</option>
                                                            <option value="OR">Oregon</option>
                                                            <option value="PA">Pennsylvania</option>
                                                            <option value="RI">Rhode Island</option>
                                                            <option value="SC">South Carolina</option>
                                                            <option value="SD">South Dakota</option>
                                                            <option value="TN">Tennessee</option>
                                                            <option value="TX">Texas</option>
                                                            <option value="UT">Utah</option>
                                                            <option value="VT">Vermont</option>
                                                            <option value="VA">Virginia</option>
                                                            <option value="WA">Washington</option>
                                                            <option value="WV">West Virginia</option>
                                                            <option value="WI">Wisconsin</option>
                                                            <option value="WY">Wyoming</option>
                                                        </select>
                                                    </Field>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label htmlFor="inputZip5">Zip</label>
                                                    <Field
                                                        name = "zip"
                                                        placeholder = {initialValues.zip}
                                                        type = "text"
                                                        className = "form-control"

                                                    />
                                                </div>
                                            </div>
                                            <hr className="my-4"/>
                                            <div className="row mb-4">
                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label htmlFor="inputPassword5">New Password</label>
                                                        <Field
                                                            name = "password"
                                                            placeholder = "******"
                                                            type = "password"
                                                            className = "form-control"

                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputPassword6">Confirm Password</label>
                                                        <Field
                                                            name = "newpassword"
                                                            placeholder = "******"
                                                            type = "password"
                                                            className = "form-control"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="mb-2">Password requirements</p>
                                                    <p className="small text-muted mb-2">To create a new password, you have to meet all
                                                        of the following requirements:</p>
                                                    <ul className="small text-muted pl-4 mb-0">
                                                        <li>Minimum 6 character</li>
                                                        <li>At least one special character</li>
                                                        <li>At least one number</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Save Change</button>

                                            <button type="button" className="btn btn-secondary">Cancel</button>
                                        </Form>
                        </Formik>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ViewEdit
