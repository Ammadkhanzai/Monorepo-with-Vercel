import Link from 'next/link'

const WidgetPreview = () => {
  return (
    <div className='widget_preview'>
      <h5>Widget preview</h5>
      <div className='latest_download'>
        <h4>Latest downloads</h4>
        <div className='latest_download_content'>
          <ul>
            <li>04 Jan</li>
            <li>
              <img
                src={"chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>
              <img
                src={"chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>03 Jan</li>
            <li>
              <img
                src={ "chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>
              <img
                src={"chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>
              <img
                src={"chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>
              <img
                src={ "chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>01 Jan</li>
            <li>
              <img
                src={"chrome_icon.png"}
                alt=''
                className='img-fluid'
              />
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>Powered by filehippo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WidgetPreview;
