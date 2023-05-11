import React, { useState } from "react";
import Lightbox, { ImagesListType } from "react-spring-lightbox";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
const CoolLightbox = ({ fullData, setFullScreen }) => {
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  };

  const gotoNext = () => {
    currentImageIndex + 1 < fullData.length &&
      setCurrentIndex(currentImageIndex + 1);
  };
  const handleClose = () => {
    setFullScreen(false);
  };
  return (
    <Lightbox
      isOpen={true}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={fullData}
      currentIndex={currentImageIndex}
      // renderHeader={() => <CustomHeader setFullScreen={setFullScreen} />}
      renderPrevButton={() => (
        <CustomLeftArrowButton gotoPrevious={gotoPrevious} />
      )}
      className="overlayclass"
      renderNextButton={() => <CustomRightArrowButton gotoNext={gotoNext} />}
      onClose={handleClose}
      /* Add your own UI */

      // renderFooter={() => (<CustomFooter />)}

      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      // onClose={handleClose}

      /* Use single or double click to zoom */
      // singleClickToZoom

      /* react-spring config for open/close animation */
      // pageTransitionConfig={{
      //   from: { transform: "scale(0.75)", opacity: 0 },
      //   enter: { transform: "scale(1)", opacity: 1 },
      //   leave: { transform: "scale(0.75)", opacity: 0 },
      //   config: { mass: 1, tension: 320, friction: 32 }
      // }}
    />
  );
};

export default CoolLightbox;
const CustomHeader = ({ setFullScreen }) => {
  return (
    <button className="customBtn m-3" onClick={(e) => setFullScreen(false)}>
      Go Back
    </button>
  );
};
const CustomRightArrowButton = ({ gotoNext }) => {
  return (
    <span
      style={{ zIndex: "99999", margin: "0px 20px" }}
      onClick={(e) => gotoNext()}
    >
      <ArrowForwardIosOutlinedIcon
        style={{ zIndex: "99999", fontSize: "50px" }}
      />
    </span>
  );
};
const CustomLeftArrowButton = ({ gotoPrevious }) => {
  return (
    <span
      style={{ zIndex: "999999", margin: "0px 20px" }}
      onClick={(e) => gotoPrevious()}
    >
      <ArrowBackIosNewOutlinedIcon
        style={{ zIndex: "99999", fontSize: "50px" }}
      />
    </span>
  );
};
// const CustomLeftArrowButton = ({ gotoNext }) => {
//   return (
//     <button className="customBtn" onClick={(e) => gotoNext()}>
//       <ArrowForwardIosOutlinedIcon sx={{ fontSize: "30px" }} />
//     </button>
//   );
// };
