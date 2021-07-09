
import WidgetCode from "../components/widget/WidgetCode";
import WidgetContent from "../components/widget/WidgetContent";
import WidgetPreview from "../components/widget/WidgetPreview";
import WidgetState from "../context/fileinstant/widget/widgetState";
import Head from 'next/head';
import { useEffect } from 'react';
import { applyPolyfills, defineCustomElements } from 'fileinstant-widget/loader';
import Link from 'next/link';

const Widget = () => {

  useEffect(() => {
    applyPolyfills().then(() => {
      defineCustomElements(window)
    })

  }, [])

  return (
    <>
      <Head>
        <title>Widget | Fileinstant</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <WidgetState>
        <section id="widget">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget_title">
                <h4>Widget - Create your own!</h4>
                <p>
                  Add the filehippo widget to your website, so your visitors can
                  benefit from all the latest software updates! Just change the
                  options below until the preview matches the style of your site,
                  then simply copy the HTML code.
                </p>
                <Link href="https://download.filecat.xyz/index.html">
                  <a target="_blank">new 1</a>
                </Link>
                <Link href="https://download.filecat.xyz/test/img.jpg" >
                  <a target="_blank">new</a>
                </Link>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <WidgetContent />
            </div>
            <div className="col-lg-6 col-md-12">
              {/* <WidgetPreview /> */}
              <fileinstant-widget-component></fileinstant-widget-component>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <WidgetCode />
            </div>
          </div>
        </section>
      </WidgetState>
    </>
  );
};
export default Widget;
