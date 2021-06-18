import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

const AddAndUpdateCategoryForm = (props) => {

  //States variable
  const [message, setMessage] = useState({ status: false, color: "", text: "" });
  const [categoryName, setCategoryName] = useState("");
  const [dataloading, setDataloading] = useState(false)

  //change state onChange
  const onChange = (e) => {
    setCategoryName(e.target.value);
  }

  //Add Category into db
  const addCategory = () => {

    axios.post(`${process.env.REACT_APP_API_URL}/api/category/`, { categoryName })
      .then(response => {

        if (response.status === 201) {
          setMessage({ status: true, color: "green", text: response.data.message })
          setCategoryName("")
          props.fetchCategories()
        }

      })
      .catch((error) => {
        if (error.response.status !== 201) {
          setMessage({ status: true, color: "red", text: error.response.data.message })
        }
      });
  }

  //update Category into db
  const updateCategory = () => {
    const id = props.updateId.id
    axios.put(`${process.env.REACT_APP_API_URL}/api/category/`, { id, categoryName })
      .then(response => {
        if (response.status === 201) {
          setMessage({ status: true, color: "green", text: response.data.message })
          props.updateIdHandler({ id: '' })
          props.fetchCategories()
        }
      })
      .catch((error) => {
        if (error.response.status !== 201) {
          setMessage({ status: true, color: "red", text: error.response.data.message })
        }
      })
  }

  //Form submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.updateId.id) {
      updateCategory()
    } else {
      addCategory()
    }
  }

  //UseEffect
  useEffect(() => {

    //Getting data of selected id
    if (props.updateId.id) {
      setDataloading(true)
      axios.get(`${process.env.REACT_APP_API_URL}/api/category/${props.updateId.id}`)
        .then(response => {
          setCategoryName(response.data.data.categoryName.split('-').join(' '));
          setDataloading(false)
        })
        .catch(function (error) {
          console.log(error);
          setDataloading(false)
        })
    }
    //Cleanup useEffect
    return () => {
      setCategoryName("")
      setMessage({ status: false, color: "", text: "" })
    }
  }, [props.updateId.id])

  return (
    <Fragment>
      <h4 className="my-4">{props.updateId.id ? "Edit Category" : "Add Category"}</h4>
      {dataloading ? <p>Loading...</p>
        :
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              placeholder="Enter category name here..."
              onChange={onChange}
            />
            {message.status && <div><span style={{ color: message.color }}>{message.text ? message.text : "Invalid data"}</span></div>}
          </Form.Group>
          <Button variant="primary" className="mt-1" type="submit">
            Submit
          </Button>
          {
            props.updateId.id && <Button onClick={() => {
              props.updateIdHandler({ id: '' })
            }}
              variant="danger"
              className="mt-1"
              type="submit">
              cancel
            </Button>
          }
        </Form>
      }
    </Fragment>
  );
};


export default AddAndUpdateCategoryForm;
