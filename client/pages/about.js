import Head from 'next/head'
import axios from 'axios'


export default function Home({ info }) {

  return (
    <>
      <Head>
        <title>About | Fileinstant</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="fileinstant" />
        <meta name="keywords" content="fileinstant"/>
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="About | Fileinstant" />
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
      <div className="about_us">
        <div className="row">
          <div className="col-12">
            <h2>{info.response[0].title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="about_us_content">
              {info.response[0].content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {

  const info = await axios.get(`${process.env.REACT_APP_API_URL}/api/info-page`)
    .then((response) => {
      return { code: 200, response: response.data.data }
    })
    .catch((error) => {
      return { code: 404, response: error }
    })

  if (info.code === 200) {
    return {
      props: { info }, // will be passed to the page component as props
    }
  } else {
    return {
      notFound: true,
    }
  }

}