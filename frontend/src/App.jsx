import React, { lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './services/privateRoute.jsx';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const AnalyzerPage = lazy(() => import('./pages/AnalyzerPage.jsx'));
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'));
const SavedAnalysisPage = lazy(() => import('./pages/SavedAnalysisPage.jsx'));
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#3ca775] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/analyzer" element={
              <PrivateRoute guestAllowed={true}>
                <AnalyzerPage />
              </PrivateRoute>
            } />
            <Route path="/history" element={
              <PrivateRoute guestAllowed={false}>
                <HistoryPage />
              </PrivateRoute>
            } />
            <Route path="/saved-analysis" element={<SavedAnalysisPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App