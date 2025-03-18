import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
       {/* Set the default route to the Login page */}
       <Route path="/" element={<HomePage />} />
       <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
