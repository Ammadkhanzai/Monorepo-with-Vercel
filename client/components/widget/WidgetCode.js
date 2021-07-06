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
          {`<style type="text/css">`}
          <br />
          {`
            .fh_title{
              padding:4px;
              background-color:${titleBackground};
              font-weight:bold;font-size:13px;
            }
          `}
          <br />
          {`
            .fh_title a {
              color:${titleColor} !important;
              text-decoration:none !important;
            }
          `}
          <br />
          {`
            .widget_preview {
              width:${widgetWidth? widgetWidth : '40'}%;
              border:solid 1px ${borderColor};
              ${roundedCorners ? `border-radius: ${roundedCornersSize}px;` : ""}
              background-color:#fff;font-family:Arial,Helvetica sans-serif;
            }
          `}
          <br />
          {`
            .fh_box a:hover {
              text-decoration:${underline !== "hover" ? "none" : "underline"};
            }
            
          `}
          {(() => {
            let onWhich = "hover";
            // eslint-disable-next-line
            switch (underline) {
              case "blur":
                onWhich = "blur";
                break;

              case "click":
                onWhich = "focus";
                break;
            }
            if (onWhich !== "hover") {
              return `
              .fh_box a:${onWhich} {
                text-decoration: underline;
              }
              `;
            }
          })()}
          <br />
          {`.fh_box a{color:${linkColor};text-decoration:none;font-size:${linkSize}}`}
          <br />
          {`ul.fh_items{font-size:12px;list-style:none;margin:5px;padding:0;}`}
          <br />
          {`.fh_date{color:${dateColor};font-size:${dateSize};font-weight:bold;margin-top:2px;line-height:${lineSpacing};}`}
          <br />
          {`.fh_item{margin:3px 0px 3px 0px;}`}
          <br />
          {`.fh_item img{border:0px;padding-right:3px;vertical-align:top;width:16px;height:16px;visibility:${showIcons ? 'visible' : 'hidden'}; }`}
          <br />
          {/* {`-->`} */}
          <br />
          {`</style>`}
          <br />
          {`<fileinstant-widget-component></fileinstant-widget-component>`}
          <br />
          {`<script type="module"  src=".esm.js"></script>`}
          <br />
          {`<script nomodule src=".js"></script>`}
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
