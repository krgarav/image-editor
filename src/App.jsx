import { Routes, Route, Navigate, Router } from "react-router-dom";
import Imageeditor from "./Pages/Imageeditor/Imageeditor";
import Templateeditor from "./Pages/Templateeditor/Templateeditor";
import Homepage from "./Pages/Homepage/Homepage";
import ImageCropper from "./Pages/ImageCropper/ImageCropper";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Image Cropper" element={<ImageCropper />} />
        <Route path="Image Merger" element={<Homepage />} />
        <Route path="/imgeditor" element={<Imageeditor />} />
        <Route path="/temeditor" element={<Templateeditor />} />
        <Route path="*" element={<Navigate to="/Image Cropper" />} />
      </Routes>
    </div>
  );
};

export default App;
