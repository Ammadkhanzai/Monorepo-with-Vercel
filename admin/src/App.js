import { BrowserRouter as Router, Switch, Route   } from "react-router-dom";
import {  useRouteMatch } from "react-router-dom";
import PrivateRoute from './admin/components/user/PrivateRoute';
import PublicRoute from './admin/components/user/PublicRoute';
import { useState , useEffect } from 'react';
import axios from 'axios';



// IMPORT APP CSS
import "./App.css";

// IMPORT ADMIN CSS
import "./admin/App.css";

// IMPORT APP COMPONENTS
import Home from "./components/pages/Home";
import Widget from "./components/pages/Widget";
import Download from "./components/pages/Download";
import WidgetState from "./context/fileinstant/widget/WidgetState";
import DownloadWait from "./components/pages/DownloadWait";
import About from "./components/pages/About";
import DownloadList from "./components/pages/DownloadList";
import CategorySoftware from "./components/pages/CategorySoftware.js";
import Contact from "./components/pages/Contact";
import AdvertiseWithUs from "./components/pages/AdvertiseWithUs";
import TechNews from "./components/pages/TechNews";
import LatestNews from "./components/pages/LatestNews";

// IMPORT ADMIN PANEL COMPONENTS
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import HomeManagement from "./admin/pages/HomeManagement";
import SoftwaresCategories from "./admin/pages/SoftwaresCategories";
import SoftwaresManagement from "./admin/pages/SoftwaresManagement";
import InfoPages from "./admin/pages/InfoPages";
import DetailStatics from "./admin/pages/DetailStatics";
import StaffManagement from "./admin/pages/StaffManagement";
import AlertsAndNotifications from "./admin/pages/AlertsAndNotifications";


import { getToken, removeUserSession, setUserSession } from './utils/common';

function App() {
  
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`http://localhost:5000/api/login/verifyToken/`,{ 
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
              {/* APP ROUTES  */}

              <Route exact path="/" component={Home} />
              <Route exact path="/widget" component={Widget} />
              <Route exact path="/download/:title/:id" component={Download} />
              <Route exact path="/download/wait/:id" component={DownloadWait} />
              <Route exact path="/softwares/latest-software" component={DownloadList} />
              <Route exact path="/softwares/popular-software" component={DownloadList} />
              <Route exact path="/softwares/:category" component={CategorySoftware} />
              {/* <Route exact path="/latest-softwares/" component={DownloadList} /> */}
              <Route
                exact
                path="/advertise-with-us"
                component={AdvertiseWithUs}
              />
              <Route exact path="/tech-news" component={TechNews} />
              <Route exact path="/tech-news/:newsitle" component={LatestNews} />
              <Route exact path="/about" component={About} />
              <Route exact path="/:a" component={About} />
              <Route exact path="/contact" component={Contact} />

              {/* ADMIN PANEL ROUTES */}
              <PublicRoute exact path="/admin/admin-login" component={Login} />
              <PrivateRoute
                exact
                path="/admin"
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
            </Switch>
        </div>
      </Router>
    </WidgetState>
  );
}

export default App;
