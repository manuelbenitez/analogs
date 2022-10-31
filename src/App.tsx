import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Menu from "./components/menu/menu";
import Home from "./pages/home";
import Japan from "./pages/japan";
function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/japan" element={<Japan />} />
          <Route path="/austria" element={<Japan />} />
          <Route path="/new-zealand" element={<Japan />} />
          <Route path="/spain" element={<Japan />} />
          <Route path="/random" element={<Japan />} />
          <Route path="/argentina" element={<Japan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
