import { useState } from "react";
import Head from 'next/head';
import axios from 'axios'



export default function index() {

  const [contactDetails, setContactDetails] = useState({
    advertise_fName: "",
    advertise_lName: "",
    advertise_email: "",
    advertise_type: "",
    advertise_message: "",
  });

  const onChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Advertise | Fileinstant</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="fileinstant" />
        <meta name="keywords" content="fileinstant" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Advertise | Fileinstant" />
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
      <div className="advertise_us">
        <h2>Advertise With Us</h2>
        <div className="advertise_details">
          <div className="row">
            <div className="col-lg-8 col-md-12 mt-4">
              <p>
                You can use this contact form to send us feedback about
                FileInstant website. We are waiting for your thoughts or
                suggestions. We will try to respond to all messages you send us
                as long as they contain well-founded feedback or suggestions. We
                will not consider/answer questions related to fixing your
                computer, finding information on the Internet, or anything
                similar. Please note that we are receiving lots of emails so it
                could take us 48 hours or more to answer your email.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <form className="mt-4">
                <div className="row mb-2">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="advertise_fName">First name:</label>
                      <input
                        type="text"
                        name="advertise_fName"
                        id="advertise_fName"
                        className="form-control mt-1"
                        placeholder="Enter your first name here..."
                        onChange={onChange}
                        value={contactDetails.advertise_fName}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="advertise_lName">Last name:</label>
                      <input
                        type="text"
                        name="advertise_lName"
                        id="advertise_lName"
                        className="form-control mt-1"
                        placeholder="Enter your last name here..."
                        onChange={onChange}
                        value={contactDetails.advertise_lName}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="advertise_type">Email:</label>
                      <input
                        type="email"
                        name="advertise_email"
                        id="advertise_email"
                        className="form-control mt-1"
                        placeholder="Enter your email here..."
                        onChange={onChange}
                        value={contactDetails.advertise_email}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="advertise_type">Advertise Type:</label>
                      <select
                        type="text"
                        name="advertise_type"
                        id="advertise_type"
                        className="form-control mt-1"
                        placeholder="Enter your subject here..."
                        onChange={onChange}
                        value={contactDetails.advertise_type}
                        required
                      >
                        <option value="">Select advertisement type</option>
                        <option value="Advertise Banner On Header">
                          Advertise Banner On Header
                        </option>
                        <option value="Advertise Banner On Left Side">
                          Advertise Banner On Left Side (120 x 720)
                        </option>
                        <option value="Advertise Banner On Right Side">
                          Advertise Banner On Right Side (120 x 720)
                        </option>
                        <option value="Advertise Banner On Footer">
                          Advertise Banner On Footer
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        type="submit"
                        name="advertise_submit"
                        id="advertise_submit"
                        className="btn btn-primary mt-3"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="d-flex align-items-center h-100 contact_img">
                <img
                  src="./contact.svg"
                  className="img-fluid"
                  alt=""
                  style={{
                    WebkitTransform: "scaleX(-1)",
                    transform: "scaleX(-1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps(context) {

//   const info = await axios.get(`${process.env.REACT_APP_API_URL}/api/info-page`)
//   .then((response) => {
//     return { code : 200 , response : response.data.data }
//   })
//   .catch((error) => {
//     return { code : 404 , response : error }
//   })

//   if(info.code === 200 ){
//     return {
//       props: {info}, // will be passed to the page component as props
//     }
//   }else{
//     return {
//       notFound: true,
//     }
//   }

// }