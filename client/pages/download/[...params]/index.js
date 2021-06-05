
import DownloadContent from "../../../components/download/DownloadContent";
import Head from 'next/head'
import axios from 'axios';

export default  function  index({software, oldSoftware}){

    // console.log(software, oldSoftware)

    // const router = useRouter()
    // const { params } = router.query
    // console.log("here",params);
    // console.log(title, id)
    
    return (
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
              <Head>
                <title>Download | Fileinstant </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta  property="og:title" content={software.response.softwareName} />
                <meta  property="og:description" content={software.response.softwareDescription}  />
                <meta  property="og:image" content={`http://localhost:5000/uploads/${software.response.softwareScreenshot[0]}`} />
              </Head> 
              <DownloadContent software={software} oldSoftware={oldSoftware} />
            </div>
          </div>
        </section>
    );
}




export async function getStaticPaths() {

  const software = await axios.get('http://localhost:5000/api/software-management/')
  .then((response) => {
    return { code : 200 , response : response.data.data }
  })
  .catch((error) => {
    return { code : 404 , response : error }
  })

  

  if(software.code ===200 ){
    const paths = software.response.map( item => {
      return {
        params : { params : [ item.softwareName.trim().split(" ").join("-").toLowerCase() , item._id.toString() ] }
      }
    })  
    return {
      paths,
      fallback: false,
    }
  }else{
    return {
      paths: [],
          // {  params: { params: [] }},
      fallback: false
    }
  }
  

}

export async function getStaticProps(context) {
  
  const software = await axios.get('http://localhost:5000/api/software-management/fetch/',{ params : { id : context.params.params[1] }})
  .then(response => {
    return { code : 200 , response : response.data.data }
  })
  .catch((error) => {
    return { code : 404 , response : error }
  })

  const oldSoftware = await axios.get(`http://localhost:5000/api/software-management/fetch/${software.response.softwareName}`)
  .then(response => {
    return { code : 200 , response : response.data.data }
  })
  .catch((error) => {
    return { code : 404 , response : error }
  })

    
  if(software.code === 200 &&  oldSoftware.code === 200 ){
    return {
      props: { software, oldSoftware},
      revalidate: 60,
    }
  }else{
    return {
      notFound: true,
    }
  }

}
