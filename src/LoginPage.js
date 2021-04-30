import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback} from "react";
import {Redirect} from "react-router-dom";
import Yup from "yup";
import {Formik, ErrorMessage, Form, Field} from "formik";
const LoginPage = ()=> {



    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    if (keycloak?.authenticated) {
        return <Redirect to={'/dashboard'}/>
    }


    const initialValues = {
        email: "",
        password: "",
    }


    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email Required"),

        password: Yup.string()
            .required("Password Required"),

    });






    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className= "card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Log In</h2>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={SignUpSchema}
                                validateOnBlur={true}
                                onSubmit={(values) => {
                                    console.log(values);

                                }}
                            >

                                {({values, errors, touched}) => (


                                    <Form>
                                        <div className="form-group">
                                            <Field
                                                name = "email"
                                                placeholder = "Email Address"
                                                type = "text"
                                                className = "form-control"

                                            />
                                            <ErrorMessage/>
                                        </div>

                                        <div className="form-group">
                                            <Field
                                                name = "password"
                                                placeholder = "Password"
                                                type = "password"
                                                className = "form-control"

                                            />
                                            <ErrorMessage/>
                                        </div>

                                        <button type = "submit" className= "btn-secondary w-100">
                                            Log In
                                        </button>

                                    </Form>



                                )

                                }

                            </Formik>
                    </div>
                </div>
            </div>
            <div className= "W-100 text-center mt-2">
                <div className= "W-100 text-center mt-2">
                    <img src = "https://pbs.twimg.com/profile_images/1135686411968032774/wG0CkGI5_400x400.png" alt = "image of mckenneys logo"
                         style = {{maxWidth: "100px", maxHeight: "100px"}}/>
                </div>
            </div>
        </div>
    )

}

export default LoginPage
