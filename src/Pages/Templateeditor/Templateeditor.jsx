import React, { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import html2canvas from "html2canvas";

import tempcss from "./templateeditor.module.css";
import { toast } from "react-toastify";

import DrawerAppBar from "../../components/Appbar/Appbar";

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
  const fixedArr = new Array(totalColumns);
  imgctx.editedImage.forEach((item) => {
    const index = item.index;
    const url = item.imgUrl;

    fixedArr[index] = url;
  });
  console.log(fixedArr);
  console.log(urlOfArray);
  for (let index = 0; index < totalColumns; index++) {
    const findItemIndex = imgctx.editedImage.findIndex(
      (current) => current.index == index
    );
    console.log(findItemIndex, imgctx.editedImage[findItemIndex]);
    let bgUrl = "";
    // const backgroundImage=findItem?imgctx.editedImage[findItem].imageUrl:"";
    if (findItemIndex != -1) {
      bgUrl = `url(${imgctx.editedImage[findItemIndex].imgUrl})`;
      console.log(bgUrl);
    } else {
      bgUrl = "none";
    }

    newArray.push(
      <div
        key={index}
        className={`cols  d-flex justify-content-center align-items-center fw-bolder p-4`}
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

        {findItemIndex == -1 && "+ "}


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
  if(imgctx.editedImage.length<totalColumns){
    toast.error("please upload image to each column else choose another template")
    return
  }


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

    // <div
    //   className="container border  d-flex justify-content-center align-items-center flex-column"
    //   style={{ width: "100vw", height: "100vh" }}
    // >
    //   <div
    //     className={`row row-cols-${perLineCols} m-3 border`}
    //     id="collage"
    //     // style={{ Width: "600px", height: "400px" }}
    //   >
    //     {newArray}
    //   </div>
    //   <div className="row text-center">
    //     <div className="btn btn-warning my-5" onClick={handleDownload}>
    //       download merge image
    //     </div>
    //   </div>
    // </div>
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ height: "5vh" }}></div>
      <div
        className={`container mt-5 border  ${tempcss.columnContainer} d-flex justify-content-center align-items-center`}
        style={{ height: "70vh" }}
      >
        <div className={`row row-cols-${perLineCols} m-1 my-3`} id="collage">
          
          {newArray}
        </div>
      </div>
      <div className="container text-center">
        <div className="btn btn-outline-warning my-2 fw-bold" onClick={handleDownload}>
          Download Merge Image

    <Fragment>
      <DrawerAppBar activeRoute="Image Merger" />

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
    </Fragment>
  );
}

export default Templateeditor;
