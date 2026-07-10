import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumeDropzone from '../components/resumeDropzone.jsx';
import JobDescText from '../components/jobDescText.jsx';
import ToneSelector from '../components/toneSelector.jsx';
import MatchScore from '../components/MatchScore.jsx';
import SkillFeedback from '../components/skillFeedback.jsx';

const AnalyzerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setResults({
        score: 82,
        feedback: {
          keywordsFound: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
          missingSkills: ['TypeScript', 'GraphQL', 'CI/CD Pipelines'],
          recommendations: [
            'Add your experience with TypeScript explicitly under the main project.',
            'Quantify your impact (e.g., "Improved page load speed by 20%").',
            'Align your professional summary closer to the job description keywords.'
          ]
        }
      });
      setLoading(false);
    }, 1500);
  };

  const isActive = (path) => location.pathname === path;

  const baseTabStyle = "text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-[#1C2E24]";
  const activeStyle = "bg-[#EFECE3] font-semibold"; 
  const inactiveStyle = "text-gray-500 hover:text-[#1C2E24]";

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col justify-between font-sans text-[#1C2E24] antialiased selection:bg-[#24A174]/10">  

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-[#FAF9F5]/80 backdrop-blur-md border-b border-[#EBEAE4]/60 z-50 transition-all duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-[#1C2E24] tracking-tight">
            <div className="flex items-center justify-center w-12 h-12 bg-[#42b47e] rounded-[20px] shadow-sm">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V12" />
                <path d="M12 12c0-3.5 2.5-6 6-6 0 2.5-2.5 6-6 6Z" />
                <path d="M12 14c0-3-1.5-5-4.5-5 0 2 1.5 5 4.5 5Z" />
              </svg>
            </div>
            FitCV
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              className={`${baseTabStyle} ${isActive('/analyzer') || location.pathname === '/' ? activeStyle : inactiveStyle}`}
              onClick={() => navigate('/analyzer')}
            >
              Analyzer
            </button>
            <button 
              className={`${baseTabStyle} ${isActive('/history') ? activeStyle : inactiveStyle}`}
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
     <div className="w-full flex-grow flex flex-col items-center px-6 pt-32 pb-16 max-w-6xl mx-auto">
        
        <div className={`w-full ${results ? 'text-left' : 'text-center'} mb-8 transition-all`}>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tight font-normal mb-1">
            {results ? 'Analysis Results' : 'New analysis'}
          </h1>
          <p className="text-xs text-slate-500">
            {results ? 'Review how well your resume matches the role.' : 'Drop your resume, paste the role — we’ll do the rest.'}
          </p>
        </div>

        {/* Responsive Flex/Grid Workspace */}
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Left Column (Form) */}
          <form onSubmit={handleSubmit} className={`flex flex-col gap-5 w-full ${results ? 'lg:w-[45%]' : 'max-w-xl'}`}>
            <ResumeDropzone />
            <JobDescText />
            <ToneSelector />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3ca775] hover:bg-[#328e62] disabled:bg-slate-400 text-white text-sm font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  Generate
                </>
              )}
            </button>
          </form>

          {/* Right Column (Results) */}
          {results && (
            <div className="w-full lg:w-[55%] flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <MatchScore score={results.score} />
              <SkillFeedback data={results.feedback} />
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#EBEAE4] py-8 text-center bg-[#FAF9F5]">
        <p className="text-[13px] text-gray-400 font-normal tracking-wide">
          © 2026 FitCV. Made with care.
        </p>
      </footer>

    </div>
  );  
};

export default AnalyzerPage;