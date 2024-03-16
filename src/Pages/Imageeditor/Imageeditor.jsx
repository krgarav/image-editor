import React, { useState, useRef, useContext, Fragment } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import classes from "./Imageeditor.module.css";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import imageContext from "../../store/Image-context";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerAppBar from "../../components/Appbar/Appbar";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const imageEditor = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(0);
  const [rotate, setRotate] = useState(0);
  const imgctx = useContext(imageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const cropperRef = useRef();

  const handleFileChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
 
  // Function to handle scale change
  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  // Function to handle rotate change
  const handleRotateChange = (event) => {
    setRotate(parseFloat(event.target.value));
  };

  // Function to get edited image
  const handleSaveImage = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      imgctx.addToEditedImage(
        location.state.index,
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
        
      );
      
      navigate("/temeditor");
    }
  };
  const rotateLeftHandler = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      cropperRef.current.cropper.rotate(-90);
    }
  };
  const rotateRightHandler = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      cropperRef.current.cropper.rotate(90);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please drop an image file.");
    }
  };

  // Function to handle the drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <DrawerAppBar activeRoute="Image Merger" />
      <div className={classes.image_container}>
        <div className={classes.main_container}>
          <div
            className={classes.avatar_container}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {image && (
              <Card style={{ display: "flex", justifyContent: "center" }}>
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "80%" }}
                  zoomTo={scale}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={50}
                  minCropBoxWidth={50}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
              </Card>
            )}
            {image && (
              <div className={classes.btn_container}>
                <Button variant="contained" onClick={rotateLeftHandler}>
                  Rotate 90&deg; left <FaArrowRotateLeft />
                </Button>
                <Button variant="contained" onClick={rotateRightHandler}>
                  Rotate 90&deg; right <FaArrowRotateRight />
                </Button>
              </div>
            )}

            {/* File input to select image */}

            {!image && (
              <div>
                <h1>
                  Drop your image here <br /> <strong>or</strong>
                </h1>
                <label htmlFor="file-upload">
                  <h1 className={classes.uploader}>
                    Click here to Upload an Image
                  </h1>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            )}

            {/* Scale and rotate controls */}
            <div>
              {image && (
                <div>
                  <label>Scale:</label>
                  <Slider
                    defaultValue={1}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={scale}
                    step={0.01}
                    min={1}
                    max={6}
                    onChange={handleScaleChange}
                  />

                  <label>Rotate:</label>
                  <Slider
                    defaultValue={0}
                    aria-label="default"
                    valueLabelDisplay="auto"
                    value={rotate}
                    step={1}
                    min={0}
                    max={360}
                    onChange={handleRotateChange}
                  />
                </div>
              )}
            </div>

            {/* Buttons to get and download edited image */}
            {image && (
              <div>
                <Button
                  onClick={handleSaveImage}
                  variant="contained"
                  color="success"
                >
                  Save Edited Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default imageEditor;
