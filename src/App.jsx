import { Routes, Route, Navigate, Router } from "react-router-dom";
import Imageeditor from "./Pages/Imageeditor/Imageeditor";
import Templateeditor from "./Pages/Templateeditor/Templateeditor";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import ImageCropper from "./Pages/ImageCropper/ImageCropper";
import DrawerAppBar from "./components/Appbar/Appbar";
function App() {
  return (
    <div>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Image Cropper" element={<ImageCropper />} />
        <Route path="Image Merger" element={<Homepage />} />
        <Route path="/merge" element={<Homepage />} />
        <Route path="/crop" element={<ImageCropper />} />
        <Route path="/imgeditor" element={<Imageeditor />} />
        <Route path="/temeditor" element={<Templateeditor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
