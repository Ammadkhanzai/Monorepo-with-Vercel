const DownloadDetails = ({ software }) => {
  
 
  return (
    <div className='download_details'>
      <h5>Publisher's description</h5>
      <p>
        {software.softwareDescription}
      </p>
      <p className='m-0'>
        <strong>Category: </strong>{ 
          software.softwareCategory.categoryName.trim()
                                                .toLowerCase()
                                                .split('-')
                                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                                .join(' ')
        }
      </p>
      <p>
        <strong>Author: </strong>{software.softwareAuthor}
      </p>
    </div>
  );
};
export default DownloadDetails;
