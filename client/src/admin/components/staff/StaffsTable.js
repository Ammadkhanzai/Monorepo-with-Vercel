import { Fragment , useEffect , useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const StaffsTable = () => {

  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}/${currentDate}/${date.getFullYear()}`;
  }
  
  const [users,setUsers] = useState({users:[]});

  const drivePermission = (data) =>{
    let Options = [];
    Object.keys(data).forEach(function(key) {
      if(data[key] === true ){
        Options.push(key.toUpperCase());
      }  
    });
    return Options;
  }

  const deleteStaffMember = (id)=>{
    axios.delete(`/api/users/${id}`)
    .then((response) => {
      // console.log(response);
      if (response.data.success) {
        setUsers({ users: users.users.filter(el => el._id !== id)})  
        
      }
    }).catch((e) => {
      if (axios.isCancel(e)) {  
        console.log('Request canceled', e.message);
      }else{
        console.log(e);
      }
    })


  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get("/api/users/", { cancelToken: cancelTokenSource.token })
    .then((response) => {
      // console.log(response);
      if (response.data.success) {
        setUsers({users:response.data.data});  
      }
    }).catch((e) => {
      if (axios.isCancel(e)) {  
        console.log('Request canceled', e.message);
      }else{
        console.log(e);
      }
    })
    return ()=> cancelTokenSource.cancel('Operation canceled by the user.');      
  },[]);
  // console.log(users);
  
  return (
    
    <Fragment>
      <h4 className="my-4">Staffs List</h4>
      <Table striped bordered hover size="sm" className="staff_table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Username</th>
            <th>Roles</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
          {users.users.map((staff, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{staff.email}</td>
              <td>{staff.username}</td>
              <td>{drivePermission(staff.permissions).join(" | ")}</td>
              <td>{formatDate(staff.createdAt)}</td>
              <td width="100px">
                <div className="d-flex">
                  <Link  to={`/admin/staff-management/edit/${staff._id}`}  >
                    <Button variant="secondary" className="mx-2">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => { deleteStaffMember(staff._id) }} className="mx-2">
                    <AiFillDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default StaffsTable;
