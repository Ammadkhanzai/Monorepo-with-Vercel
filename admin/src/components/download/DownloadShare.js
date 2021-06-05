import React from 'react';
import MetaTags from 'react-meta-tags';
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


const DownloadShare = ( ) => {
  // console.log(window.location.href)
  const url = "https://fileinstant.herokuapp.com/download/firefox/60939c34f56eaa2be005ef4f"
  return (
    
    <div className="download_details" >
         <MetaTags>
          <title>Page 1</title>
          
          <meta  property="og:title" content="How to Become an SEO Expert (8 Steps)" />
          <meta  property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
          <meta  property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
          
        </MetaTags>
      <h5>Share</h5>
      <div className="download_share_buttons my-4">
        <FacebookShareButton url={url}  className="download_share_btn">
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
  );
};
export default DownloadShare;
