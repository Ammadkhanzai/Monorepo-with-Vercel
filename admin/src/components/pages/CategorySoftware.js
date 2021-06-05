import { Link , useParams   } from "react-router-dom";
import { ImArrowRight } from "react-icons/im";
// import DownloadListItem from "../download/DownloadListItem";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";
import { useEffect , useState} from "react";
import axios from 'axios';


const DownloadList = ({ location }) => {
  // CATEGORIES
//   console.log("---------------------")
//   console.log(location.state)
  
  // const location = useLocation()
  // const { fromNotifications } = location.state
  // console.log(location.state)   

  
  const {category} = useParams();
  
  const [softwares, setSoftwares] = useState([])
  const [categoryID, setCategoryID] = useState(false)
  const [isloading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const categorySoftwares  = softwares.map((item, key) => (
    
    <div className="category_downloads_item" key={key}>
        <img src={`http://localhost:5000/uploads/${item.icon}`} alt="icon" />
        <div>
        <h5> <Link to={ { pathname: `/download/${item.name.trim().split(" ").join("-").toLowerCase()}/${item.key}`}}  >{item.name} {item.version} </Link></h5>
        <small>{item.author}</small>
        <p>{item.desc.slice(0, 250)+'...'}</p>
        </div>
    </div>
    
  ))

  useEffect(()=>{
    const cancelTokenSource = axios.CancelToken.source();

    axios.get(`http://localhost:5000/api/category/single/${category}/`, { cancelToken: cancelTokenSource.token })
    .then(response => {
        // console.log(response);
        setCategoryID(response.data.data[0]._id);
        setLoading(false)
    })
    .catch((error) => {
    //   console.log(error);
      setLoading(false)
      setIsError(true);
    })
    
    return () => {
        cancelTokenSource.cancel('Operation canceled by the user.');
    }
  },[category])
  

  useEffect(()=>{
    const cancelTokenSource = axios.CancelToken.source();
    if(categoryID !== false){
        axios.get(`http://localhost:5000/api/software-management/${categoryID}/`, { cancelToken: cancelTokenSource.token })
        .then(response => {
          // console.log(response);  
          setSoftwares(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        })  
    }
      
    
    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
    
  },[categoryID])

//   console.log(softwares);
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

  if(isError === true) return (<div>Result Not Found!</div>)
 
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
                {category.trim().split("-").join(" ").toUpperCase()}
              </h5>

              { isloading ?
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="d-flex justify-content-center">
                                  <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                      : categorySoftwares}
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
