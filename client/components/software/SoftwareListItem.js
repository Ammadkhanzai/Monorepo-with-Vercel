import Link from 'next/link'
const SoftwareListItem = ({ version }) => {
  return (
    <div className="category_downloads_item">
      <img src={`http://localhost:5000/uploads/${version.softwareID.softwareIcon}`} alt="icon" />
      <div>
      
          <h5> 
              <Link href={`/download/${version.softwareID.softwareName.trim().split(" ").join("-").toLowerCase()}/${version.softwareID._id}` }  >
                <a>{version.softwareID.softwareName} {version.softwareID.softwareVersion} </a>
              </Link> 
          </h5>
      
        <small>{version.softwareID.softwareAuthor}</small>
        <p>{version.softwareID.softwareDescription.slice(0, 250)+'...'}</p>
      </div>
    </div>
  );
};
export default SoftwareListItem;
