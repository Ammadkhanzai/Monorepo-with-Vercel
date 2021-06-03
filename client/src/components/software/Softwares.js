import { Link } from "react-router-dom";

const Softwares = ({ title_yellow ,title , data , link }) => {

  return (
    <div className="softwareBox mb-sm-4">
      <h5
        className={title_yellow ? "software_title bg_yellow" : "software_title"}
      >
        {title}
      </h5>
      <ul>
          { data.map((index, key) => (
              <li key={key}>
                <Link  to={{ pathname: 'download/'+index.name.trim().split(" ").join("-").toLowerCase()+'/'+index.key  }} >{  
                index.name.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')+' '+index.version}</Link>
              </li>
          ))}
       
      </ul>
      <div className="card-footer">
        <p>Top 10 softwares. </p> <Link to={{ pathname:link }}  >View all</Link>
      </div>
    </div>
  );
};
export default Softwares;
