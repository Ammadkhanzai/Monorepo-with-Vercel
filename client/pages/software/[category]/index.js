import { useRouter } from 'next/router'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

import SoftwareListItem from "../../../components/software/SoftwareListItem"
import CategorySoftwareListItem from "../../../components/software/CategorySoftwareListItem"

import axios from 'axios';

export default function byCategory({ softwares, flag, count, categoryID }) {

  const [posts, setPosts] = useState(softwares.response);
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = async () => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/${categoryID}/${posts.length}`)
      .then(response => {
        return { code: 200, response: response.data.data }
      })
      .catch((error) => {
        console.log(error);
        return { code: 404, response: error }
      })

    if (res.code == 200) {
      setPosts((posts) => [...posts, ...res.response]);

    }
  };

  useEffect(() => {
    setHasMore(count.response > posts.length ? true : false);
  }, [posts]);



  const router = useRouter()
  const { category } = router.query

  return (

    <div className="download_list">
      <div className="row mb-5">
        <div className="col-lg-3 col-md-3">
          <div className="row mb-5 left-right-add">
            <div className="col-12">
              <div className="addvertisement">
                <h4 className="bg-secondary text-light text-center">Advertise</h4>
                <img src="/addy.PNG" alt="" className="img-fluid w-100" />
              </div>
            </div>
          </div>
          <div className="row left-right-add">
            <div className="col-8 mx-auto">
              <div className="left_add_box">120 x 120</div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9">
          <div className="category_downloads">
            <h5 className="category_downloads_title">
              {category.trim().split("-").join(" ").toUpperCase()}
            </h5>
            {
              (flag === false) ?
                softwares.response.map((item, key) => (
                  <SoftwareListItem key={key} version={item} />
                ))
                :
                <InfiniteScroll
                  dataLength={posts.length}
                  next={getMorePosts}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {posts.map((item, key) => (
                    <CategorySoftwareListItem key={key} item={item} />
                  ))}
                </InfiniteScroll>

            }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="add_bottom">
            <img src="/add2.PNG" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const category = context.params.category
  let softwares;
  let flag;
  let count = null;
  let categoryID = null

  // console.log(context);

  const software = async () => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/api/${context.params.category}`)
      .then(response => {
        flag = false;
        return { code: 200, response: response.data.data }
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response
  }

  const softwareByCategory = async () => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/api/category/single/${context.params.category}`)
      .then(response => {
        categoryID = response.data.data[0]._id;
        return axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/${response.data.data[0]._id}/3/`)
          .then(response => {
            flag = true;
            return { code: 200, response: response.data.data }
          })
          .catch((error) => {
            return { code: 404, response: error }
          })
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response
  }

  const softwareCount = async () => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/count/${categoryID}`)
      .then(response => {
        return { code: 200, response: response.data.data }
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response
  }

  if (category === 'latest-software' || category === 'popular-software') {
    softwares = await software()
  } else {
    softwares = await softwareByCategory()
    
  }

  // let categoryID = response.data.data[0]._id;

  if (softwares.code === 200) {
    count = await softwareCount()
    return {
      props: { softwares, flag, count, categoryID },
    }
  } else {
    return {
      notFound: true,
    }
  }
}