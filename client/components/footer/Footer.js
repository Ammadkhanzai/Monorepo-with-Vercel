import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="nav d-flex">
          <div className="footer-menu">
            <ul>
              <li>
                <Link href="/">Home</Link>
                
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/tech-news">Advertise With us</Link>
              </li>
              <li>
                <Link href="/widget">website widget</Link>
              </li>
              <li>
                <Link href="/advertise-with-us">Tech news</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="footer-copyright">
            &copy; Copyright 2013 VictorFile.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
