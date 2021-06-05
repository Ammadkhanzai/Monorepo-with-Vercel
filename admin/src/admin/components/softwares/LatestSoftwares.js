import { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import { latestSoftwaresData } from "./SoftwaresData";
// import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

const LatestSoftwares = () => {
  function formatDate(date) {
    date = new Date(date);
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return `${currentDate} ${monthName} ${date.getFullYear()}`;
  }
  const [latestSoftwares, setLatestSoftware] = useState({ softwares :[]});
  function deleteLatestSoftware(id){
    
    const params = new URLSearchParams();
    params.append('id', id );
    
    axios.delete("http://localhost:5000/api/latest-software/", {params})
    .then((response) => {
        if(response.data.success){
          setLatestSoftware({ softwares: latestSoftwares.softwares.filter(el => el._id !== id)})  
        }
    }).catch((e) => {
      console.log(e);
    }) 
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get("http://localhost:5000/api/latest-software/", { cancelToken: cancelTokenSource.token })
    .then((response) => {
      if (response.data.success) {
        setLatestSoftware({ softwares: response.data.data });  
      }
    }).catch((e) => {
      if (axios.isCancel(e)) {  
        console.log('Request canceled', e.message);
      }else{
        console.log(e);
      }
    });
    return ()=> cancelTokenSource.cancel('Operation canceled by the user.');
  },[]);

  return (
    <Fragment>
      <h4>Latest Softwares</h4>
      <div className="admin_latest_softwares">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Version</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {latestSoftwares.softwares.map((soft, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{soft.softwareID.softwareName}</td>
                <td>{soft.softwareID.softwareVersion}</td>
                <td>{(soft.softwareID.softwareCategory === null)? "un-categorized": soft.softwareID.softwareCategory.categoryName  }</td>
                <td>{formatDate(soft.softwareID.createdAt)}</td>
                <td width="100px">  
                  <div className="d-flex">
                    
                    <Button variant="danger"  onClick={() => { deleteLatestSoftware(soft._id) }}  className="mx-2">
                      <AiFillDelete />
                    </Button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default LatestSoftwares;
