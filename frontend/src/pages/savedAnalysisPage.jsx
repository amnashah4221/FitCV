import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SavedAnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the dynamic data passed during navigation (e.g., navigate('/saved-analysis', { state: { ... } }))
  const { analysis } = location.state || {};

  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Fallback / Redirect if no analysis data is found in state
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 

  },[])
  if (!analysis) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen flex flex-col items-center justify-center font-sans text-[#1C2E24] antialiased">
        <p className="text-sm text-slate-500 mb-4">No active analysis found.</p>
        <button 
          onClick={() => navigate('/analyzer')}
          className="bg-[#3ca775] text-white hover:bg-[#328e62] transition-all px-5 py-2 rounded-full font-medium text-sm"
        >
          Go to Analyzer
        </button>
      </div>
    );
  }

  // Extract variables dynamically based on your schema structure from Analyzer and History
  const companyName = analysis.company || 'Analysis';
  const roleName = analysis.role || 'Job Description';
  const matchScore = analysis.matchScore || 0;
  const coverLetterText = analysis.coverLetter || '';
  
  // Format dates cleanly like your history page
  const dateStr = analysis.createdAt 
    ? new Date(analysis.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }) 
    : new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

  // Align skills fields with API response naming conventions in your code
  const matchedSkills = analysis.matchedSkills || analysis.skillsResult?.matchedSkills || [];
  const missingSkills = analysis.missingSkills || analysis.skillsResult?.missingSkills || [];
  const bonusSkills = analysis.bonusSkills || analysis.skillsResult?.bonusSkills || [];

  const handleCopy = () => {
    if (!coverLetterText) return;
    navigator.clipboard.writeText(coverLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isGuest')
  navigate('/')
}

  const handleDownload = () => {
    if (!coverLetterText) return;
    const element = document.createElement("a");
    const file = new Blob([coverLetterText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${companyName.toLowerCase().replace(/\s+/g, '-')}-cover-letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col justify-between font-sans text-[#1C2E24] antialiased selection:bg-[#24A174]/10">
      
      {/* Navbar (Keeps navigation design matching your navbar) */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-[#FAF9F5]/80 backdrop-blur-md border-b border-[#EBEAE4]/60 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-[#1C2E24] tracking-tight">
            <div className="flex items-center justify-center w-12 h-12 bg-[#42b47e] rounded-[20px] shadow-sm">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" onClick={() => navigate('/')}>
                <path d="M12 22V12" />
                <path d="M12 12c0-3.5 2.5-6 6-6 0 2.5-2.5 6-6 6Z" />
                <path d="M12 14c0-3-1.5-5-4.5-5 0 2 1.5 5 4.5 5Z" />
              </svg>
            </div>
            FitCV
          </div>

          <div className="flex items-center gap-6">
            <button 
              className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-gray-500 hover:text-[#1C2E24]`} 
              onClick={() => navigate('/analyzer')}
            >
              Analyzer
            </button>
            <button 
              className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-gray-500 hover:text-[#1C2E24]`} 
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
          
          {isLoggedIn && (
            <>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-rose-500 transition-colors px-2 py-1.5 rounded-lg cursor-pointer"
            >
              Logout
            </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full flex-grow flex flex-col px-6 pt-32 pb-16 max-w-4xl mx-auto">
        
        {/* Back navigation action */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-[#1C2E24] transition-all self-start mb-8 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Header Grid */}
        <div className="flex justify-between items-end w-full mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Saved Analysis
            </span>
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-[#1C2E24] mt-1">
              {companyName}
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2">
              {roleName} &middot; {dateStr}
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
              Match Score
            </span>
            <span className="font-serif text-5xl md:text-6xl text-[#24A174] font-normal tracking-tight">
              {matchScore}<span className="text-3xl md:text-4xl">%</span>
            </span>
          </div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="w-full bg-[#EBEAE4] h-1.5 rounded-full overflow-hidden mb-12">
          <div 
            className="bg-[#24A174] h-full rounded-full transition-all duration-500" 
            style={{ width: `${matchScore}%` }} 
          />
        </div>

        {/* Cover Letter Panel Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl text-[#1C2E24]">
            Cover letter
          </h2>
          
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 border border-[#E5E3D8] hover:bg-[#EFECE3]/30 text-xs font-semibold px-4 py-1.5 rounded-[10px] shadow-xs transition duration-200 text-slate-700 bg-white cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-1.5 border border-[#E5E3D8] hover:bg-[#EFECE3]/30 text-xs font-semibold px-4 py-1.5 rounded-[10px] shadow-xs transition duration-200 text-slate-700 bg-white cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              .txt
            </button>
          </div>
        </div>

        {/* Render Cover Letter Text */}
        <div className="border border-[#EBEAE4] bg-[#FCFBF9]/65 rounded-[22px] p-8 md:p-10 shadow-xs mb-14">
          <div className="font-serif leading-relaxed text-[#1C2E24]/90 text-[15px] space-y-5 whitespace-pre-wrap">
            {coverLetterText || <span className="italic text-slate-400">No cover letter generated for this analysis.</span>}
          </div>
        </div>

        {/* Skills Breakdown Grid */}
        <h2 className="font-serif text-2xl text-[#1C2E24] mb-5">
          Skills breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Matched Skills */}
          <div className="border border-[#EBEAE4] bg-[#FCFBF9]/65 rounded-[22px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#107C41] text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-[#1B704C]">Matched</span>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{matchedSkills.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#EFECE3]/30 border border-[#E5E3D8] text-[#1C2E24]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-slate-400">None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Missing Skills */}
          <div className="border border-[#EBEAE4] bg-[#FCFBF9]/65 rounded-[22px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#D35249] text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-[#D35249]">Missing</span>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{missingSkills.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#EFECE3]/30 border border-[#E5E3D8] text-[#1C2E24]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-slate-400">None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Bonus Skills */}
          <div className="border border-[#EBEAE4] bg-[#FCFBF9]/65 rounded-[22px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#C58B12] text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-[#C58B12]">Bonus</span>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{bonusSkills.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {bonusSkills.length > 0 ? (
                  bonusSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#EFECE3]/30 border border-[#E5E3D8] text-[#1C2E24]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-slate-400">None detected</span>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#EBEAE4] py-8 text-center bg-[#FAF9F5]">
        <p className="text-[13px] text-gray-400">© 2026 FitCV. Made with care.</p>
      </footer>
    </div>
  );
};

export default SavedAnalysisPage;