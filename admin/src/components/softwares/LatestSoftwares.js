import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

import Pagination from "./Pagination";

const LatestSoftwares = () => {

  function formatDate(date) {
    date = new Date(date);
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return `${currentDate} ${monthName} ${date.getFullYear()}`;
  }

  const [latestSoftwares, setLatestSoftware] = useState({ softwares: [] });
  const [loading, setLoading] = useState(true);

  function deleteLatestSoftware(id) {
    const params = new URLSearchParams();
    params.append('id', id);

    axios.delete(`${process.env.REACT_APP_API_URL}/api/latest-software/`, { params })
      .then((response) => {
        if (response.data.success) {
          setLatestSoftware({ softwares: latestSoftwares.softwares.filter(el => el._id !== id) })
        }
      }).catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/latest-software/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setLatestSoftware({ softwares: response.data.data });
          setLoading(false)
        }

      }).catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
        setLoading(false)
      });
    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
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
    <>
      <h4>Latest Softwares</h4>
      {
        loading ?
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
          :
          <div className="admin_latest_softwares">
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
                {latestSoftwares.softwares.slice(pagination.start, pagination.end).map((soft, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{soft.softwareID.softwareName}</td>
                    <td>{soft.softwareID.softwareVersion}</td>
                    <td>{(soft.softwareID.softwareCategory === null) ? "un-categorized" : soft.softwareID.softwareCategory.categoryName}</td>
                    <td>{formatDate(soft.softwareID.createdAt)}</td>
                    <td width="100px">
                      <div className="d-flex">

                        <Button variant="danger" onClick={() => { deleteLatestSoftware(soft._id) }} className="mx-2">
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
              total={latestSoftwares.softwares.length}
            />
          </div>

      }
    </>
  );
};

export default LatestSoftwares;
