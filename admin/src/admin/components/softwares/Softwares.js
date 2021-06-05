import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import { softwaresData } from "./SoftwaresData";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

const Softwares = () => {

  function formatDate(date) {
    date = new Date(date);
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return ` ${currentDate} ${monthName} ${date.getFullYear()}`;
  }

  const [Softwares, setSoftware] = useState({ softwares: [] });
  const [filterSoftware, setFilterSoftware] = useState(null);

  const filter = (e)=>{
    setFilterSoftware({
      softwares: Softwares.softwares.filter((el) => el.softwareName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ),
    });
  }
  

  function deleteSoftware(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    axios.delete("http://localhost:5000/api/software-management/", { params })
      .then((response) => {
        if (response.data.success) {
          axios.delete("http://localhost:5000/api/latest-software/column/", { params })
          axios.delete("http://localhost:5000/api/populor-software/column/", { params })
          setSoftware({
            softwares: Softwares.softwares.filter((el) => el._id !== id),
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get("http://localhost:5000/api/software-management/", { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setSoftware({ softwares: response.data.data });
        }
      }).catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
      })
    return () => cancelTokenSource.cancel('Operation canceled by the user.');
  }, []);

  return (
    <Fragment>
      <h4>All Softwares</h4>
      <div className="admin_all_softwares">
        <input className="form-control"  type="text" placeholder="Search.." onChange={filter} />
      <br/>

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
            {(filterSoftware !== null)?
              filterSoftware.softwares.map((soft, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{soft.softwareName}</td>
                  <td>{soft.softwareVersion}</td>
                  <td>{(soft.softwareCategory === null) ? "un-categorized" : soft.softwareCategory.categoryName}</td>
                  <td>{formatDate(soft.createdAt)}</td>
                  <td width="100px">
                    <div className="d-flex">
                      <Link to={`/admin/softwares-management/edit/${soft._id}`}  >
                        <Button variant="secondary" className="mx-2">
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button variant="danger" onClick={() => { deleteSoftware(soft._id); }} className="mx-2">
                        <AiFillDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            
            :  
            Softwares.softwares.map((soft, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{soft.softwareName}</td>
                <td>{soft.softwareVersion}</td>
                <td>{(soft.softwareCategory === null) ? "un-categorized" : soft.softwareCategory.categoryName}</td>
                <td>{formatDate(soft.createdAt)}</td>
                <td width="100px">
                  <div className="d-flex">
                    <Link to={`/admin/softwares-management/edit/${soft._id}`}  >
                      <Button variant="secondary" className="mx-2">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button variant="danger" onClick={() => { deleteSoftware(soft._id); }} className="mx-2">
                      <AiFillDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
            
            }
            
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default Softwares;
