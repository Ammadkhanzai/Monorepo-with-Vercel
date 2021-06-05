const DownloadScreenshots = ({software}) => {

  return (
    <div className='download_details'>
      <h5 className='mb-4'>Screenshots</h5>
      <div className='download_screenshots'>
        <div className='row mb-md-4'>

          {Object.keys(software.softwareScreenshot).map(( v , index)=>(
            <div className='col-4' key={index}>
              <img src={`http://localhost:5000/uploads/${software.softwareScreenshot[v]}`} alt="" />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};
export default DownloadScreenshots;
