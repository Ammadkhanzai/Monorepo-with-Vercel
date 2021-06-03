import { useEffect, useState } from "react";
import Footer from "../layout/footer/Footer";
import Navbar from "../layout/navbar/Navbar";
import LatestSofts from "../software/LatestSofts";
import Softwares from "../software/Softwares";
import axios from 'axios';

const Home = () => {
  const softwareBoxTitles = [
    "Latest Softwares",
    "Popular Updates"
  ];
  const softwareLink = [
    "/softwares/latest-software/",
    "/softwares/popular-software/"
  ];
  const search = [
    "latest-software",
    "popular-software"
  ];


  const [categories, setCategories] = useState([])
  const [softwares, setSoftwares] = useState([])
  const [popularSoftwares, setPopularSoftwares] = useState([])
  const [latestSoftwares, setLatestSoftwares] = useState([])


  const [isloading, setLoading] = useState(true);

  const softwareCategories = softwares.map((category, key) => (

    <div key={key} className="col-xl-4 col-lg-6 col-md-12 mb-md-2">
      <Softwares
        title_yellow={false}
        title={category.title}
        data={category.softwares}
        link={'/softwares/' + category.title}
      />
    </div>
  ))


  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    axios.get('/api/category', { cancelToken: cancelTokenSource.token })
      .then(response => {
        // console.log(response.data.data)
        if (response.data.success) setCategories(response.data.data)
        setLoading(false)

      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })


    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    const fetchSoftware = async (id, title) => {
      await axios.get(`/api/software-management/${id}/${5}`, { cancelToken: cancelTokenSource.token })
        .then(response => {
          // console.log(response);  
          if (response.data.data.length) {
            setSoftwares(softwares => ([...softwares, { softwares: response.data.data, categoryID: id, title: title }]))
          }
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })

      return true;
    }

    async function watingRequest() {
      let nodes = Object.keys(categories)
      for (let i = 0; i < nodes.length; i++) {

        const id = Object.values(categories[i])[0]
        const title = Object.values(categories[i])[1]
        await fetchSoftware(id, title)
        // console.log(id,title);   
      }
    }
    watingRequest()

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [categories])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    axios.get(`/api/popular-software/5`, { cancelToken: cancelTokenSource.token })
      .then(response => {
        // console.log(response);  
        setPopularSoftwares(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })


    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    axios.get(`/api/latest-software/5`, { cancelToken: cancelTokenSource.token })
      .then(response => {
        // console.log(response);  
        setLatestSoftwares(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })

    return () => {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }

  }, [])

  return (
    <div className="container">
      <Navbar />
      <section id="home_page">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-8">
            <div className="softwares_main">
              <div className="latest_softwares">
                {
                  isloading ?
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-12">

                        <LatestSofts data={latestSoftwares} title={softwareBoxTitles[0]} link={softwareLink[0]} searchby={search[0]} />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-12">
                        <LatestSofts data={popularSoftwares} title={softwareBoxTitles[1]} link={softwareLink[1]} searchby={search[1]} />
                      </div>
                    </div>
                }
              </div>
              <div className="softwares">
                <div className="row">
                  {
                    isloading ?
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                          </div>
                        </div>
                      </div>
                      :
                      softwareCategories
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="add_bottom">
                  <img src={process.env.PUBLIC_URL + "add2.PNG"} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* ADVERTISEMENT */}
          <div className="col-lg-2 col-md-4" id="add_right_home">
            <div className="row">
              <div className="col-12">
                <div className="addvertisement">
                  <h4 className="bg-secondary text-light text-center">
                    Advertise
                  </h4>
                  {/* <img
                    src={process.env.PUBLIC_URL + "add.PNG"}
                    alt=""
                    className="img-fluid w-100"
                  /> */}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="addvertisement_content">
                <div className="row">
                  <div className="col-12">
                    <div className="follow_us">
                      <h5>Follow us</h5>
                      <div className="follow_us_content">
                        <div className="follow_us_likes">
                          <p>2.2m</p>
                          <p>145k</p>
                          <p>2k</p>
                        </div>
                        <div className="follow_us_btns">
                          <button>Like</button>
                          <button>Follow</button>
                          <button>+1</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="sponser_ads">
                  <h5>Sponser Ads</h5>
                  <div className="sponser_ads_img">
                    <div className="sponser_ads_box">120x120 Ads</div>
                    <div className="sponser_ads_box">120x120 Ads</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Home;