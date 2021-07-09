import { useContext, useEffect } from "react";
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


  useEffect(() => {
    var root = document.querySelector(':root');
    root.style.setProperty('--tilte-color', titleColor);
    root.style.setProperty('--title-background', titleBackground);
    root.style.setProperty('--widget-width', widgetWidth + "%");
    root.style.setProperty('--list-border', `${borderColor && "1px solid " + borderColor}`);
    root.style.setProperty('--list-border-radius', roundedCornersSize + "px");
    root.style.setProperty('--underline-focus', `${underline == 'click' ? 'underline' : ''}`);
    root.style.setProperty('--underline-onhover', `${underline == 'hover' ? 'underline' : ''}`);
    root.style.setProperty('--software-name-color', linkColor);
    root.style.setProperty('--software-name-size', linkSize + "px");
    root.style.setProperty('--software-list-spacing', lineSpacing);
    root.style.setProperty('--show-icon', `${showIcons ? "" : "hidden"}`);
  }, [WidgetContext])


  return (
    <div className='widget_code_area'>
      <h4>Widget code</h4>
      <p>Copy following code to your page</p>
      <div className='widget_code'>
        <span>
          {`<!-- Fileinstant Feed -->`}
          <br />
          {`<style type="text/css">`}
          <br /><br/>
          {`:root { `}
          <br/>
          {titleColor && ` --tilte-color: ${titleColor};`}
          <br/>
          {titleBackground && ` --title-background: ${titleBackground};`}
          <br/>
          {widgetWidth && ` --widget-width: ${widgetWidth}%;`}
          <br/>
          {borderColor && ` --list-border: 1px solid ${borderColor};`}
          <br/>
          {roundedCorners && roundedCornersSize ? ` --list-border-radius: ${roundedCornersSize}px;` : ""}
          <br/>
          {underline && (() => {
            if (underline === "click") {
              return ` --underline-focus: underline;`
            }
            if (underline === "hover") {
              return ` --underline-onhover: underline;`
            }
          })()}
          <br/>
          {linkColor && ` --software-name-color: ${linkColor};`}
          <br/>
          {linkSize && ` --software-name-size: ${linkSize}px;`}
          <br/>
          {lineSpacing && ` --software-list-spacing: ${lineSpacing};`}
          <br/>
          {showIcons ? "" : " --show-icon: hidden;"}
          {` }`}
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
