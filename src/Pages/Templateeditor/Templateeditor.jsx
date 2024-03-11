import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import html2canvas from "html2canvas";
import tempcss from "./templateeditor.module.css";
import { toast } from "react-toastify";
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
        className={`col  d-flex justify-content-center align-items-center fw-bolder p-5`}
        style={{
          border: findItemIndex == -1 ? border : "none",
          backgroundImage: bgUrl,
          backgroundSize:
            "100% 100%" /* Cover will ensure the image covers the entire div */,
          backgroundPosition: "center" /* Center the background image */,
          backgroundRepeat: "no-repeat" /* Prevent the image from repeating */,
          height: "150px",
          minWidth: "100px", // Set minimum width for the columns
          flex: "1 1 auto", // Allow columns to grow and shrink equally

        }}
        onClick={() => getCroppImageHandler(index)}
      >
        {findItemIndex == -1 && "+ "}
      </div>
    );
  }

  // console.log(newArray);
  // console.log(mappedArray);
  const handleDownload = () => {
    // if (mergedImage) {
    //   // Create an anchor element
    //   const link = document.createElement("a");
    //   link.href = mergedImage;
    //   link.download = "merged_image.png";
    //   // Simulate click on the anchor element to trigger download
    //   link.click();
    // }
    if (imgctx.editedImage.length < totalColumns) {
      toast.error(
        "please upload image to each column else choose another template"
      );
      return;
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
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ height: "5vh" }}></div>
      <div
        className={`container mt-5 border  ${tempcss.columnContainer} d-flex justify-content-center align-items-center`}
        style={{ height: "70vh" }}
      >
        <div className={`row row-cols-${perLineCols} m-1 my-3`} id="collage" style={{minWidth:"50%"}}>
          {/* <div style={{ width: "100%", height: "300px" }}></div> */}

          {newArray}
        </div>
      </div>
      <div className="container text-center">
        <div
          className="btn btn-outline-warning my-2 fw-bold"
          onClick={handleDownload}
        >
          Download Merge Image
        </div>
      </div>
    </div>
  );
}

export default Templateeditor;
