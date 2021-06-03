import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

const PopularSoftwares = () => {
  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}/${currentDate}/${date.getFullYear()}`;
  }
  const [populorSoftwares, setPopulorSoftware] = useState({ softwares: [] });
  function deletePopulorSoftware(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    axios.delete("/api/popular-software/", { params })
      .then((response) => {
        if (response.data.success) {
          setPopulorSoftware({
            softwares: populorSoftwares.softwares.filter((el) => el._id !== id),
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get("/api/popular-software/", { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setPopulorSoftware({ softwares: response.data.data });
        }
        
      })
      .catch((e) => {
        if (axios.isCancel(e)) {  
          console.log('Request canceled', e.message);
        }else{
          console.log(e);
        }
      });
      return ()=> cancelTokenSource.cancel('Operation canceled by the user.');
  }, []);
  

  return (
    <Fragment>
      <h4>Popular Softwares</h4>
      <div className="admin_popular_softwares">
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
            {populorSoftwares.softwares.map((soft, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{soft.softwareID.softwareName} </td>
                <td>{soft.softwareID.softwareVersion}</td>
                <td>{(soft.softwareID.softwareCategory === null)? "un-categorized": soft.softwareID.softwareCategory.categoryName  }</td>
                <td>{formatDate(soft.softwareID.createdAt)}</td>
                <td width="100px">
                  <div className="d-flex">
                    
                    <Button
                      variant="danger" onClick={() => { deletePopulorSoftware(soft._id); }} className="mx-2" >
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

export default PopularSoftwares;
