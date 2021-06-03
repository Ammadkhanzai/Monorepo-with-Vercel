import { Link } from "react-router-dom";

const LatestSofts = ({ data , title ,link  }) => {
  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}-${currentDate}-${date.getFullYear()}`;
  }


  return (
    <div className="latest_box mb-md-4 mb-sm-4">
      <div className="latest_title">
        <h5>{title}</h5>
        <div className="latest-content">
          <ul>
            
            { data.map((index, key) => (
           
              <li key={key}>
                <img
                  src={`/uploads/${index.softwareID.softwareIcon}`}
                  alt=""
                  className="img-fluid"
                />
                <Link to={{ pathname: 'download/'+index.softwareID.softwareName.trim().split(" ").join("-").toLowerCase()+'/'+index.softwareID._id  }}  > {index.softwareID.softwareName} {index.softwareID.softwareVersion}</Link>{" "}
                <span>- {formatDate(index.softwareID.createdAt)}</span>
              </li>
          ))}
          </ul>
          <Link to={{ pathname:link }}  className="latest-view-btn">
            View all
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LatestSofts;
