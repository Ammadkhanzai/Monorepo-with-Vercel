const DownloadDetails = ({ software , category}) => {
 
  return (
    <div className='download_details'>
      <h5>Publisher's description</h5>
      <p>
        {software.softwareDescription}
      </p>
      <p className='m-0'>
        <strong>Category: </strong>{ category.categoryName }
      </p>
      <p>
        <strong>Author: </strong>{software.softwareAuthor}
      </p>
    </div>
  );
};
export default DownloadDetails;
