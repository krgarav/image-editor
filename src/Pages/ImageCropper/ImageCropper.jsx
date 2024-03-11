import React, { useState, useRef, useContext } from "react";
import AvatarEditor from "react-avatar-editor";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import classes from "./ImageCropper.module.css";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import imageContext from "../../store/Image-context";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import pica from "pica";
import { MdDelete } from "react-icons/md";

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();
  const imgctx = useContext(imageContext);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const navigate = useNavigate();
  // Function to handle file input change

  const croppedImageArray = imgctx.croppedImages.map((item, index) => {
    // const handleDownload = (imageUrl) => {
    //   const link = document.createElement("a");
    //   link.href = imageUrl;
    //   link.download = "image.jpg";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // };
    // const handleDownload = (imageUrl) => {
    //   // Create a new image element
    //   const img = new Image();

    //   // Set the src attribute to the imageUrl
    //   img.src = imageUrl;

    //   // Once the image is loaded
    //   img.onload = () => {
    //     // Create a canvas element
    //     const canvas = document.createElement("canvas");

    //     // Set canvas size to 400x400 pixels
    //     canvas.width = 1920;
    //     canvas.height = 1080;

    //     // Get the 2d drawing context of the canvas
    //     const ctx = canvas.getContext("2d");

    //     // Draw the image onto the canvas at 0,0 with width and height of 400
    //     ctx.drawImage(img, 0, 0, 1920, 1080);

    //     // Convert the canvas content to a data URL
    //     const dataURL = canvas.toDataURL("image/jpeg");

    //     // Create a link element to trigger the download
    //     const link = document.createElement("a");
    //     link.href = dataURL;
    //     link.download = "image.jpg";

    //     // Append the link to the document body and trigger a click event
    //     document.body.appendChild(link);
    //     link.click();

    //     // Clean up by removing the link from the document body
    //     document.body.removeChild(link);
    //   };
    // };

    const handleDownload = async (imageUrl) => {
      // Create a new image element
      const img = new Image();

      // Set the src attribute to the imageUrl
      img.src = imageUrl;

      // Once the image is loaded
      img.onload = async () => {
        // Create a canvas element
        const canvas = document.createElement("canvas");

        // Set canvas size to 400x400 pixels
        canvas.width = 600;
        canvas.height = 600;

        // Get the 2d drawing context of the canvas
        const ctx = canvas.getContext("2d");

        // Use pica to resize the image
        const resizedImage = await pica().resize(img, canvas, { quality: 3 });

        // Draw the resized image onto the canvas
        ctx.drawImage(resizedImage, 0, 0);

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL("image/jpeg");

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "image.jpg";

        // Append the link to the document body and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link from the document body
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

        {/* <img src={item.imageUrl} width="400px" height="400px" style={{zIndex:1}}  /> */}
        <CardMedia
          style={{ backgroundSize: "cover", zIndex: "1" }}
          sx={{ height: 140 }}
          image={item.imageUrl}
          title="Image Title"
        />
      </div>
    );
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
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
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();

      imgctx.addToCroppedImages(canvas.toDataURL());
    }
  };
  const rotateLeftHandler = () => {
    setRotate((prev) => {
      if (prev === 0) {
        return (prev = 360);
      } else {
        return prev - 90;
      }
    });
  };
  const rotateRightHandler = () => {
    setRotate((prev) => {
      if (prev === 360) {
        return (prev = 0);
      } else {
        return prev + 90;
      }
    });
  };
  const handleChangeImage = () => {
    setImage(null);
    setScale(1);
    setRotate(0);
  };
  return (
    <div className={classes.main_container}>
      <div className={classes.box}>
        {croppedImageArray.length > 0 && (
          <div className={classes.section1}>
            <Card> {croppedImageArray}</Card>
          </div>
        )}
        <div className={classes.avatar_container}>
          {image && (
            <Card>
              <AvatarEditor
                image={image}
                width={600}
                height={300}
                scale={scale}
                rotate={rotate}
                onScaleChange={handleScaleChange}
                onRotateChange={handleRotateChange}
                ref={editorRef}
                showGrid={false}
                crossOrigin="anonymous"
                style={{ position: "relative" }}
              />
                {/* Grid overlay */}
                {/* <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "1px solid rgba(0, 0, 0, 0.5)", // Border color of the grid lines
                    boxSizing: "border-box",
                    backgroundSize: "20px 20px", // Adjust size of the grid squares
                    backgroundImage:
                      "linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)", // Create the grid pattern
                  }}
                ></div>
              */}
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

          {/* Display the edited image */}

          {/* {editedImage && (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            className={classes.media}
            image={editedImage}
            title="Image Title"
          />
        </Card>
      )} */}
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
