import React from "react"
import Disqus from "disqus-react"

const DownloadReview = ({software}) => {
    console.log(software._id)
    console.log(software)

    const disqusShortname = "fileinstant"
    const disqusConfig = {
      url: `http://localhost:3000/${software._id}`,
      identifier: software._id,
      title: software.softwareName
    }

    return (

        <div className="article-container">

        {/* <h1>Page Title</h1>
        <p>Page content.</p> */}

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
      
    );
  };
  export default DownloadReview;
  