const DownloadListItem = ({ version }) => {
  return (
    <div className="category_downloads_item">
      <img src={`/uploads/${version.softwareID.softwareIcon}`} alt="icon" />
      <div>
        <h5>{version.softwareID.softwareName} {version.softwareID.softwareVersion}</h5>
        <small>{version.softwareID.softwareAuthor}</small>
        <p>{version.softwareID.softwareDescription.slice(0, 250)+'...'}</p>
      </div>
    </div>
  );
};
export default DownloadListItem;
