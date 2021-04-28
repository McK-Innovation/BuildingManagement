import {useKeycloak} from "@react-keycloak/web";
import {Redirect,Route} from "react-router-dom";

export function PrivateRoute(props) {
    const [keycloak] = useKeycloak()
    const isAuthorized = (roles) => {
        if (keycloak&&roles) {
            return roles.some(
                r=> {
                    const realm = keycloak.hasRealmRole(r);
                    const resource = keycloak.hasResourceRole(r);
                    return realm || resource;
                }
            )
        }
        return false;
    }
    return (
        <Route path = {props.path}> {isAuthorized(props.roles) ? <props.component {...props}/>: <Redirect to = {{pathname: '/',}}/> }</Route>

    )
}
