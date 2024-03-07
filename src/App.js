import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Cropper from "react-easy-crop";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [cropState, setCropState] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const imageUploader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!cropState&&<img src={imageUrl} height={"400px"} width={"400px"}></img>}
      <h1>Image Cropper</h1>
      <input type="file" onChange={imageUploader}></input>
      <button
        onClick={() => {
          setCropState(true);
        }}
      >
        Crop
      </button>
      <button
        onClick={() => {
          setCropState(false);
          // croppedimageHandler()
        }}
      >
        Save Cropped Image
      </button>
      {cropState && (
        <div style={{ width: "400px", height: "400px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999 }}>
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )}
    </div>
  );
}

export default App;
