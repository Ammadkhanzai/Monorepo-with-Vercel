import { useReducer } from "react";
import WidgetContext from "./widgetContext";
import WidgetReducer from "./widgetReducer";

const WidgetState = (props) => {
  
  const initState = {
    widgetWidth: "70",
    showIcons: true,
    dateSize: "",
    linkSize: "16",
    lineSpacing: "1",
    underline: "",
    titleColor: "#ffffff",
    titleBackground: "#0d6efd",
    dateColor: "",
    linkColor: "#000000",
    borderColor: "#FAFAFA",
    roundedCorners: false ,
    roundedCornersSize: "",
  };

  const [state, dispatch] = useReducer(WidgetReducer, initState);

  const fieldChange = (field, val) => {
    dispatch({ field: field, value: val });
  };

  const checkboxChange = (field, val) => {
    dispatch({ field: field, value: val });
  };

  return (
    <WidgetContext.Provider
      value={{
        widgetWidth: state.widgetWidth,
        showIcons: state.showIcons,
        dateSize: state.dateSize,
        linkSize: state.linkSize,
        lineSpacing: state.lineSpacing,
        underline: state.underline,
        titleColor: state.titleColor,
        titleBackground: state.titleBackground,
        dateColor: state.dateColor,
        linkColor: state.linkColor,
        borderColor: state.borderColor,
        roundedCorners: state.roundedCorners,
        roundedCornersSize: state.roundedCornersSize,
        fieldChange,
        checkboxChange,
      }}
    >
      {props.children}
    </WidgetContext.Provider>
  );
};
export default WidgetState;
