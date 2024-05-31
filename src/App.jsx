import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/transcripts/experience-point"
            element={<div>Điểm phong trào</div>}
          />
          <Route
            path="/transcripts/final-point"
            element={<div>Điểm tổng kết</div>}
          />
          <Route
            path="/settings/students"
            element={<div>Quản lí sinh viên</div>}
          />
          <Route
            path="/settings/clubs"
            element={<div>Quản lí câu lạc bộ</div>}
          />
          <Route
            path="/settings/departments"
            element={<div>Quản lí phòng ban</div>}
          />
          <Route
            path="/settings/semesters"
            element={<div>Quản lí kì học</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
