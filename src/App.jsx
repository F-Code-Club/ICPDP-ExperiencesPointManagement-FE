import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Layout from "./layouts/Layout";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="movement-point" element={<div>Điểm phong trào</div>} />
        <Route path="final-grade" element={<div>Điểm tổng kết</div>} />
        <Route
          path="student-management"
          element={<div>Quản lí sinh viên</div>}
        />
        <Route path="club-management" element={<div>Quản lí câu lạc bộ</div>} />
        <Route
          path="department-management"
          element={<div>Quản lí phòng ban</div>}
        />
        <Route path="semester-management" element={<div>Quản lí kì học</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
