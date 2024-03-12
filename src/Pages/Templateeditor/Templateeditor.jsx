import React, { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import html2canvas from "html2canvas";
import tempcss from "./templateeditor.module.css";
import { toast } from "react-toastify";
import DrawerAppBar from "../../components/Appbar/Appbar";
import ImageCollage from "../../components/ImageCollage/ImageCollage";
import uploadsvg from "../../../public/upload-svgrepo-com.png";
function Templateeditor(props) {
  const croppedimageArray = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
  ];
  const [mergedImage, setMergedImage] = useState(null);
  const [colsDiv, setColsDiv] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const imgctx = useContext(imageContext);

  const totalColumns = imgctx.rowColState.totalColumns;
  const perLineCols = imgctx.rowColState.cols;
  const row=(totalColumns/perLineCols)
  console.log(row)
  let styles="";
  if(row===1){

  }
  
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
        className={`cols  d-flex justify-content-center align-items-center fw-bolder ${tempcss.columnDiv}`}
        style={{
          border: findItemIndex == -1 ? border : "none",
          backgroundImage: bgUrl,
          backgroundSize:
            "100% 100%" /* Cover will ensure the image covers the entire div */,
          backgroundPosition: "center" /* Center the background image */,
          backgroundRepeat: "no-repeat" /* Prevent the image from repeating */,
          
          // padding:"180px"
        }}
        onClick={() => getCroppImageHandler(index)}
      >
        <div className={tempcss.uploadIcon}>
          {findItemIndex == -1 ?(
            <div>
              <img src={uploadsvg} width="30px" height="30px"></img>upload
              <h5></h5>
            </div>
          ):(<div>
            <div style={{width:"30px",height:"30px"}}  width="30px" height="30px" ></div>
            <h5></h5>
          </div>)}
        
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (imgctx.editedImage.length < totalColumns) {
      toast.error(
        "please upload image to each column else choose another template"
      );
      return;
    } else {
      const collageElement = document.querySelector("#collage");
      html2canvas(collageElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "collage.png";
        document.body.appendChild(link);
        link.click();
      });
      // setState(true);
    }
  };
  return (
    <Fragment>
      <DrawerAppBar activeRoute="Image Merger" />
      <div style={{ height: "100vh", width: "100vw" }}>
        <div style={{ height: "5vh" }}></div>

        <div
          className={`container mt-5 border  ${tempcss.columnContainer} d-flex `}
          style={{ height: "70vh" }}
        >
          {/* <div className="py-2 px-1 my-2"> */}
          <div style={{ margin: "20px" }}>
            {" "}
            <div
              className={`row row-cols-${perLineCols}  ${tempcss.rowStyle} d-flex justify-content-center`}
              id="collage"
              // style={{ minHeight: "595px", minWidth: "842px" }}
            >
              {newArray}
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div
            className="btn btn-outline-warning my-3 fw-bold"
            onClick={handleDownload}
          >
            Download Merged Image
          </div>
          {/* {state && (
            <ImageCollage
              imageUrls={imgctx.editedImage}
              rows={perLineCols}
              columns={totalColumns}
            />
          )} */}
        </div>
      </div>
    </Fragment>
  );
}

export default Templateeditor;
