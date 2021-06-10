import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter, total]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">

        <li className="page-item">
          <button className="page-link" onClick={() => onButtonClick("prev")}>
            Previous
      </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => onButtonClick("next")}>
            Next
      </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
