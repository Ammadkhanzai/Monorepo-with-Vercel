import { Fragment, useState, useEffect } from "react";
import axios from "axios";

// import { popularSoftwaresData } from "./SoftwaresData";
// import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Pagination from "./Pagination";

const PopularSoftwares = () => {
  function formatDate(date) {
    date = new Date(date);
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return `${currentDate} ${monthName} ${date.getFullYear()}`;
  }
  const [populorSoftwares, setPopulorSoftware] = useState({ softwares: [] });
  function deletePopulorSoftware(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    axios.delete(`${process.env.REACT_APP_API_URL}/api/popular-software/`, { params })
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
    axios.get(`${process.env.REACT_APP_API_URL}/api/popular-software/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setPopulorSoftware({ softwares: response.data.data });
        }

      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
      });
    return () => cancelTokenSource.cancel('Operation canceled by the user.');
  }, []);

  //Pagination
  const [pagination, setPagination] = useState({
    start: 0,
    end: 5,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  //

  return (
    <Fragment>
      <h4>Popular Softwares</h4>
      <div className="admin_popular_softwares">
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Version</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {populorSoftwares.softwares.slice(pagination.start, pagination.end).map((soft, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{soft.softwareID.softwareName} </td>
                <td>{soft.softwareID.softwareVersion}</td>
                <td>{(soft.softwareID.softwareCategory === null) ? "un-categorized" : soft.softwareID.softwareCategory.categoryName}</td>
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
        <Pagination
          key={'id'}
          showPerPage={5}
          onPaginationChange={onPaginationChange}
          total={populorSoftwares.softwares.length}
        />
      </div>
    </Fragment>
  );
};

export default PopularSoftwares;
