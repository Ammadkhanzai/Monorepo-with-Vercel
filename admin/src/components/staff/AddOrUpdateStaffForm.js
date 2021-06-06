import  { Fragment, useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/esm/InputGroup";

const AddOrUpdateStaffForm = () => {
  let {id}  = useParams();

  const sidebarLinks = [
    {
      title: "Dashboard",
    },
    {
      title: "Home Management",
    },
    {
      title: "Softwares Categories",
    },
    {
      title: "Softwares Management",
    },
    {
      title: "Info Pages",
    },
    {
      title: "Detail Statics",
    },
    {
      title: "Staff Management",
    },
    {
      title: "Alerts And Notifications",
    },
  ];
  
  const [updateState, setUpdateState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  
  const [staffFields, setStaffFields] = useState({
    fName: "",
    lName: "",
    email: "",
    username: "",
    password: "",
    roles: {
      Dashboard: false,
      HomeManagement: false,
      SoftwaresCategories: false,
      SoftwaresManagement: false,
      InfoPages: false,
      DetailStatics: false,
      StaffManagement: false,
      AlertsAndNotifications: false,
    },
  });

  const onChange = (e) => {
    setStaffFields({ ...staffFields, [e.target.name]: e.target.value });
  };
  const onCheck = (e) => {
    let checked = staffFields.roles[e.target.name];
    setStaffFields({
      ...staffFields,
      roles: { ...staffFields.roles, [e.target.name]: !checked },
    });
  };

  const addStaffFormHandler = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setMessage(false);
    const userData = {
      email: staffFields.email,
      password: staffFields.password,
      username: staffFields.username,
      firstname: staffFields.fName,
      lastname: staffFields.lName,
      permissions:  {
        "dashboard": staffFields.roles.Dashboard,
        "homeManagement": staffFields.roles.HomeManagement,
        "softwaresCategories": staffFields.roles.SoftwaresCategories,
        "softwaresManagement": staffFields.roles.SoftwaresManagement,
        "infoPages": staffFields.roles.InfoPages,
        "detailStatics": staffFields.roles.DetailStatics,
        "staffManagement": staffFields.roles.StaffManagement,
        "alertsAndNotifications": staffFields.roles.AlertsAndNotifications
      } ,
    }
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/`, userData ) 
    .then((response) => {
      if (response.data.success) {
        setMessage("Data successfully inserted into database.");
        setIsLoading(false);
        window.scrollTo(0, 200 , { behavior:'smooth'});
      }
    })
    .catch((e) => {
      if (e.response.status === 400) {
        setError(e.response.data.message.toLocaleUpperCase());
        setIsLoading(false);
        window.scrollTo(0, 200 , { behavior:'smooth'});
      }
    });
  }

  const updateStaffFormHandler = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    setMessage(false);
    const userData = {
      email: staffFields.email,
      password: staffFields.password,
      username: staffFields.username,
      firstname: staffFields.fName,
      lastname: staffFields.lName,
      permissions:  {
        "dashboard": staffFields.roles.Dashboard,
        "homeManagement": staffFields.roles.HomeManagement,
        "softwareCategories": staffFields.roles.SoftwaresCategories,
        "softwareManagment": staffFields.roles.SoftwaresManagement,
        "infoPages": staffFields.roles.InfoPages,
        "detailStats": staffFields.roles.DetailStatics,
        "staffManagement": staffFields.roles.StaffManagement,
        "alertNotification": staffFields.roles.AlertsAndNotifications
      } ,
    }
    axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, userData ) 
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        setMessage("Data successfully updated into database.");
        setIsLoading(false);
        window.scrollTo(0, 200 , { behavior:'smooth'});
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status === 400) {
        setError(e.response.data.message.toLocaleUpperCase());
        setIsLoading(false);
        window.scrollTo(0, 200 , { behavior:'smooth'});
      }
    });
    
  }
  useEffect(() => {
    if(id){
      setUpdateState(true);
      const cancelTokenSource = axios.CancelToken.source();
      axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${id}`,
          { cancelToken: cancelTokenSource.token }
        )
        .then((response) => {
          if(response.data.success){
            setStaffFields({
              fName: response.data.data.firstname,
              lName: response.data.data.lastname,
              email: response.data.data.email,
              username: response.data.data.username,
              password: "",
              roles: {
                Dashboard: response.data.data.permissions.dashboard,
                HomeManagement: response.data.data.permissions.homeManagement,
                SoftwaresCategories: response.data.data.permissions.softwareCategories,
                SoftwaresManagement: response.data.data.permissions.softwareManagment,
                InfoPages: response.data.data.permissions.infoPages,
                DetailStatics: response.data.data.permissions.detailStats,
                StaffManagement: response.data.data.permissions.staffManagement,
                AlertsAndNotifications: response.data.data.permissions.alertNotification,
              },
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
    }
  },[id]);
  
  return (
    <Fragment>
      <h4 className="my-4">Staff Management</h4>
      <Form onSubmit={ updateState === false ? addStaffFormHandler : updateStaffFormHandler }  >
        <Row className="my-2">
          <Col>
            <span style={{ color: "green" }}>{message}</span>
            <span style={{ color: "red" }}>{error}</span>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="fName"
              value={staffFields.fName}
              placeholder="Enter first name here..."
              required
              onChange={onChange}
            />
          </Col>
          <Col>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lName"
              value={staffFields.lName}
              placeholder="Enter last name here..."
              required
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={staffFields.email}
              placeholder="Enter email here..."
              required
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={staffFields.username}
              placeholder="Enter username here..."
              required
              onChange={onChange}
            />
          </Col>
          <Col>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password here..."
              value={staffFields.password}
              minLength="8"
              required
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Roles:</Form.Label>
            {sidebarLinks.map((link, key) => {
              const slug = link.title.split(" ").join("");
              
              return (
                <InputGroup className="mb-3" key={key}>
                  <InputGroup.Checkbox
                    name={slug}
                    aria-label="Checkbox for following text input"
                    checked={staffFields.roles[slug]}
                    onChange={onCheck}
                  />
                  <Form.Label className="ml-2 mb-0 roles_checkbox">
                    {link.title}
                  </Form.Label>
                </InputGroup>
              );
            })}
          </Col>
        </Row>
        <Row className="my-2 mt-4">
          <Col>
            {isLoading ? (
              "Submitting........"
            ) : (
              <Button variant="primary" type="submit">
                {updateState === false ? "Add Staff" : "Update Staff"}
              </Button>
            )}
            
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddOrUpdateStaffForm;
