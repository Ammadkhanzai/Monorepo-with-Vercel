import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { getToken } from '../../utils/common.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    return (
        <Route
        {...rest}
        render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/admin/admin-login', state: { from: props.location } }} />}
      />
    );
};

export default PrivateRoute;
