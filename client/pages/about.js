import Head from 'next/head'
import axios from 'axios'


export default function Home({info}) {

  

  
  
  return (
      
      <div className="about_us">
        <Head>	
          <title>About | Fileinstant</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
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
  );
}

export async function getStaticProps(context) {

  const info = await axios.get(`http://localhost:5000/api/info-page`)
  .then((response) => {
    return { code : 200 , response : response.data.data }
  })
  .catch((error) => {
    return { code : 404 , response : error }
  })
    
  if(info.code === 200 ){
    return {
      props: {info}, // will be passed to the page component as props
    }
  }else{
    return {
      notFound: true,
    }
  }
  
}