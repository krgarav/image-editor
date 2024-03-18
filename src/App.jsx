import { Routes, Route, Navigate, Router } from "react-router-dom";
import Templateeditor from "./Pages/Templateeditor/Templateeditor";
import Homepage from "./Pages/Homepage/Homepage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Image Merger" element={<Homepage />} />
        <Route path="/temeditor" element={<Templateeditor />} />
        <Route path="*" element={<Navigate to="/Image Merger" />} />
      </Routes>
    </div>
  );
};

export default App;
