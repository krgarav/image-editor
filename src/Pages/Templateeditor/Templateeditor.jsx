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

  const urlOfArray = imgctx.editedImage.map((item) => {
    return item.imageUrl;
  });
  let newArray = [];
  let index = 0;
  const getCroppImageHandler = (index) => {
    navigate("/imgeditor");
  };

  for (let index = 0; index < totalColumns; index++) {
    newArray.push(
      <div
        key={index}
        className="cols border d-flex justify-content-center align-items-center fw-bolder"
        style={{
          height: "250px",
          backgroundImage: `url(${urlOfArray[index]})`,
        }}
        onClick={() => getCroppImageHandler(index)}
      >
        +
      </div>
    );
  }

  const handleDownload = () => {
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
        id="collage"
        className={`row row-cols-${perLineCols}`}
        style={{ width: "280px" }}
      >
        {newArray}
      </div>
      <div className="row text-center">
        <div className="btn btn-warning my-5" onClick={handleDownload}>
          {" "}
          download merge image
        </div>
      </div>
    </div>
  );
}

export default Templateeditor;
