import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Pagination from "./Pagination";


const Softwares = () => {

  const test = async (data) => {
    // console.log(data)
    let arr = []
    let count = 0;
    for (var index = 0; index < data.length; index++) {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/latest-software/single/` + data[index]._id)
      // if (res.data.data.length > 0) {
      arr[count] = res.data.data.length
      count++
      // }
    }
    return arr
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
  const [latestBtn, setLatestBtn] = useState({ btn: [] })

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
  const [filterSoftware, setFilterSoftware] = useState(null);

  const filter = (e) => {
    setFilterSoftware({
      softwares: softwares.softwares.filter((el) => el.softwareName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1),
    });
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        if (response.data.success) {
          setSoftware({ softwares: response.data.data });
          test(response.data.data)
            .then((res) => {
              console.log(res)
              setLatestBtn({ btn: res });

            }).catch(e => console.log(e))
        }

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
                    <td>
                      {/* {test(soft._id)} */}
                      <Button variant="primary" onClick={() => { addToPopular(soft._id) }} className="mx-2" >
                        <RiAddCircleFill />
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => { addToLatest(soft._id) }}>
                        <RiAddCircleFill />
                      </Button>
                    </td>
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
                    <td>
                      {
                        latestBtn.btn.map((val, key) => (
                         val == 1 ? <Button key={key}>{val}</Button> : ""
                        ))
                      }
                    </td>
                    {/* <td>
                      <Button variant="primary" onClick={() => { addToPopular(soft._id) }} className="mx-2" >
                        <RiAddCircleFill />
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => { addToLatest(soft._id) }}>
                        <RiAddCircleFill />
                      </Button>
                    </td> */}

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
        {
          // latestBtn.btn.map((val, key) => (
          //   val == 1 ? <Button key={key}>{val}</Button> : ""
          // ))
        }
      </div>
    </>
  );
};

export default Softwares;