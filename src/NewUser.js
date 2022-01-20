import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useRef, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FieldArray} from "formik";
import {getSubGroups} from "./KeycloakHelper"
import {addUser} from "./KeycloakHelper"
import {Confirmation} from "./Confirmation";
const NewUser= (props)=> {
    console.log(props)
    let history = useHistory()
    const [show, setShow] = useState(false)
    let val = useRef({})


    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .required("Password Required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/,
                "Must Contain at least 12 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),

        firstname: Yup.string()
            .required("Needed"),
        lastname: Yup.string()
            .required("Needed"),

        newpassword: Yup.string()
            .required("Needed")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

        username: Yup.string()
            .required("Needed"),


    });

    const initialValues = {
        email: '',
        password: '' ,
        firstname: '',
        lastname: '',
        newpassword: '',
        username: '' ,
        group: '',
        permissionLevel: ''
    }

    async function submitH(username, email, password, firstname, lastname, group, permissionLevel) {

        await addUser({username: username, email: email, password: password, firstName: firstname, lastName: lastname, groups: group, permissionLevel: permissionLevel })
    }

    return (
        <div className="container text-light">
            {show ? (<Confirmation caller = { ()=>{let values = val.current; submitH(values.username, values.email, values.password, values.firstname, values.lastname, values.group, values.permissionLevel).catch((e) => (alert(e))).then((r) =>
            { if(r !== undefined)
                {
                    alert(r)
                }
              else {
                  alert("Successfully added a user")
                    props.updateDashboard(values)
                    history.push('/dashboard');
                }
                })
            }} open = {setShow}/> ) : null}
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto overflow-auto">
                    <div className="my-4">
                        <Formik initialValues={initialValues} validationSchema={SignUpSchema} validateOnBlur={true} onSubmit={(values) => { 
                                console.log(values);
                                val.current = values
                                setShow(true);
                            }}>
                            {({values, errors, touched}) => (
                                <Form>
                                    <div className="row mt-4 align-items-center border border-secondary rounded" style={{height:'20em'}}>
                                        <div className="col">

                                            <div className="row align-items-center">
                                                <div className="col-md-12">
                                                    <h1 className="m-2 display-4">{values.firstname ?values.firstname : "First Name"} {values.lastname ? values.lastname : "Last Name"}</h1>
                                                    <p className="mb-3 display-4 mt-3"><span
                                                        className="badge badge-light">{values.username? values.username : "Username"}</span></p>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <p className="mb-0 text-muted h1 mt-3">{values.email? values.email: "Email"}</p>
                                                    <p className="mb-0 text-muted h1 mt-3">{values.group? values.group + '--': 'Building'}</p>
                                                </div>
                                                {/* {values.group===''? 'Building' : values.group ? values.group + '--' : 'Building'} */}
                                                {/* {values.group? values.group + ',   ': 'Building'} */}
                                                {/* {values.group? values.group + ', ': values.group = '' ? "Building" : 'Building'} */}
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
                                            <label htmlFor="inputCompany5">Building</label>
                                            {/* <Field
                                                name="group"
                                                placeholder={localStorage.getItem("groupName")}
                                                as = 'select'
                                                className="form-control"
                                                isMulti={true}
                                            >
                                                <option>{localStorage.getItem('groupName')}</option>
                                            {props.groups.map((group, index) => {
                                                return <option>{group.path}</option>
                                            })}
                                            </Field> */}
            <FieldArray
            name="group"
            render={arrayHelpers => (
              <div>
                {props.groups.map((group, index) => (
                  <div key={group.name}>
                    <label>
                      <input
                        name="group"
                        type="checkbox"
                        value={group.name}
                        checked={values.group.includes(group.name)}
                        onChange={e => {
                          if (e.target.checked) arrayHelpers.push(group.name);
                          else {
                            const idx = values.group.indexOf(group.name);
                            arrayHelpers.remove(idx);
                          }
                        }}
                      />
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
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
                                                <option></option>
                                                <option>Admin</option>
                                                <option>Supervisor</option>
                                                <option>Engineer</option>
                                                <option>ViewOnly</option>

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
                                            <p className="mb-2 ">Password requirements</p>
                                            <p className="small">To create a new password, you have to
                                                meet all
                                                of the following requirements:</p>
                                            <ul className="small pl-4 mb-0 text-light">
                                                <li>Minimum 12 character</li>
                                                <li>At least one special character</li>
                                                <li>At least one number</li>
                                                <li>At least one Uppercase character</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="btn-group m-4">
                                        <button type="submit" className="btn btn-primary" disabled={!touched}>Save Change</button>

                                        <button type="button" className="btn btn-secondary" onClick={()=>{history.push("/dashboard")}} >Cancel</button>
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

export default NewUser
