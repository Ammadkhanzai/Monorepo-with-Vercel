
const DownloadTechnical = ({ software }) => {

  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    return `${currentMonth}/${currentDate}/${date.getFullYear()}`;
  }
  
  return (
    <div className='download_technical download_details'>
      <h5 className='mb-4'>Technical</h5>
      <table>
        <tbody>
          <tr>
            <th>Title:</th>
            <td>{software.softwareName}</td>
          </tr>
          <tr>
            <th>Requirements:</th>
            <td>{software.softwareRequirement}</td>
          </tr>
          <tr>
            <th>Language:</th>
            <td>{software.softwareLanguage}</td>
          </tr>
          <tr>
            <th>Available languages:</th>
            <td>
            {software.softwareAvailableLanguage}
            </td>
          </tr>
          <tr>
            <th>License:</th>
            <td>{software.softwareLicense}</td>
          </tr>
          <tr>
            <th>Date added:</th>
            <td>{formatDate(software.createdAt)}</td>
          </tr>
          <tr>
            <th>Author:</th>
            <td>
            {software.softwareAuthor}
            </td>
          </tr>
          <tr>
            <th>SHA-1:</th>
            <td> {software.softwareSHA}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DownloadTechnical;
