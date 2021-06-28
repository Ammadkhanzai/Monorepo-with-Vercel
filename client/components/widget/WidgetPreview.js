import Link from 'next/link'
import { useContext } from 'react'
import widgetContext from '../../context/fileinstant/widget/widgetContext';

const WidgetPreview = () => {
  const WidgetContext = useContext(widgetContext);
  console.log(WidgetContext.showIcons)
  return (

    <div className='widget_preview'>
      <h5>Widget preview</h5>
      <div className='latest_download'>
        <h4>Latest downloads</h4>
        <div className='latest_download_content'>
          <ul>
            <li>
              {WidgetContext.showIcons && <img
                src={"/chrome_icon.png"}
                alt=''
                className='img-fluid'
              />}
              <Link href='/a'>
                <a> google chrome 28.0.1500.95</a>
              </Link>
            </li>
            <li>Powered by fileinstant</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WidgetPreview;
