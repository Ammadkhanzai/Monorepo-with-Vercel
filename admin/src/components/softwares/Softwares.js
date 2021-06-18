import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Pagination from "./Pagination";


const Softwares = () => {

  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}/${currentDate}/${date.getFullYear()}`;
  }
  function addToPopular(id) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/popular-software/`, { softwareID: id })
      .then((response) =>
        console.log(response)
      )
      .catch((err) =>
        console.log(err)
      )
  }

  function addToLatest(id) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/latest-software/`, { softwareID: id })
      .then((response) =>
        console.log(response)
      )
      .catch((err) =>
        console.log(err)
      )
  }

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

  // filter softwares
  const [softwares, setSoftware] = useState({ softwares: [] });
  const [filterSoftware, setFilterSoftware] = useState(null);
  const [latestCheck, setLatestCheck] = useState({ software: [] });
  const [popularCheck, setPopularCheck] = useState({ software: [] });
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loading, setLoading] = useState(true);

  const filterLatestSoft = (id) => {
    let res = latestCheck.software.find((el) => {
      if (id === el.softwareID._id) {
        return true
      }
    })
    return res

  }

  const filterPopularSoft = (id) => {
    let res = popularCheck.software.find((el) => {
      if (id === el.softwareID._id) {
        return true
      }
    })
    return res
  }


  function filter(e) {
    setFilterSoftware({
      softwares: softwares.softwares.filter((el) => el.softwareName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1),
    });
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    //Latest Software
    axios.get(`${process.env.REACT_APP_API_URL}/api/latest-software/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setLatestCheck({ software: response.data.data });
        setLoadingLatest(false);
      }).catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
      })

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    //Popular Software
    axios.get(`${process.env.REACT_APP_API_URL}/api/popular-software/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setPopularCheck({ software: response.data.data });
        setLoadingPopular(false);
      }).catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
      })

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setSoftware({ softwares: response.data.data });
          setLoading(false);
        }
      }).catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
        setLoading(false);
      })
    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
  }, [latestCheck, popularCheck])


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
      <h4>All Softwares</h4>
      {
        loading ?
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
          :
          <div className="admin_all_softwares" >
            <input className="form-control search_bar" type="text" placeholder="Search.." onChange={filter} />
            <br />
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
                  <th>Popular</th>
                </tr>
              </thead>
              <tbody>
                {
                  (filterSoftware !== null) ?
                    filterSoftware.softwares.slice(pagination.start, pagination.end).map((soft, key) => (
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
                        {
                          loadingLatest ? <td>Loading...</td>
                            :

                            <td>
                              {
                                filterLatestSoft(soft._id) ?
                                  <Button variant="success" disabled>
                                    <AiOutlineCheck />
                                  </Button>
                                  : <Button variant="success" onClick={() => { addToLatest(soft._id) }}>
                                    <BsPlus />
                                  </Button>
                              }
                            </td>
                        }
                        {
                          loadingPopular ? <td>Loading...</td>
                            :
                            <td>
                              {
                                filterPopularSoft(soft._id) ?
                                  <Button variant="success" disabled>
                                    <AiOutlineCheck />
                                  </Button>
                                  : <Button variant="success" onClick={() => { addToPopular(soft._id) }}>
                                    <BsPlus />
                                  </Button>
                              }
                            </td>
                        }
                      </tr>
                    ))
                    :
                    softwares.softwares.slice(pagination.start, pagination.end).map((soft, key) => (
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
                        {
                          loadingLatest ? <td>Loading...</td>
                            :

                            <td>
                              {
                                filterLatestSoft(soft._id) ?
                                  <Button variant="success" disabled>
                                    <AiOutlineCheck />
                                  </Button>
                                  : <Button variant="success" onClick={() => { addToLatest(soft._id) }}>
                                    <BsPlus />
                                  </Button>
                              }
                            </td>
                        }
                        {
                          loadingPopular ? <td>Loading...</td>
                            :
                            <td>
                              {
                                filterPopularSoft(soft._id) ?
                                  <Button variant="success" disabled>
                                    <AiOutlineCheck />
                                  </Button>
                                  : <Button variant="success" onClick={() => { addToPopular(soft._id) }}>
                                    <BsPlus />
                                  </Button>
                              }
                            </td>
                        }

                      </tr>
                    ))
                }
              </tbody>
            </Table>
            <Pagination
              key={'id'}
              showPerPage={5}
              onPaginationChange={onPaginationChange}
              total={softwares.softwares.length}
            />
          </div>

      }
    </>
  );
};

export default Softwares;