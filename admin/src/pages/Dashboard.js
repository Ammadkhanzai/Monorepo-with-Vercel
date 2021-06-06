import {useEffect,useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


// Importing NAVBAR components
import Navbar from "../components/navbar/Navbar";

// Importing BOOTSTRAP components
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

// importing SIDEBAR LINKS
import { Sidebar } from "../components/sidebar/Sidebar";
import LineChart from "../components/dashboard/LineChart";

// import PageNotFound from "./404.js";
import { getToken, removeUserSession, setUserSession } from '../utils/common';

const Dashboard = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [authentic, setAuthentic] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/api/login/verifyToken/`,{ 
        headers: {
          'AuthorizationToken': token
        }
    }).then(response => {
      setUserSession(response.data.Token, response.data.user);
      setAuthLoading(false);
      setAuthentic(true);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
      setAuthentic(false);
    });
  }, []);

  
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  if(authentic === false){
    return <Redirect to="/admin/admin-login" />
  }

  // const permission = getUser()
  // if(permission !== null && permission.homeManagement === true){
  //   return <PageNotFound />
  // }


  return (
    <div className="admin_main">
      <Container fluid>
        <Row>
          <Col lg={2} className="p-0">
            <Sidebar activeClass="sidePanelActive" />
          </Col>
          <Col lg={10} className="p-0">
            <Navbar navTitle="Dashboard" />
            <div id="admin_dashboard">
              <div className="row mb-5">
                <LineChart />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
