import { Fragment, useEffect, useState } from "react";
import { Link , useParams} from "react-router-dom";
import DownloadDetails from "./DownloadDetails";
import DownloadScreenshots from "./DownloadScreenshots";
import DownloadShare from "./DownloadShare";
import DownloadTechnical from "./DownloadTechnical";
import DownloadReview from "./DownloadReview"; 
import axios from 'axios';

const DownloadContent = () => {

  const [isloading, setLoading] = useState(true);
  const [state, setState] = useState("description");
  const [software, setSoftware] = useState([]);
  const [category, setCategory] = useState([]);
  const [oldSoftware, setOldSoftware] = useState([]);

  const onTabChange = (tab) => {
    setState(tab);
  };
  
  const oldVersion = oldSoftware.map((item, key) => {
    if(  oldSoftware.length  > 1){
      if(key > 0 ){
        return (<li key={key}>
          <Link 
            to={{ pathname: item._id  }} 
            >  {item.softwareName} {item.softwareVersion}</Link>
        </li>)
      }
    }
  })

  const latestVersion = oldSoftware.map((item, key) => {
    if(  oldSoftware.length  > 0 ){
      if(key < 1 ){
        return (
          <Link key={key}
            to={{ pathname: item._id  }} 
            >  {item.softwareName} {item.softwareVersion}</Link>
        )
      }
    }
  })



  let {  id  } = useParams()
  
  useEffect(()=>{

    const cancelTokenSource = axios.CancelToken.source()
    axios.get('http://localhost:5000/api/software-management/fetch',{ params :{ id : id }}, { cancelToken: cancelTokenSource.token })
      .then(response => {
        setSoftware(response.data.data)
        setCategory(response.data.data.softwareCategory)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
      

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }
  },[id])


  useEffect(()=>{

    const cancelTokenSource = axios.CancelToken.source()
    
    axios.get(`http://localhost:5000/api/software-management/fetch/${software.softwareName}`, { cancelToken: cancelTokenSource.token })
      .then(response => {
        // console.log(response)
        setOldSoftware(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
      

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }
  },[software])

    if(isloading) {
      return (<div className="col-xl-12 col-lg-12 col-md-12">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>)
    }
  return (
    <Fragment>
    
      <div className="row mb-4">
        <div className="download_title">
          
          <img src={`http://localhost:5000/uploads/${software.softwareIcon}`} alt="" />
          <div className="download_title_desc">
            <h5>{software.softwareName}  </h5>
            <p>
              <strong>Version:</strong> {software.softwareVersion}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 col-md-12">
          <div className="download_content">
            <div className="download_menu">
              <ul>
                <li
                  className={state === "description" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("description");
                  }}
                >
                  Description
                </li>
                <li
                  className={state === "screenshots" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("screenshots");
                  }}
                >
                  Screenshots
                </li>
                <li
                  className={state === "technical" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("technical");
                  }}
                >
                  Technical
                </li>
                {/* <li
                  className={state === "changelog" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("changelog");
                  }}
                >
                  Changelog
                </li> */}
                <li
                  className={state === "reviews" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("reviews");
                  }}
                >
                  User Reviews
                </li>
                <li
                  className={state === "share" ? "download_active" : ""}
                  onClick={() => {
                    onTabChange("share");
                  }}
                >
                  Share
                </li>
              </ul>
            </div>
            {(() => {
              // eslint-disable-next-line
              switch (state) {
                case "description":
                  return <DownloadDetails software={ software } category={category} />;
                case "screenshots":
                  return <DownloadScreenshots software={ software }  />;
                case "technical":
                  return <DownloadTechnical software={ software } />;
                // case "changelog":
                //   return <DownloadDetails software={ software } category={category}  />;
                case "reviews":
                  return <DownloadReview software={ software }  />;
                case "share":
                  return <DownloadShare />;
              }
            })()}
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="download_versions">
            <Link to="/download/wait/chrome" className="download_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z" />
              </svg>
              <h4>Download</h4>
            </Link>
            <div className="download_latest_version">
              <p className="m-0">
                <strong>Latest Version</strong>
              </p>
             
              {/* <Link to={{ pathname: software._id  }} >{software.softwareName}  {software.softwareVersion}</Link> */}

              {latestVersion}

            </div>
            <div className="download_versions_list">
              
              <h5>Old Versions</h5>
              <ul>
                {/* {oldSoftware.map((item, key)=>(

                    <li key={key}>
                      <Link 
                        to={{ pathname: item._id  }} 
                        >  {item.softwareName} {item.softwareVersion}</Link>
                    </li>
                ))} */}
                {oldVersion}
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DownloadContent;
