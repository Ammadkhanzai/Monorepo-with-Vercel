import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/user/PrivateRoute';
import PublicRoute from './components/user/PublicRoute';
import { useState, useEffect } from 'react';
import axios from 'axios';

// IMPORT APP CSS
import "./App.css";
import { getToken, removeUserSession, setUserSession } from './utils/common';

// IMPORT ADMIN PANEL COMPONENTS
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import HomeManagement from "./pages/HomeManagement";
import SoftwaresCategories from "./pages/SoftwaresCategories";
import SoftwaresManagement from "./pages/SoftwaresManagement";
import InfoPages from "./pages/InfoPages";
import DetailStatics from "./pages/DetailStatics";
import StaffManagement from "./pages/StaffManagement";
import AlertsAndNotifications from "./pages/AlertsAndNotifications";
import WidgetState from "./context/fileinstant/widget/WidgetState";
import PageNotFound from "./pages/404";

function App() {

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/login/verifyToken/`, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'AuthorizationToken': token
      }
    }).then(response => {
      setUserSession(response.data.Token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
    return () => cancelTokenSource.cancel("Operation canceled by the user.");
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <WidgetState>
      <Router>
        <div className="App">
          <Switch>
            {/* ADMIN PANEL ROUTES */}
            <PublicRoute exact path="/admin/admin-login" component={Login} />
            <PrivateRoute
              exact
              path="/"
              component={() => (window.location.href = "/admin/dashboard")}
            />
            <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/admin/home-management"
              component={HomeManagement}
            />
            <PrivateRoute
              exact
              path="/admin/softwares-categories"
              component={SoftwaresCategories}
            />
            <PrivateRoute path="/admin/softwares-categories/edit/:id" exact component={SoftwaresCategories} />
            <PrivateRoute
              exact
              path="/admin/softwares-management"
              component={SoftwaresManagement}
            />
            <PrivateRoute
              exact
              path="/admin/softwares-management/edit/:id"
              component={SoftwaresManagement}
            />
            <PrivateRoute exact path="/admin/info-pages" component={InfoPages} />
            <PrivateRoute
              exact
              path="/admin/detail-statics"
              component={DetailStatics}
            />
            <PrivateRoute
              exact
              path="/admin/staff-management"
              component={StaffManagement}
            />
            <PrivateRoute
              exact
              path="/admin/staff-management/edit/:id"
              component={StaffManagement}
            />
            <PrivateRoute
              exact
              path="/admin/alerts-and-notifications"
              component={AlertsAndNotifications}
            />
            <Route path='*' exact={true} component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </WidgetState>
  );
}

export default App;
