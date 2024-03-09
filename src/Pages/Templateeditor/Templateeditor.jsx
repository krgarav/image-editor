import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import html2canvas from "html2canvas";
function Templateeditor(props) {
  const croppedimageArray = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
  ];
  const [mergedImage, setMergedImage] = useState(null);
  const [colsDiv, setColsDiv] = useState([]);
  const navigate = useNavigate();
  const imgctx = useContext(imageContext);

  const totalColumns = imgctx.rowColState.totalColumns;
  const perLineCols = imgctx.rowColState.cols;
  console.log(imgctx.editedImage);
  const urlOfArray = imgctx.editedImage.map((item) => {
    return item.imageUrl;
  });
  let newArray = [];
  let index = 0;
  const getCroppImageHandler = (index) => {
    console.log(index);
    navigate("/imgeditor", { state: { index } });
  };
  const border = "1px solid grey";
  for (let index = 0; index < totalColumns; index++) {
    const findItemIndex = imgctx.editedImage.findIndex((current) => current.index == index);
    console.log(findItemIndex, imgctx.editedImage[findItemIndex]);
    let bgUrl = "";
    // const backgroundImage=findItem?imgctx.editedImage[findItem].imageUrl:"";
    if (findItemIndex != -1) {
      bgUrl = `url(${imgctx.editedImage[findItemIndex].imgUrl})`
      console.log(bgUrl);
    }
    else {
      bgUrl = "none"
    }

    newArray.push(
      <div
        key={index}
        className={`cols  d-flex justify-content-center align-items-center fw-bolder p-5`}
        style={{
          border: findItemIndex == -1 ? border : "none",
          backgroundImage: bgUrl,
          backgroundSize:
            "100% 100%" /* Cover will ensure the image covers the entire div */,
          backgroundPosition: "center" /* Center the background image */,
          backgroundRepeat: "no-repeat" /* Prevent the image from repeating */,
        }}
        onClick={() => getCroppImageHandler(index)}
      >
        {findItemIndex==-1 && "+"}
      </div>
    );
  }

  const handleDownload = () => {
    // if (mergedImage) {
    //   // Create an anchor element
    //   const link = document.createElement("a");
    //   link.href = mergedImage;
    //   link.download = "merged_image.png";
    //   // Simulate click on the anchor element to trigger download
    //   link.click();
    // }
    const collageElement = document.querySelector("#collage");
    html2canvas(collageElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "collage.png";
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <div
      className="container border  d-flex justify-content-center align-items-center flex-column"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className={`row row-cols-${perLineCols} m-3 border`}
        id="collage"
        style={{ Width: "600px", height: "400px" }}
      >
        {newArray}
      </div>
      <div className="row text-center">
        <div className="btn btn-warning my-5" onClick={handleDownload}>
          download merge image
        </div>
      </div>
    </div>
  );
}

export default Templateeditor;
