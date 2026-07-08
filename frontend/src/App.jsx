import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignupPage from './pages/signupPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import AnalyzerPage from './pages/analyzerPage.jsx';
function App() {
 
return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer  position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"/>
    </>
  )
}

export default App
