
import DownloadContent from "../../../components/download/DownloadContent";
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function index({ software, oldSoftware }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const router = useRouter()
  const { params } = router.query
  // console.log("https://fileinstant.com/"+ params[0] + "/" + params[1])

  return (
    <>
      <Head>
        <title>{capitalizeFirstLetter(software.response.softwareName)} | Fileinstant </title>
        <meta name="description" content={software.response.softwareDescription.slice(0, 160)} />
        <meta name="keywords" content={software.response.softwareName} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={software.response.softwareName} />
        <meta property="og:description" content={software.response.softwareDescription.slice(0, 200)} />
        <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/uploads/${software.response.softwareIcon}`} />

        <meta property="og:site_name" content="Fileinstant" />
        <meta property="og:url" content={`https://fileinstant.com/download/${params[0]}/${params[1]}`} />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content="https://fileinstant.com/" />

        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={`${process.env.REACT_APP_API_URL}/uploads/${software.response.softwareIcon}`} />
        <meta property="twitter:site" content="@fileinstant" />

      </Head>

      <div className="container">
        <section id="download">
          <div className="row">
            <div className="col-lg-2 col-md-2 left-right-add">
              <div className="row">
                <div className="col-12">
                  <div className="addvertisement">
                    <h4 className="bg-secondary text-light text-center">Advertise</h4>
                    <img src="/addy.PNG" alt="" className="img-fluid w-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-12">
              <DownloadContent software={software} oldSoftware={oldSoftware} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}




export async function getStaticPaths() {

  const software = await axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/`)
    .then((response) => {
      return { code: 200, response: response.data.data }
    })
    .catch((error) => {
      return { code: 404, response: error }
    })



  if (software.code === 200) {
    const paths = software.response.map(item => {
      return {
        params: { params: [item.softwareName.trim().split(" ").join("-").toLowerCase(), item._id.toString()] }
      }
    })
    return {
      paths,
      fallback: false,
    }
  } else {
    return {
      paths: [],
      // {params: {params: [] }},
      fallback: false
    }
  }


}

export async function getStaticProps(context) {

  const software = await axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/fetch/`, { params: { id: context.params.params[1] } })
    .then(response => {
      return { code: 200, response: response.data.data }
    })
    .catch((error) => {
      return { code: 404, response: error }
    })

  const oldSoftware = await axios.get(`${process.env.REACT_APP_API_URL}/api/software-management/fetch/${software.response.softwareName}`)
    .then(response => {
      return { code: 200, response: response.data.data }
    })
    .catch((error) => {
      return { code: 404, response: error }
    })


  if (software.code === 200 && oldSoftware.code === 200) {
    return {
      props: { software, oldSoftware },
      revalidate: 60,
    }
  } else {
    return {
      notFound: true,
    }
  }

}
