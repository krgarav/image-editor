import React, { useState, useRef, useContext, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import classes from "./Imageeditor.module.css";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import imageContext from "../../store/Image-context";
import { useLocation, useNavigate } from "react-router-dom";
const imageEditor = () => {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();
  const imgctx = useContext(imageContext);
  const navigate = useNavigate();
  const location = useLocation()
  // Function to handle file input change
  useEffect(()=>{
  },[])
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

  // Function to download edited image
  // const handleDownloadImage = () => {
  //   if (editedImage) {
  //     // Create a temporary anchor element
  //     const link = document.createElement("a");
  //     link.href = editedImage;
  //     link.download = "edited_image.png"; // Set the download attribute
  //     document.body.appendChild(link);

  //     // Trigger the download
  //     link.click();

  //     // Clean up
  //     document.body.removeChild(link);
  //   }
  // };
  // Function to get edited image
  const handleSaveImage = () => {
    if (editorRef.current) {
      // console.log(editorRef.current);
      const canvas = editorRef.current.getImage();
      console.log(canvas);
      setEditedImage(canvas.toDataURL()); // Convert canvas to data URL
      // console.log(location.state.index,canvas.toDataURL())
      imgctx.addToEditedImage(location.state.index,canvas.toDataURL());
      navigate("/temeditor");
    }
  };
  const rotateLeftHandler = () => {
    // setRotateAngle(newRotationAngle);
    setRotate((prev) => {
      if (prev === 0) {
        return (prev = 360);
      } else {
        return prev - 90;
      }
    });
  };
  const rotateRightHandler = () => {
    // setRotateAngle(newRotationAngle);
    setRotate((prev) => {
      if (prev === 360) {
        return (prev = 0);
      } else {
        return prev + 90;
      }
    });
  };
  return (
    <div className={classes.main_container}>
      <div className={classes.avatar_container}>
        {image && (
          <Card>
            <AvatarEditor
              image={image}
              width={800}
              height={500}
              scale={scale}
              rotate={rotate}
              onScaleChange={handleScaleChange}
              onRotateChange={handleRotateChange}
              ref={editorRef}
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
        <div>
          <Button onClick={handleSaveImage} variant="contained" color="success">
            Save Edited Image
          </Button>

          {/* <button onClick={handleDownloadImage} disabled={!editedImage}>
          Download Edited Image
        </button> */}
        </div>

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
  );
};

export default imageEditor;
