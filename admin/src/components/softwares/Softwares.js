import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

const AddButton = ({ data }) => {
  return (
    <div>hello</div>
  )
}

const Softwares = () => {

  const test = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/latest-software/single/` + id)
      .then((response) => {
        // console.log(response)
        // if (response.data.data.length > 0) {
        // console.log("data", response.data.data)
        return <AddButton data={'data'} />
        // }
      }).catch((e) => {
        console.log(e);
      });
  }

  const addToPopular = (id) => {
    // console.log(id)
    axios.post(`${process.env.REACT_APP_API_URL}/api/popular-software/`, { softwareID: id })
      .then((response) =>
        console.log(response)
      )
      .catch((err) =>
        console.log(err)
      )
  }

  const addToLatest = (id) => {
    console.log(id)
    axios.post(`${process.env.REACT_APP_API_URL}/api/latest-software/`, { softwareID: id })
      .then((response) =>
        console.log(response)
      )
      .catch((err) =>
        console.log(err)
      )
  }

  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}/${currentDate}/${date.getFullYear()}`;
  }

  const [softwares, setSoftware] = useState({ softwares: [] });
  function deleteSoftware(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    axios.delete(`${process.env.REACT_APP_API_URL}/api/software-management/`, { params })
      .then((response) => {
        if (response.data.success) {
          axios.delete(`${process.env.REACT_APP_API_URL}/api/latest-software/column/`, { params })
          axios.delete(`${process.env.REACT_APP_API_URL}/api/popular-software/column/`, { params })
          setSoftware({
            softwares: softwares.softwares.filter((el) => el._id !== id),
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/`, { cancelToken: cancelTokenSource.token })
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
      <div className="admin_all_softwares" >
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Version</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
              <th>Latest</th>
              <th>popular</th>
            </tr>
          </thead>
          <tbody>
            {softwares.softwares.map((soft, key) => (
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
                    <Button variant="danger" onClick={() => { deleteSoftware(soft._id) }} className="mx-2">
                      <AiFillDelete />
                    </Button>
                  </div>
                </td>
                <td>
                  {test(soft._id)}
                  <Button variant="primary" onClick={() => { addToPopular(soft._id) }} className="mx-2" >
                    <AiFillFileAdd />
                  </Button>
                </td>
                <td>
                  <Button variant="primary" onClick={() => { addToLatest(soft._id) }}>
                    <AiFillFileAdd />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default Softwares;