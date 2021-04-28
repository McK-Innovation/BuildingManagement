import {useLocation} from "react-router";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback} from "react";
import {Redirect} from "react-router-dom";

const LoginPage = ()=> {



    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    if (keycloak?.authenticated)
        return <Redirect to={'/dashboard'} />




return (
<div>


    <h1>Log in Time!</h1>

    <div>
        <button type="button" onClick={login}>
            Login
        </button>
    </div>
</div>
)
}

export default LoginPage
