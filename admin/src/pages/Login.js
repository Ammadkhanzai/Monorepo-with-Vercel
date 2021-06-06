// Importing BOOTSTRAP components
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import LoginForm from "../components/user/LoginForm"

const Login = () => {
  return (
    <Container fluid className="Login">
      <Row>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>

  );
};

export default Login;
