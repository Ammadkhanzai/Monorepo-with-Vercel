import Head from 'next/head'
import axios from 'axios'


export default function Home({ info }) {





  return (
    <>
      <Head>
        <title>Tech News | Fileinstant</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="fileinstant" />
        <meta name="keywords" content="fileinstant" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Tech News | Fileinstant" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />

        <meta property="og:site_name" content="Fileinstant" />
        <meta property="og:url" content="https://proxy-omega.vercel.app/logo.png" />
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
            <div className="about_us_content">
              WikiCamps: Worth A Try
              There are almost as many travel apps out there as there are travel destinations. In general, they all do some things well, and some things not so well. WikiCamps is certainly in the same, erm, camp. With a focus on – you guessed it – camping, the app can...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

