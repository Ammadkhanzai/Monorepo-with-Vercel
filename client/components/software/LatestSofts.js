import Link from 'next/link'

const LatestSofts = ({ data , title , link  }) => {
  // console.log(data)
  function formatDate(date) {
    date = new Date(date);
    // const currentMonth = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const currentDate = date.getDate();
    return `- ${currentDate} ${monthName} ${date.getFullYear()}`;
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
                  src={`${process.env.REACT_APP_API_URL}/uploads/${index.softwareID.softwareIcon}`}
                  alt=""
                  className="img-fluid"
                />
                <Link  href={`/download/[title]/[id]`} as={`/download/${index.softwareID.softwareName.trim().split(" ").join("-").toLowerCase()}/${index.softwareID._id}`}  > 
                <a>{index.softwareID.softwareName} {index.softwareID.softwareVersion}</a>
                </Link>
                <span>{ (title == "Latest Software Updates")? formatDate(index.softwareID.createdAt): ''}</span>
              </li>
          ))}
          </ul>
          <Link href="/software/[category]" as={`/software/${link}`}  className="latest-view-btn">
            <a>View all</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LatestSofts;
