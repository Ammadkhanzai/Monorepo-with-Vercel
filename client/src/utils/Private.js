import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/authContext";

function Private({ component: Component, ...rest }) {
    const { loggedIn } = useContext(AuthContext);
    return (
        <Route  {...rest} render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to='/admin/admin-login' />
            )
        }
        />
    );

}

export default Private;