import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Searchbar = () => {

  const [search , setSearch] = useState(null);  
  const [data , setData] = useState([]);  

  const onChange = (e) => {
    setSearch({...search , [e.target.name] : e.target.value })
    // console.log(search);  
  };

  useEffect(()=>{
    setData([])
    const cancelTokenSource = axios.CancelToken.source()
    if(search === null || search.search === "" || search.search === " " ) return;
    axios.get(`http://localhost:5000/api/software-management/search/${search.search}`, { cancelToken: cancelTokenSource.token })
      .then(response => {
        console.log(response)
        setData(response.data.data)
        
      })
      .catch((error) => {
        console.log(error)
        // setLoading(false
      })
      

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }
  },[search])
  

  return (
    <div className="searchBar">
      <div className="form-group">
        <input type="text" className="searchBox" placeholder="Search..." onChange={onChange} name="search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="searchIcon"
        >
          <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
        </svg>
        { (data.length >= 1)?
        <div className="searchResult">
          <ul >
            {data.map((item,key)=>(
              <li key={key}>  
              
              <Link to={{ pathname: '/download/'+item.softwareName.trim().split(" ").join("-").toLowerCase()+'/'+item._id  }} >{item.softwareName} {item.softwareVersion}</Link>
              </li>
            ))}
          </ul>
        </div>
        : ""}
      </div>

    </div>
  );
};

export default Searchbar;
