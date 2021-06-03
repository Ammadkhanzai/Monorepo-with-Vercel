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
import AddOrUpdateStaffForm from "../components/staff/AddOrUpdateStaffForm";
import StaffsTable from "../components/staff/StaffsTable";

import PageNotFound from "./404.js";
import { getToken, removeUserSession, setUserSession , getUser} from '../../utils/common';

const DetailStatics = () => {

  const [authLoading, setAuthLoading] = useState(true);
  const [authentic, setAuthentic] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`/api/login/verifyToken/`,{ 
        cancelToken: cancelTokenSource.token,
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
    return () => cancelTokenSource.cancel("Operation canceled by the user.");
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  if(authentic === false){
    return <Redirect to="/admin/admin-login" />
  }

  const permission = getUser()
  
  if(permission !== null && permission.staffManagement === false){
    return <PageNotFound />
  }

  return (
    <div className="admin_main">
      <Container fluid>
        <Row>
          <Col lg={2} className="p-0">
            <Sidebar activeClass="sidePanelActive" />
          </Col>
          <Col lg={10} className="p-0">
            <Navbar navTitle="Staff Management" />
            <div id="admin_staff_management">
              <Row>
                <Col lg={12}>
                  <StaffsTable />
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <AddOrUpdateStaffForm />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailStatics;
