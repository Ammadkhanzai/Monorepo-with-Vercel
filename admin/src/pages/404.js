import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="error-template">
        <h1>
          Oops!</h1>
        <h2>
        401 Not Found</h2>
        <div className="error-details">
          Sorry, an error has occured, Requested page not found!
                </div>
        <div className="error-actions">
          <Link to={"/admin/dashboard"} className="btn btn-primary btn-lg">Back to home <AiFillHome /></Link>
        </div>
      </div>
    </div>
  </div >


);

export default NotFound;