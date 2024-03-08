import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import ImageUiSelector from "./components/imageUiSelector";
import ImageCropperEditor from "./components/imageCropperEditor";
import { Route, Routes } from "react-router";

function App() {
  // const [imageUrl, setImageUrl] = useState("");
  // const [cropState, setCropState] = useState(false);
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [croppedImage, setCroppedImage] = useState("");
  // const [croppedImagePixel, setCroppedImagePixel] = useState("");
  // const [isCroppedImageReady, setIsCroppedImageReady] = useState(false);
  // const canvasRef = useRef(null);

  // const onCropComplete = (croppedArea, croppedAreaPixels) => {
  //   console.log(croppedArea, croppedAreaPixels);
  //   setCroppedImagePixel(croppedAreaPixels);
  // };

  // const imageUploader = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setImageUrl(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const createImage = (url) =>
  //   new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.addEventListener("load", () => resolve(image));
  //     image.addEventListener("error", (error) => reject(error));
  //     image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
  //     image.src = url;
  //   });

  // const saveCroppedImage = () => {
  //   // async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  //   const getCropImage = async () => {
  //     const image = await createImage(imageUrl);
  //     const pixelCrop = croppedImagePixel;
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");

  //     const maxSize = Math.max(image.width, image.height);
  //     const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  //     // set each dimensions to double largest dimension to allow for a safe area for the
  //     // image to rotate in without being clipped by canvas context
  //     canvas.width = safeArea;
  //     canvas.height = safeArea;

  //     // translate canvas context to a central location on image to allow rotating around the center.
  //     ctx.translate(safeArea / 2, safeArea / 2);
  //     // ctx.rotate(getRadianAngle(rotation))
  //     ctx.translate(-safeArea / 2, -safeArea / 2);

  //     // draw rotated image and store data.
  //     ctx.drawImage(
  //       image,
  //       safeArea / 2 - image.width * 0.5,
  //       safeArea / 2 - image.height * 0.5
  //     );
  //     const data = ctx.getImageData(0, 0, safeArea, safeArea);

  //     // set canvas width to final desired crop size - this will clear existing context
  //     canvas.width = pixelCrop.width;
  //     canvas.height = pixelCrop.height;

  //     // paste generated rotate image with correct offsets for x,y crop values.
  //     ctx.putImageData(
  //       data,
  //       Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
  //       Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  //     );

  //     return new Promise((resolve) => {
  //       canvas.toBlob((file) => {
  //         resolve(URL.createObjectURL(file));
  //       }, "image/jpeg");
  //     });
  //   };
  // const imageCropped=  getCropImage()
  // setCroppedImage(imageCropped)
  // };

  // return (
  //   <div
  //     style={{
  //       width: "100vw",
  //       height: "100vh",
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //     }}
  //   >
  //     {!cropState && (
  //       <img src={imageUrl} height={"400px"} width={"400px"}></img>
  //     )}
  //     <h1>Image Cropper</h1>
  //     <input type="file" onChange={imageUploader}></input>
  //     <button
  //       onClick={() => {
  //         setCropState(true);
  //       }}
  //     >
  //       Crop
  //     </button>
  //     <button
  //       onClick={() => {
  //         setCropState(false);
  //         saveCroppedImage(); // Call the function to save the cropped image
  //       }}
  //     >
  //       Save Cropped Image
  //     </button>
  //     {cropState && (
  //       <div
  //         style={{
  //           width: "400px",
  //           height: "400px",
  //           position: "fixed",
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%, -50%)",
  //           zIndex: 9999,
  //         }}
  //       >
  //         <Cropper
  //           image={imageUrl}
  //           crop={crop}
  //           zoom={zoom}
  //           aspect={1}
  //           onCropChange={setCrop}
  //           onCropComplete={onCropComplete}
  //           onZoomChange={setZoom}
  //         />
  //       </div>
  //     )}
  //     <canvas ref={canvasRef} style={{ display: "none" }} />
  //     <img src={croppedImage} alt="Cropped Image" /><img src={croppedImage} alt="Cropped Image" />
  //     {/* {isCroppedImageReady && <img src={croppedImage} alt="Cropped Image" />} */}
  //   </div>
  return (
    <Routes>
      <Route path="*" element={<ImageUiSelector />}></Route>
      <Route path="/editor" element={<ImageCropperEditor />}></Route>
    </Routes>
  );
}

export default App;
