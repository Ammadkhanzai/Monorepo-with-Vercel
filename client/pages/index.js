import Head from 'next/head'
import LatestSofts from "../components/software/LatestSofts";
import Softwares from "../components/software/Softwares";
import axios from 'axios';

export default function Home({ categories, softwares, popularSoftwares, latestSoftwares }) {

  const softwareBoxTitles = [
    "Latest Software Updates",
    "Most Popular Downloads"
  ];
  const softwareLink = [
    "latest-software",
    "popular-software"
  ];


  const softwareCategories = softwares.response.map((category, key) => (
    <div key={key} className="col-xl-4 col-lg-6 col-md-12 mb-md-2">
      <Softwares
        title_yellow={false}
        title={category.title}
        data={category.softwares}
        link={category.title}
      />
    </div>
  ))

  return (

    <div >
      <Head>
        <title>Home | Fileinstant</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="fileinstant" />
        <meta name="keywords" content="fileinstant" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Home | Fileinstant" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://proxy-omega.vercel.app/logo.png" />

        <meta property="og:site_name" content="Fileinstant" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content="https://fileinstant.com/" />

        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://proxy-omega.vercel.app/logo.png" />
        <meta property="twitter:site" content="@fileinstant" />
      </Head>

      <section id="home_page">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-8">
            <div className="softwares_main">
              <div className="latest_softwares">
                {
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12">

                      <LatestSofts data={latestSoftwares.response} title={softwareBoxTitles[0]} link={softwareLink[0]} />

                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                      <LatestSofts data={popularSoftwares.response} title={softwareBoxTitles[1]} link={softwareLink[1]} />

                    </div>
                  </div>
                }
              </div>
              <div className="softwares">
                <div className="row">
                  {softwareCategories}
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

          {/* ADVERTISEMENT */}
          <div className="col-lg-2 col-md-4" id="add_right_home">
            <div className="row">
              <div className="col-12">
                <div className="addvertisement">
                  <h4 className="bg-secondary text-light text-center">
                    Advertise
                  </h4>
                  <img
                    src="/add.PNG"
                    alt=""
                    className="img-fluid w-100"
                  />
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
    </div>
  )
}


export async function getServerSideProps(context) {

  const category = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/category`)
      .then(response => {
        if (response.data.success) return { code: 200, response: response.data.data }
        return { code: 404, response: "Not Found" }
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response;
  }

  const fetchSoftware = async (categories) => {
    let softwares = [];
    let nodes = Object.keys(categories)
    for (let i = 0; i < nodes.length; i++) {
      const id = Object.values(categories[i])[0]
      const title = Object.values(categories[i])[1]
      await axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/${id}/${5}`)
        .then(response => {
          if (response.data.data.length) {
            softwares.push({ softwares: response.data.data, categoryID: id, title: title })
          }
        })
        .catch((error) => {
          return { code: 404, response: error }
        })
    }
    return { code: 200, response: softwares }
  }

  const popularSoftware = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/popular-software/5`)
      .then((response) => {
        return { code: 200, response: response.data.data }
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response;
  }

  const latestSoftware = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/latest-software/5`)
      .then((response) => {
        return { code: 200, response: response.data.data }
      })
      .catch((error) => {
        return { code: 404, response: error }
      })
    return response;
  }

  const popularSoftwares = await popularSoftware()
  const latestSoftwares = await latestSoftware()
  const categories = await category()

  if (categories.code === 200) {
    const softwares = await fetchSoftware(categories.response)
    return {
      props: { categories, softwares, popularSoftwares, latestSoftwares },
    }
  } else {
    return {
      notFound: true,
    }
  }

}

Home.layout = "public";
