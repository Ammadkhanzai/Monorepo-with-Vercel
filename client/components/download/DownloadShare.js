import Head from 'next/head'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";


const DownloadShare = () => {
  // console.log(window.location.href)
  const url = "https://fileinstant.herokuapp.com/download/firefox/60939c34f56eaa2be005ef4f"
  return (
    <>
      <Head>
        <meta property="og:title" content="hello" />
        <meta property="og:description" content="Ammad khan " />
        <meta property="og:image" content="https://fileinstant.herokuapp.com/uploads/1620286516903-849016125.png" />

        {/* <meta property="og:site_name" content="Fileinstant" /> */}
        {/* <meta property="og:url" content={`https://fileinstant.com/download/${params[0]}/${params[1]}`} /> */}
        {/* <meta property="og:type" content="article" /> */}
        {/* <meta property="article:publisher" content="https://fileinstant.com/" /> */}

        {/* <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={`${process.env.REACT_APP_API_URL}/uploads/${software.response.softwareIcon}`} />
        <meta property="twitter:site" content="@fileinstant" /> */}

      </Head>
      <div className="download_details" >
        <h5>Share</h5>
        <div className="download_share_buttons my-4">
          <FacebookShareButton url={url} className="download_share_btn">
            <FacebookIcon size={40} />
          </FacebookShareButton>
          <TwitterShareButton url={url} className="download_share_btn">
            <TwitterIcon size={40} />
          </TwitterShareButton>
          <PinterestShareButton url={url} className="download_share_btn">
            <PinterestIcon size={40} />
          </PinterestShareButton>
          <LinkedinShareButton url={url} className="download_share_btn">
            <LinkedinIcon size={40} />
          </LinkedinShareButton>
          <WhatsappShareButton url={url} className="download_share_btn">
            <WhatsappIcon size={40} />
          </WhatsappShareButton>
          <EmailShareButton url={url} className="download_share_btn">
            <EmailIcon size={40} />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
};
export default DownloadShare;
