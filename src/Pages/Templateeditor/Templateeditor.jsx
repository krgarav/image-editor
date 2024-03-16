import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import imageContext from "../../store/Image-context";
import tempcss from "./templateeditor.module.css";
import { toast } from "react-toastify";
import DrawerAppBar from "../../components/Appbar/Appbar";
import uploadsvg from "/upload-svgrepo-com.png";
import jsPDF from "jspdf";
import ArrayCalculation from "../../components/ArrayCalculation";
import ImageMerger from "../../components/Imagemerger";

function Templateeditor() {
  const navigate = useNavigate();
  const imgctx = useContext(imageContext);
  const totalColumns = imgctx.rowColState.totalColumns;
  const perLineCols = imgctx.rowColState.cols;
  const totalRow = totalColumns / perLineCols;

  useEffect(() => {
    if (!totalColumns || !perLineCols) {
      navigate("/Image Merger", { replace: true });
    }
  }, []);

  let newArray = [];

  const getCroppImageHandler = (index) => {
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
    let bgUrl = "";
    if (findItemIndex != -1) {
      bgUrl = `url(${imgctx.editedImage[findItemIndex].imgUrl})`;
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
        }}
        onClick={() => getCroppImageHandler(index)}
      >
        <div className={tempcss.uploadIcon}>
          {findItemIndex == -1 ? (
            <div>
              <img src={uploadsvg} width="30px" height="30px"></img>upload
              <h5></h5>
            </div>
          ) : (
            <div>
              <div
                style={{ width: "30px", height: "30px" }}
                width="30px"
                height="30px"
              ></div>
              <h5></h5>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (imgctx.editedImage.length < totalColumns) {
      toast.error(
        "please upload image to each column else choose another template"
      );
      return;
    } else {
      const twoDimImgUrlArr = ArrayCalculation(
        imgctx.editedImage,
        perLineCols,
        totalRow
      );

      const imgDataUrl = await ImageMerger(twoDimImgUrlArr);
      const response = await fetch(imgDataUrl);
      const blob = await response.blob();
      const opts = {
        types: [
          {
            description: "JPEG Image",
            accept: { "image/jpeg": [".jpg", ".jpeg"] },
          },
        ],
        suggestedName: "merged image",
      };
      const fileHandle = await window.showSaveFilePicker(opts);
      const writable = await fileHandle.createWritable();
      await writable.write(blob, { type: "image/jpeg" });
      await writable.close();
    }
  };

  const handleDownloadPdf = async () => {
    if (imgctx.editedImage.length < totalColumns) {
      toast.error(
        "please upload image to each column else choose another template"
      );
      return;
    } else {
      const twoDimImgUrlArr = ArrayCalculation(
        imgctx.editedImage,
        perLineCols,
        totalRow
      );

      const imgDataUrl = await ImageMerger(twoDimImgUrlArr);

      // Create an HTML image element
      const img = new Image();

      // Listen for the load event
      const imgLoadPromise = new Promise((resolve) => {
        img.onload = () => {
          resolve();
        };
      });

      // Set the src attribute to the data URL
      img.src = imgDataUrl;

      // Wait for the image to load
      await imgLoadPromise;

      // Once the image is loaded, get its width and height
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Calculate the PDF page size based on the image dimensions
      const pageWidth = imgWidth + 20; // Add some padding
      const pageHeight = imgHeight + 20; // Add some padding
      const pdf = new jsPDF({
        unit: "mm",
        format: [pageWidth, pageHeight],
      });

      // Add the image to the PDF
      pdf.addImage(imgDataUrl, "JPEG", 10, 10, imgWidth, imgHeight);

      // Generate PDF as a Blob
      const pdfBlob = pdf.output("blob");
      const opts = {
        types: [
          {
            description: "PDF file",
            accept: { "application/pdf": [".pdf"] },
          },
        ],
        suggestedName: "collage",
      };
      const fileHandle = await window.showSaveFilePicker(opts);
      const writable = await fileHandle.createWritable();
      await writable.write(pdfBlob);
      await writable.close();
      // });
    }
  };
  // console.log(row);

  return (
    <Fragment>
      <DrawerAppBar activeRoute="Image Merger" />
      <div style={{ height: "100vh", width: "100vw" }}>
        <div style={{ height: "5vh" }}></div>

        <div
          className={`container mt-5 border  ${tempcss.columnContainer} d-flex  justify-content-center`}
          style={{ height: "70vh" }}
        >
          <div style={{ margin: "20px" }}>
            <div
              className={`row row-cols-${perLineCols}  ${tempcss.rowStyle} d-flex`}
              id="collage"
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
          <div
            className="btn btn-outline-info my-3 mx-5 fw-bold"
            onClick={handleDownloadPdf}
          >
            Download as Pdf
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Templateeditor;
