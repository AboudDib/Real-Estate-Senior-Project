import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
       {/* Set the default route to the Login page */}
       <Route path="/" element={<HomePage />} />
       <Route path="/home" element={<HomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
