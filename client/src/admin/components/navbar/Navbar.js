// import react icons
import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

// Import bootstrap css
// import "bootstrap/dist/css/bootstrap.min.css";

// Importing react-bootstrap compoonents //
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
// ================================================ //

import {removeUserSession} from '../../../utils/common.js'

const Navbar = ({ navTitle }) => {
  let history = useHistory()
  const logout  = ()=>{
    removeUserSession()
    history.push("/admin/admin-login")

  }
  return (
    <div className="navbar">
      <Container fluid>
        <Row className="w-100">
          <Col lg={12}>
            <div className="d-flex justify-content-between">
              <h3>{navTitle}</h3>
              <div className="navbar_right">
                <NavDropdown
                  title={<FaUserAlt />}
                  id="basic-nav-dropdown"
                  className="nav_user_dropdown"
                >
                  <NavDropdown.Item href="#">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="#">Setting</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  onClick={logout} >Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
