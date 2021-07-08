import { useContext } from "react";
import widgetContext from "../../context/fileinstant/widget/widgetContext";

const WidgetCode = () => {
  const WidgetContext = useContext(widgetContext);
  const {
    widgetWidth,
    showIcons,
    dateSize,
    linkSize,
    lineSpacing,
    underline,
    titleColor,
    titleBackground,
    dateColor,
    linkColor,
    borderColor,
    roundedCorners,
    roundedCornersSize,
  } = WidgetContext;


  return (
    <div className='widget_code_area'>
      <h4>Widget code</h4>
      <p>Copy following code to your page</p>
      <div className='widget_code'>
        <span>
          {`<!-- Fileinstant Feed -->`}
          <br />
          <br />
          {`<style type="text/css">`}
          <br />
          {`
            .widget_preview h4 {
              color:${titleColor};
              background-color:${titleBackground};
            }
          `}
          <br />
          {`
            .widget_preview {
              width:${widgetWidth}%;
            }
          `}
          <br />
          {`
            .latest_download_content {
              border:solid 1px ${borderColor};
              ${roundedCorners ? `border-radius:${roundedCornersSize}px;` : ""}
            } 
          `}
          <br />
          {(() => {
            let onWhich = "hover";
            // eslint-disable-next-line
            switch (underline) {
              case "click":
                onWhich = "focus";
                break;
              case "hover":
                onWhich = "hover";
                break;
            }
            return `
              .latest_download_content ul li a:${onWhich} {
                text-decoration:underline;
              }
              `;
          })()}
          <br />
          {`.latest_download_content ul li a { color:${linkColor}; font-size:${linkSize}rem }`}
          <br />
          {`.latest_download_content ul { line-height:${lineSpacing}; }`}
          <br />
          {`.latest_download_content ul li img { visibility:${showIcons ? 'visible' : 'hidden'}; }`}
          <br />
          {`</style>`}
          <br />
          <br />
          {`<fileinstant-widget-component></fileinstant-widget-component>`}
          <br />
          {`<script type="module"  src=".esm.js"></script>`}
          <br />
          {`<script nomodule src=".js"></script>`}
          <br />
          {`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">`}
          <br />
          <br />
          {`<!-- End Fileinstant Feed -->`}
        </span>
      </div>
      <div className='widget-add'>
        <div className='add_top'>
          <img src="./add2.png" alt='' />
        </div>
      </div>
    </div>
  );
};
export default WidgetCode;
