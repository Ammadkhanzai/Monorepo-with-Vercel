import { Link  } from "react-router-dom";
const DownloadListItem = ({ version }) => {
  return (
    <div className="category_downloads_item">
      <img src={`http://localhost:5000/uploads/${version.softwareID.softwareIcon}`} alt="icon" />
      <div>
      
          <h5> 
              <Link to={ { pathname: `/download/${version.softwareID.softwareName.trim().split(" ").join("-").toLowerCase()}/${version.softwareID._id}`}} >
                {version.softwareID.softwareName} {version.softwareID.softwareVersion}  
              </Link> 
          </h5>
      
        <small>{version.softwareID.softwareAuthor}</small>
        <p>{version.softwareID.softwareDescription.slice(0, 250)+'...'}</p>
      </div>
    </div>
  );
};
export default DownloadListItem;
