import DownloadContent from "../download/DownloadContent";
import Footer from "../layout/footer/Footer";
import Navbar from "../layout/navbar/Navbar";

const Download = () => {
  return (
    <div className="container">
      <Navbar />
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
            <DownloadContent />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Download;
