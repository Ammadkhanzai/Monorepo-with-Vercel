// Importing NAVBAR components
import {useEffect,useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Navbar from "../components/navbar/Navbar";
// Importing BOOTSTRAP components
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
// importing SIDEBAR LINKS
import { Sidebar } from "../components/sidebar/Sidebar";

import PageNotFound from "./404.js";
import { getToken, removeUserSession, setUserSession , getUser} from '../../utils/common';

const Infopages = () => {

  const [authLoading, setAuthLoading] = useState(true);
  const [authentic, setAuthentic] = useState(null);



  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [ infoPage , setInfoPage ] = useState({
    'title': "",
    'email': "",
    'content': "",
  });
  const onChange = (e) => {
    setInfoPage({ ...infoPage, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(
        `http://localhost:5000/api/info-page/`,
        { cancelToken: cancelTokenSource.token }
      )
      .then((response) => {
        if(response.data.success){
          setInfoPage({
            'title': response.data.data[0].title,
            'email': response.data.data[0].email,
            'content': response.data.data[0].content,
          });
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Request canceled", e.message);
        }else{
          console.log(e.message);
          console.log(e.response);
        }
      });
      return () => cancelTokenSource.cancel("Operation canceled by the user.");
  },[]);

  const FormHandler = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/api/info-page/", infoPage ) 
    .then((response) => {
      if (response.data.success) {
        setMessage("Data successfully inserted into database.");
        setIsLoading(false);
        window.scrollTo(0, 0 , { behavior:'smooth'});
      }
    })
    .catch((e) => {
      if (e.response.status === 400) {
        setError(e.response.data.message.toLocaleUpperCase());
        setIsLoading(false);
        window.scrollTo(0, 0 , { behavior:'smooth'});
      }
    });


  }


  

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get(`http://localhost:5000/api/login/verifyToken/`,{ 
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

  const permission = getUser()
  if(permission !== null && permission.infoPages === false){
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
            <Navbar navTitle="Info Pages" />
            <div id="admin_info_pages">
              {/* <h3>Info Pages</h3>  */}
              <Form onSubmit={ FormHandler } >
                <Row className="my-2">
                  <Col>
                    <span style={{ color: "green" }}>{message}</span>
                    <span style={{ color: "red" }}>{error}</span>
                  </Col>
                </Row>
                <Row className="my-2" > 
                  <Col  xs={6}>
                    <Form.Group controlId="formBasicTitle" >
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" onChange={onChange}  placeholder="About FileInstant.com" name="title" value={infoPage.title} />
                    </Form.Group>
                  </Col>
                </Row>  
                <Row className="my-2">
                  <Col>
                    <Form.Group controlId="formBasicContent">
                      <Form.Control as="textarea" onChange={onChange} rows="3" name="content" value={infoPage.content} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-2" > 
                  <Col  xs={6}>
                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email"  onChange={onChange} placeholder="admin@nexecube.com" name="email" value={infoPage.email} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col>
                    <Form.Group controlId="formBasicPassword">
                    {isLoading ? ( "Submitting........"  ) : (
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      )}
                      
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Infopages;
