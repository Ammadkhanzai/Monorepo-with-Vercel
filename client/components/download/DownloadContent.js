import { Fragment, useState } from "react";
import Link from 'next/link'

import DownloadDetails from "./DownloadDetails";
import DownloadScreenshots from "./DownloadScreenshots";
import DownloadShare from "./DownloadShare";
import DownloadTechnical from "./DownloadTechnical";
import DownloadReview from "./DownloadReview";
import { ImDownload } from "react-icons/im"
import { useRouter } from 'next/router'


const DownloadContent = ({ software, oldSoftware }) => {
  const router = useRouter()
  const [state, setState] = useState("description");
  const onTabChange = (tab) => {
    setState(tab);
  };

  const downloadBtnHandeler = (link) => {
    router.push(link)
  }

  const oldVersion = oldSoftware.response.map((item, key) => {

    if (oldSoftware.response.length > 1) {
      if (key > 0) {
        return (
          <li key={key}>
            <Link key={key} href={`/download/${item.softwareName.trim().split(" ").join("-").toLowerCase()}/${item._id}`} >
              <a>{item.softwareName} {item.softwareVersion} </a>
            </Link>
          </li>
        )
      }
    }
  })

  const latestVersion = oldSoftware.response.map((item, key) => {
    if (oldSoftware.response.length > 0) {
      if (key < 1) {
        return (
          <Link key={key} href={`/download/${item.softwareName.trim().split(" ").join("-").toLowerCase()}/${item._id}`} >
            <a>{item.softwareName} {item.softwareVersion}</a>
          </Link>
        )
      }
    }
  })



  return (
    <Fragment>

      <div className="row mb-4">
        <div className="download_title">
          <img src={`${process.env.REACT_APP_API_URL}/uploads/${software.response.softwareIcon}`} alt="" />
          <div className="download_title_desc">
            <h5>{software.response.softwareName}</h5>
            <p>
              <strong>Version:</strong> {software.response.softwareVersion}
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
                  return <DownloadDetails software={software.response} />;
                case "screenshots":
                  return <DownloadScreenshots software={software.response} />;
                case "technical":
                  return <DownloadTechnical software={software.response} />;
                case "reviews":
                  return <DownloadReview software={software.response} />;
                case "share":
                  return <DownloadShare />;
              }
            })()}
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="download_versions">
            <div className="download_btn">
              <button onClick={() => downloadBtnHandeler(software.response.softwareLink)} >
                <h5><ImDownload /> Download</h5>
              </button>
            </div>

            <div className="download_latest_version">
              <p className="m-0">
                <strong>Latest Version</strong>
              </p>
              {latestVersion}
            </div>
            <div className="download_versions_list">
              <h5>Old Versions</h5>
              <ul>
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
