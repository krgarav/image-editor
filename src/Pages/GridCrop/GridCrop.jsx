import React, { useState, useRef, useContext, Fragment } from "react";

import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import classes from "./GridCrop.module.css";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import imageContext from "../../store/Image-context";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import pica from "pica";
import { MdDelete } from "react-icons/md";
import DrawerAppBar from "../../components/Appbar/Appbar";
import Cropper from "react-cropper";

const GridCrop = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(0);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();
  const imgctx = useContext(imageContext);
  const [hovered, setHovered] = useState(false);
  const cropperRef = useRef();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const croppedImageArray = imgctx.croppedImages.map((item, index) => {
    const handleDownload = async (imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = async () => {
        const canvas = document.createElement("canvas");

        // Adjust canvas width and height according to image dimensions
        const aspectRatio = img.width / img.height;
        const maxWidth = 600; // Maximum width for the canvas
        const maxHeight = 600; // Maximum height for the canvas

        if (img.width > maxWidth || img.height > maxHeight) {
          if (aspectRatio > 1) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
          } else {
            canvas.width = maxHeight * aspectRatio;
            canvas.height = maxHeight;
          }
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext("2d");
        const resizedImage = await pica().resize(img, canvas, { quality: 3 });
        ctx.drawImage(resizedImage, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "image.jpg";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      };
    };

    const handleDelete = (index) => {
      imgctx.removeFromCroppedImage(index);
    };
    return (
      <div
        key={index}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes["media-container"]}
      >
        {hovered && <div className={classes["div-dimmer"]}></div>}
        {hovered && (
          <div className={classes["icon-wrapper"]}>
            <BsDownload
              className={classes["download-icon"]}
              onClick={() => handleDownload(item.imageUrl)}
            />
            <MdDelete
              className={classes["delete-icon"]}
              onClick={() => handleDelete(index)}
            />
          </div>
        )}
        <CardMedia
          style={{ backgroundSize: "contain", zIndex: "1" }}
          sx={{ height: 140 }}
          image={item.imageUrl}
          title="Image Title"
        />
      </div>
    );
  });
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
    console.log(parseFloat(event.target.value));
    const value = parseFloat(event.target.value);
    if (rotate > value) {
      const val = -value;
      cropperRef.current.cropper.rotate(1);
      setRotate(parseFloat(value));
    } else {
      const val = value;
      cropperRef.current.cropper.rotate(val);
      setRotate(parseFloat(val));
    }
    // cropperRef.current.cropper.rotate(-1);
  };

  // Function to get edited image
  const handleSaveImage = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      imgctx.addToCroppedImages(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
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
  const handleChangeImage = () => {
    setImage(null);
    setScale(0);
    setRotate(0);
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
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <DrawerAppBar activeRoute="Image Cropper" />
      <div className={classes.main_container}>
        <div className={classes.box}>
          {croppedImageArray.length > 0 && (
            <div className={classes.section1}>
              <Card> {croppedImageArray}</Card>
            </div>
          )}
          <div
            className={classes.avatar_container}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {image && (
              <Card style={{display:"flex",justifyContent:"center"}}>
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "80%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
                
              </Card>
            )}
            <br />
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
              <div className={classes.dropbox}>
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
                    step={0.001}
                    min={0}
                    max={6}
                    onChange={handleScaleChange}
                  />

                  <label>Rotate:</label>
                  <Slider
                    defaultValue={0}
                    aria-label="default"
                    valueLabelDisplay="auto"
                    value={rotate}
                    min={0}
                    max={360}
                    step={1}
                    onChange={handleRotateChange}
                  />
                </div>
              )}
            </div>

            {/* Buttons to get and download edited image */}
            {image && (
              <div className={classes["btn-group"]}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleChangeImage}
                >
                  Add another image
                </Button>
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

export default GridCrop;
