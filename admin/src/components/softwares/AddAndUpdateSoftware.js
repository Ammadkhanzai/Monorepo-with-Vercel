import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
// import { categoriesData } from "./CategoriesData";

const AddAndUpdateSoftware = () => {
  // eslint-disable-next-line
  const [formState, setFormState] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [customFiles, setCustomFiles] = useState({});
  const [categories, setCategories] = useState({ categories: [] });
  const [softwareInputs, setSoftwareInputs] = useState({
    name: "",
    versions: "",
    category: "",
    description: "",
    requirements: "",
    language: "",
    availableLanguages: "",
    license: "",
    author: "",
    sha: "",
    software_url: ""
  });
  let { id } = useParams();

  const formHandlerUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData();
    if (customFiles && customFiles["screenshots"] != null) {
      for (const key of Object.keys(customFiles["screenshots"])) {
        formData.append("screenshots", customFiles["screenshots"][key]);
      }
    }
    if (customFiles && customFiles["icon"] != null) {
      formData.append("icon", customFiles["icon"][0]);
    }
    formData.append("id", id);
    formData.append("softwareName", softwareInputs.name);
    formData.append("softwareVersion", softwareInputs.versions);
    formData.append("softwareCategory", softwareInputs.category);
    formData.append("softwareDescription", softwareInputs.description);
    formData.append("softwareRequirement", softwareInputs.requirements);
    formData.append("softwareLanguage", softwareInputs.language);
    formData.append("softwareAvailableLanguage", softwareInputs.availableLanguages);
    formData.append("softwareLicense", softwareInputs.license);
    formData.append("softwareAuthor", softwareInputs.author);
    formData.append("softwareSHA", softwareInputs.sha);
    formData.append("software_url", softwareInputs.software_url);

    axios.put(`${process.env.REACT_APP_API_URL}/api/software-management/`, formData)
      .then((response) => {
        if (response.data.success) {
          setMessage("Data successfully inserted into database.");
          setCustomFiles(null);
          document.getElementById("fileicon").value = null;
          document.getElementById("filescreenshots").value = null;
          window.scrollTo(0, 0);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setErrorMessage("Invalid file type");
          setCustomFiles(null);
          document.getElementById("fileicon").value = null;
          document.getElementById("filescreenshots").value = null;
          setIsLoading(false);
        } else {
          setErrorMessage("Invalid data");
          setCustomFiles(null);
          document.getElementById("fileicon").value = null;
          document.getElementById("filescreenshots").value = null;
          window.scrollTo(0, 0);
          setIsLoading(false);
        }
      });

  }
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    for (const key of Object.keys(customFiles["screenshots"])) {
      formData.append("screenshots", customFiles["screenshots"][key]);
    }
    formData.append("icon", customFiles["icon"][0]);
    formData.append("softwareName", softwareInputs.name);
    formData.append("softwareVersion", softwareInputs.versions);
    formData.append("softwareCategory", softwareInputs.category);
    formData.append("softwareDescription", softwareInputs.description);
    formData.append("softwareRequirement", softwareInputs.requirements);
    formData.append("softwareLanguage", softwareInputs.language);
    formData.append(
      "softwareAvailableLanguage",
      softwareInputs.availableLanguages
    );
    formData.append("softwareLicense", softwareInputs.license);
    formData.append("softwareAuthor", softwareInputs.author);
    formData.append("softwareSHA", softwareInputs.sha);
    formData.append("software_url", softwareInputs.software_url);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/software-management/`, formData)
      .then((response) => {
        if (response.data.success) {
          setMessage("Data successfully submitted into database.");
          setSoftwareInputs({
            name: "",
            versions: "",
            category: "",
            description: "",
            requirements: "",
            language: "",
            availableLanguages: "",
            license: "",
            author: "",
            sha: "",
            software_url: ""
          });
          setCustomFiles(null);
          document.getElementById("fileicon").value = null;
          document.getElementById("filescreenshots").value = null;
          window.scrollTo(0, 0);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setErrorMessage("Invalid file type");
          setCustomFiles(null);
          document.getElementById("fileicon").value = null;
          document.getElementById("filescreenshots").value = null;
          setIsLoading(false);

        } else {
          setErrorMessage("Invalid data");
          // setCustomFiles(null);
          // document.getElementById("fileicon").value = null;
          // document.getElementById("filescreenshots").value = null;
          setIsLoading(false);
        }
      });
  };

  const onFileChange = (e) => {
    setCustomFiles({ ...customFiles, [e.target.name]: e.target.files });
  };
  const onChange = (e) => {
    setSoftwareInputs({ ...softwareInputs, [e.target.name]: e.target.value });

  };

  useEffect(() => {
    if (id) {
      setFormState("edit");
      const cancelTokenSource = axios.CancelToken.source();
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/software-management/fetch/`,
        { params: { id: id } },
        { cancelToken: cancelTokenSource.token }
      )
        .then((response) => {
          if (response.data.success) {
            setSoftwareInputs({
              name: response.data.data.softwareName,
              versions: response.data.data.softwareVersion,
              category: (response.data.data.softwareCategory == null) ? "" : response.data.data.softwareCategory._id,
              description: response.data.data.softwareDescription,
              requirements: response.data.data.softwareRequirement,
              language: response.data.data.softwareLanguage,
              availableLanguages: response.data.data.softwareAvailableLanguage,
              license: response.data.data.softwareLicense,
              author: response.data.data.softwareAuthor,
              sha: response.data.data.softwareSHA,
              software_url: response.data.data.softwareLink
            });
            setUpdateLoading(false)
            document.getElementById('fileicon').removeAttribute("required");
            document.getElementById('filescreenshots').removeAttribute("required");
          }

        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            console.log("Request canceled", e.message);
          } else {
            console.log(e.message);
          }
          setUpdateLoading(false)
        });
      return () => {
        cancelTokenSource.cancel("Operation canceled by the user.");
        setErrorMessage(null)
      }
    }
  }, [id]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios.get(`${process.env.REACT_APP_API_URL}/api/category/`, {
      cancelToken: cancelTokenSource.token,
    })
      .then((response) => {
        if (response.data.success) {
          setCategories({ categories: response.data.data });
        }
        setUpdateLoading(false)
        
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Request canceled", e.message);
        } else {
          console.log(e);
        }
      });
    return () => cancelTokenSource.cancel("Operation canceled by the user.");
  }, []);

  return (
    <Fragment>
      <h3>{formState === "add" ? "Add New Software" : "Update Software"}</h3>
      {
        updateLoading ?
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
          :
          <Form onSubmit={formState === "add" ? formHandler : formHandlerUpdate}>
            <Row className="my-2">
              <Col>
                <span style={{ color: "green" }}>{message}</span>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Label>Software Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter software name here..."
                  name="name"
                  value={softwareInputs.name}
                  required
                  onChange={onChange}
                />
              </Col>
              <Col>
                <Form.Label>Software Version</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter software version here..."
                  name="versions"
                  value={softwareInputs.versions}
                  required
                  onChange={onChange}
                />
              </Col>
            </Row>

            <Row className="my-2">
              <Col>
                <Form.Label>Software Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={softwareInputs.category}
                  required
                  onChange={onChange}
                >
                  <option value="">Select software category</option>

                  {categories.categories.map((category, key) => (
                    <option value={category._id} key={key}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Label>Software Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter software description here..."
                  minLength="128"
                  name="description"
                  value={softwareInputs.description}
                  required
                  onChange={onChange}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Group>
                  <Form.Label>Software Icon</Form.Label>
                  <Form.File
                    id="fileicon"
                    name="icon"
                    required
                    onChange={onFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <h4 className="mb-4">Technical Info</h4>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  <strong>Requirements: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="eg. Windows 10, Windows 8, Windows 7"
                    name="requirements"
                    value={softwareInputs.requirements}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>Language: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Language here..."
                    name="language"
                    value={softwareInputs.language}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>Available languages: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="eg. English, Russian, Perisan, Arabic"
                    name="availableLanguages"
                    value={softwareInputs.availableLanguages}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>License: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter software license here..."
                    name="license"
                    value={softwareInputs.license}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>Author: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter software author here..."
                    name="author"
                    value={softwareInputs.author}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>SHA-1:</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter SHA-1 here..."
                    name="sha"
                    value={softwareInputs.sha}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  <strong>Screenshots:</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.File
                    id="filescreenshots"
                    name="screenshots"
                    required
                    multiple
                    onChange={onFileChange}
                  />
                </Col>
              </Form.Group>
            </Row>

            <Row className="my-2">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  <strong>Download Url: *</strong>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="url"
                    placeholder="Enter software download link here"
                    name="software_url"
                    value={softwareInputs.software_url}
                    required
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Row>
            {errorMessage && <div><span style={{ color: "red" }}>{errorMessage}</span></div>}
            {isLoading ? (
              "Submitting........"
            ) : (
              <Button variant="primary" className="btn-block" type="submit">
                {formState === "add" ? "Add Software" : "Update Software"}
              </Button>
            )}
          </Form>
      }
    </Fragment>
  );
};

export default AddAndUpdateSoftware;
