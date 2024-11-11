import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BookPage from "./Pages/BookPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:category" element={<BookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
