import { Link } from "react-router-dom";
import { ImArrowRight } from "react-icons/im";
import DownloadListItem from "../download/DownloadListItem";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";
import { useEffect , useState} from "react";
import axios from 'axios';


const DownloadList = ({ location }) => {

  
  const [softwares, setSoftwares] = useState([])
  const [isloading, setLoading] = useState(true);
  const  url = location.pathname.split("/")[2];
  
  useEffect(()=>{
    const cancelTokenSource = axios.CancelToken.source();
    

      axios.get(`http://localhost:5000/api/${url}`, { cancelToken: cancelTokenSource.token })
      .then(response => {
        // console.log(response);  
        setSoftwares(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })   
    
    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
    
  },[url])
  
  const categories = {
    browsers: ["chrome", "firefox", "safari", "edge"],
    mediaPlayers: ["vlc", "k-lite codec", "windows media player", "mx player"],
    downloaders: [
      "internet download manager",
      "downloader",
      "freedownloader",
      "paiddownloader",
    ],
    extensions: ["save from net", "momentum", "metalmonkey"],
    drivers: ["audio", "video", "usb", "ethernet"],
  };
 
  return (
    <div className="container">
      <Navbar />
      <div className="download_list">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-3">
            {/* <div className="row mb-5">
              <div className="col-12">
                <div className="download_category">
                  <h5>Web Browsers</h5>
                  <ul>
                    {categories.browsers.map((category,key) => (
                      <li key={key}>
                        <ImArrowRight />
                        <Link to={`/download/${category}`}>{category}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="row mb-5 left-right-add">
              <div className="col-12">
                <div className="addvertisement">
                  <h4 className="bg-secondary text-light text-center">Advertise</h4>
                  <img src="/addy.PNG" alt="" className="img-fluid w-100" />
                </div>
              </div>
            </div>
            <div className="row left-right-add">
              <div className="col-8 mx-auto">
                <div className="left_add_box">120 x 120</div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="category_downloads">
              <h5 className="category_downloads_title">
                {url.trim().split("-").join(" ").toUpperCase()}
              </h5>
               {isloading ?
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="d-flex justify-content-center">
                                  <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                      : softwares.map((item, key) => (
                        <DownloadListItem key={key} version={item} />
                      ))
              } 
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="add_bottom">
              <img src="/add2.PNG" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DownloadList;
