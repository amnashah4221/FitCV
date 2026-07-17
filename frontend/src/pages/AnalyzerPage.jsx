import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumeDropzone from '../components/resumeDropzone.jsx';
import JobDescText from '../components/jobDescText.jsx';
import ToneSelector from '../components/toneSelector.jsx';
import MatchScore from '../components/MatchScore.jsx';
import SkillFeedback from '../components/skillFeedback.jsx';
import api from '../services/api.js';

const AnalyzerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [skillsResult, setSkillsResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path;
  const baseTabStyle = "text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-[#1C2E24]";
  const activeStyle = "bg-[#EFECE3] font-semibold";
  const inactiveStyle = "text-gray-500 hover:text-[#1C2E24]";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

     if (!file) return setError('Please upload your resume PDF.');
    if (!jobDescription.trim()) return setError('Please paste the job description.');

    setLoading(true);
    setCoverLetter('');
    setSkillsResult(null);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('resume', file);
      }
      formData.append('jobDescription', jobDescription);
      formData.append('tone', tone);

      const token = localStorage.getItem('token');

      // ── Cover letter streaming ──
      const response = await fetch('http://localhost:5000/api/cover-letter/generate', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate cover letter');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        lines.forEach((line) => {
          if (line.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.text) {
                fullText += parsed.text;
                setCoverLetter(fullText);
              }
            } catch {}
          }
        });
      }

      
      // ── Skills match ──
      const matchFormData = new FormData();
      if (file) {
        matchFormData.append('resume', file);
      }
      matchFormData.append('jobDescription', jobDescription);

      const matchRes = await api.post('/match/matchSkills', matchFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const skillsData = matchRes.data.data;

      setSkillsResult(skillsData);

      navigate('/saved-analysis', {
        state: {
          analysis: {
            company: skillsData.company || "Company", 
            role: skillsData.role || "Job Description", 
            matchScore: skillsData.matchScore || 0,
            coverLetter: fullText,
            matchedSkills: skillsData.matchedSkills,
            missingSkills: skillsData.missingSkills,
            bonusSkills: skillsData.bonusSkills,
            createdAt: new Date().toISOString()
          }
        }
      });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
  const token = localStorage.getItem('token');
  setIsLoggedIn(!!token);
}, []);

  const hasResults = coverLetter || skillsResult;

  const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isGuest')
  navigate('/')
}
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col justify-between font-sans text-[#1C2E24] antialiased selection:bg-[#24A174]/10">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-[#FAF9F5]/80 backdrop-blur-md border-b border-[#EBEAE4]/60 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-[#1C2E24] tracking-tight">
            <div className="flex items-center justify-center w-12 h-12 bg-[#42b47e] rounded-[20px] shadow-sm">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" onClick={()=> navigate('/')}>
                <path d="M12 22V12" />
                <path d="M12 12c0-3.5 2.5-6 6-6 0 2.5-2.5 6-6 6Z" />
                <path d="M12 14c0-3-1.5-5-4.5-5 0 2 1.5 5 4.5 5Z" />
              </svg>
            </div>
            FitCV
          </div>

          <div className="flex items-center gap-6">
            <button
              className={`${baseTabStyle} ${isActive('/analyzer') ? activeStyle : inactiveStyle}`}
              onClick={() => navigate('/analyzer')}
            >Analyzer</button>
            <button
              className={`${baseTabStyle} ${isActive('/history') ? activeStyle : inactiveStyle}`}
              onClick={() => navigate('/history')}
            >History</button>
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

      {/* Main */}
      <div className="w-full flex-grow flex flex-col items-center px-6 pt-32 pb-16 max-w-6xl mx-auto">

        <div className={`w-full ${hasResults ? 'text-left' : 'text-center'} mb-8`}>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tight font-normal mb-1">
            {hasResults ? 'Analysis Results' : 'New analysis'}
          </h1>
          <p className="text-xs text-slate-500">
            {hasResults ? 'Review how well your resume matches the role.' : "Drop your resume, paste the role — we'll do the rest."}
          </p>
        </div>

        {error && (
          <div className="w-full max-w-xl mb-4 px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">

          {/* Left */}
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-5 w-full ${hasResults ? 'lg:w-[45%]' : 'max-w-xl'}`}
          >
            <ResumeDropzone file={file} onFileChange={setFile} />
            <JobDescText value={jobDescription} onChange={setJobDescription} />
            <ToneSelector selectedTone={tone} onToneChange={setTone} />

            <button
              type="submit"
              disabled={loading || !file || !jobDescription.trim()}
              className="w-full bg-[#3ca775] hover:bg-[#328e62] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Analyzing...
                </span>
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

          {/* Right */}
          {hasResults && (
            <div className="w-full lg:w-[55%] flex flex-col gap-5">

              {loading && !coverLetter && (
                <div className="bg-white border border-[#EBEAE4] rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                  </div>
                </div>
              )}

              {coverLetter && (
                <div className="bg-white border border-[#EBEAE4] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-lg font-semibold text-slate-900">Cover Letter</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(coverLetter)}
                      className="text-xs text-[#3ca775] hover:underline"
                    >Copy</button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {coverLetter}
                  </p>
                </div>
              )}

              {skillsResult && (
                <>
                  <MatchScore score={skillsResult.matchScore} />
                  <SkillFeedback feedback={{
                    keywordsFound: skillsResult.matchedSkills,
                    missingSkills: skillsResult.missingSkills,
                    bonusSkills: skillsResult.bonusSkills,
                  }} />
                </>
              )}

            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#EBEAE4] py-8 text-center bg-[#FAF9F5]">
        <p className="text-[13px] text-gray-400">© 2026 FitCV. Made with care.</p>
      </footer>
    </div>
  );
};

export default AnalyzerPage;