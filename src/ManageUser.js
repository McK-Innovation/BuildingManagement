import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useRef, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FieldArray} from "formik";
//import {addUser, updateIndividual} from "./keycloakUtils";

import {updateIndividual} from "./KeycloakHelper"
import {Confirmation} from "./Confirmation";

const ViewEdit = (props)=> {
    let history = useHistory()
    const [person, updatePerson] = useState(props.person);
    console.log(props.person)
    console.log(props.groups)
    console.log(props.person.attributes)
    console.log(person)
    let keys = Object.keys(props.person.attributes)
    let groups = []
    console.log(keys)
    console.log(keys.length)
    // let groups = []
    // let keys = Object.entries(props.person.attributes);
    // console.log(keys)
    // let getCurrentGroups = (key) =>  {
    //     // key [['group0', 'Child 1'], ['group1', 'Child 2'], [ 'permissionLevel', 'Supervisor']]
    //     groups = key.filter((group, index) => {

    //         if(group[index] = `group${index}`) {
    //             return group[index]
    //         }
    //     })
    // }
    // getCurrentGroups(keys);

    //get user from context, then update if update is clicked and route to the users page

    // console.log(groups)
    for(let x = 0; x <= keys.length; x ++) {
    for( let group in props.person.attributes) {
        
        if (group === `group${x}`) {
            console.log(props.person.attributes[group])
            groups.push(props.person.attributes[group])
        }
        
    }
}
let merged = [].concat.apply([], groups)
console.log(groups)
console.log(merged)

    let val = useRef({})
    const [show, setShow] = useState(false)

    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/,
                "Must Contain at least 12 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
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

    async function editUser(username, email, password, firstname, lastname, currentGroup, permissionLevel ) {
        console.log(props.person.id)
        await updateIndividual(props.person.id, {username: username, email: email, password: password, firstName: firstname, lastName: lastname, currentGroups: currentGroup, permissionLevel: permissionLevel  })
    }

   const initialValues = {

       email: person.email,

       password: '' ,

       firstname: person.firstName,

       lastname: person.lastName,

       newpassword: '',

       username: person.username ,

       currentGroup: '',

       permissionLevel: person.hasOwnProperty("attributes")? person.attributes.permissionLevel : ''

   }
   const renew = () => {
        return <option selected>{initialValues.permissionLevel}</option>
   }


    return (
        <div className="container text-light">

            {show && <Confirmation caller = {() => {
                let values = val.current;
                editUser(values.username, values.email, values.password, values.firstname, values.lastname, values.currentGroup, values.permissionLevel)
                    .catch((e)=>(console.log(e)))
                    .then((r) => {
                        props.updateDashboard(values)
                        if(r) {
                            alert(r)
                        }
                    })
            }} open = {setShow}/>
            }

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto overflow-auto">

                    <div className="my-4">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            validateOnBlur={true}
                            onSubmit={(values) => {
                                val.current = values;
                                // updatePerson(values);
                                setShow(true)
                                //editUser(values.username, values.email, values.password, values.firstname, values.lastname).catch((e)=>(console.log(e))).then((r) => console.log("done"))
                                //async function to create the user and then assign to a "my" group


                            }}
                        >
                            {({values, errors, touched}) => (
                                <Form>
                                    <div className="row align-items-center text-light border border-secondary rounded" style={{height:'20em'}}>
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
                                                    <p className="mb-0 text-muted h1 mt-3">{values.email ? values.email: "Email"}</p>
                                                    <p className="mb-0 text-muted h1 mt-1">{values.currentGroup ? values.currentGroup + '--': merged.map((item, i) => { 
                                                        return <span>{item}, </span>
                                                    })}</p>
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
                                                readOnly
                                                disabled

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
                                                readOnly
                                                disabled

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
                                            readOnly
                                            disabled

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
                                            readOnly
                                            disabled

                                        />

                                        <ErrorMessage
                                            name = "username"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6 offset-3">
                                            <label htmlFor="inputCompany5">Building</label>
                                            {/* <Field
                                                name="currentGroup"
                                                placeholder={localStorage.getItem("groupName")}
                                                type="text"
                                                className="form-control"
                                                readOnly

                                            /> */}
                                            <FieldArray
            name="currentGroup"
            render={arrayHelpers => (
              <div>
                {props.groups.map((group, index) => (
                  <div key={group.name}>
                    <label>
                      <input
                        name="currentGroup"
                        type="checkbox"
                        value={group.path}
                        checked={values.currentGroup.includes(group.name)}
                        onChange={e => {
                          if (e.target.checked) arrayHelpers.push(group.name);
                          else {
                            const idx = values.currentGroup.indexOf(group.name);
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
                                                {renew}

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
                                                <li>Minimum 12 characters</li>
                                                <li>At least one special character</li>
                                                <li>At least one number</li>
                                                <li>At least one Uppercase character</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="btn-group m-4">
                                        <button type="submit" className="btn btn-primary" style={{marginRight:'1em'}} disabled={!touched}>Save Change</button>

                                        <button type="button" className="btn btn-secondary" style={{marginLeft:'1em'}} onClick={()=>{history.push("/dashboard")}}>Cancel</button>

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
