import { Fragment, useEffect, useState } from "react";
import axios from 'axios';

import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import AddAndUpdateCategoryForm from "./AddAndUpdateCategoryForm";

const Categories = () => {

  //States
  const [categoriesData, setcategoriesData] = useState({ categories: [] });
  const [updateId, setupdateId] = useState({ id: '' });
  const [isloading, setloading] = useState(true)

  //Getting all categories
  const fetchCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/category`)
      .then(response => {
        if (response.success !== false) {
          setcategoriesData({ categories: response.data.data })
        }
        setloading(false)
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
      })
  }

  // Date formatter
  const formatDate = (date) => {
    date = new Date(date)
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return `${currentDate} ${monthName} ${date.getFullYear()}`;
  }

  // Delete category
  const deleteCategory = (categoryId) => {

    axios.delete(`${process.env.REACT_APP_API_URL}/api/category/${categoryId}`)
      .then(response => {
        setcategoriesData({
          categories: categoriesData.categories.filter(el => el._id !== categoryId)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // update Id State
  const updateIdHandler = (value) => {
    setupdateId(value);
  }

  // const categoriesDataHandler = (value) => {
  //   setcategoriesData({categories: [...categoriesData.categories, value]});
  // }

  useEffect(() => {

    let mounted = true;
    if (mounted) {
      fetchCategories();
    }
    return () => {
      mounted = false;
      setupdateId({ id: '' })
    }

  }, []);

  return (
    <Fragment>
      <div className="row">
        <h4>Softwares Categories</h4>
        <div className="admin_software_categories my-2">
          {isloading ?
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>

            :
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.categories.map((category, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{category.categoryName}</td>
                    <td>{formatDate(category.createdAt)}</td>
                    <td width="100px">
                      <div className="d-flex">
                        <Button onClick={() => deleteCategory(category._id)} variant="danger" className="mx-2">
                          <AiFillDelete />
                        </Button>
                        <Button onClick={() => {
                          setupdateId({ id: category._id })
                        }
                        } variant="secondary" className="mx-2">
                          <FaEdit />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        </div>
      </div>
      <div className="row">
        <AddAndUpdateCategoryForm
          updateId={updateId}
          // categoriesDataHandler={categoriesDataHandler}
          updateIdHandler={updateIdHandler}
          fetchCategories={fetchCategories}
          data={categoriesData}
        />
      </div>
    </Fragment>
  );
};

export default Categories;
