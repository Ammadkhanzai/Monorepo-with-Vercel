import { useEffect, useState } from "react";
import axios from 'axios';
import Footer from "../layout/footer/Footer";
import Navbar from "../layout/navbar/Navbar";

const About = () => {

  const [info, setInfo] = useState([])

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source()
    axios.get('/api/info-page', { cancelToken: cancelTokenSource.token })
      .then(response => {

        setInfo(response.data.data[0])


      })
      .catch((error) => {
        console.log(error)
      })


    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [])

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source()
    axios.post('/api/sendmail', { cancelToken: cancelTokenSource.token })
      .then(response => {

        console.log(response)


      })
      .catch((error) => {
        console.log(error)
      })


    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [])



  return (
    <div className="container">
      <Navbar />
      <div className="about_us">
        <div className="row">
          <div className="col-12">
            <h2>{info.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="about_us_content">
              {info.content}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;
