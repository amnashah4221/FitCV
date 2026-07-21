import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api.js';

const HistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTone, setSelectedTone] = useState('All tones');
  const [expandedId, setExpandedId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Nav styles alignment
  const isActive = (path) => location.pathname === path;
  const baseTabStyle = "text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-[#1C2E24]";
  const activeStyle = "bg-[#EFECE3] font-semibold";
  const inactiveStyle = "text-gray-500 hover:text-[#1C2E24]";

  
  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/history');
      setHistoryItems(res.data.history || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load analysis history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
      const result = await Swal.fire({
      title: "Delete Analysis?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if(!result.isConfirmed) return;
    try {
        await api.delete(`/history/${id}`);
        setHistoryItems((prev) =>
      prev.filter((item) => item._id !== id)
    );

    if (expandedId === id) {
      setExpandedId(null);
    }

    Swal.fire({
      title: "Deleted!",
      text: "Analysis has been deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
      } catch (err) {
        console.error("Delete analysis failed:", err);

        Swal.fire({
      title: "Error!",
      text: "Failed to delete analysis.",
      icon: "error",
      confirmButtonColor: "#ef4444",
    });
      
}
  };
  const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isGuest')
  navigate('/')
}

  const filteredHistory = useMemo(() => {
    return historyItems.filter(item => {
      const company = item.company || '';
      const role = item.role || '';
      const toneValue = item.tone || 'professional';

      const matchesSearch = 
        company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTone = 
        selectedTone === 'All tones' || 
        toneValue.toLowerCase() === selectedTone.toLowerCase();
      
      return matchesSearch && matchesTone;
    });
  }, [historyItems, searchQuery, selectedTone]);

  const averageMatch = useMemo(() => {
    if (filteredHistory.length === 0) return 0;
    const total = filteredHistory.reduce((acc, curr) => acc + (curr.matchScore || 0), 0);
    return Math.round(total / filteredHistory.length);
  }, [filteredHistory]);

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col justify-between font-sans text-[#1C2E24] antialiased selection:bg-[#24A174]/10">
      
      {/* Navbar */}
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
            <button className={`${baseTabStyle} ${isActive('/analyzer') ? activeStyle : inactiveStyle}`} onClick={() => navigate('/analyzer')}>Analyzer</button>
            <button className={`${baseTabStyle} ${isActive('/history') ? activeStyle : inactiveStyle}`} onClick={() => navigate('/history')}>History</button>

          </div>

          {isLoggedIn && (
             <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-rose-500 transition-colors px-2 py-1.5 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <div className="w-full flex-grow flex flex-col px-6 pt-32 pb-16 max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 w-full">
          <div>
            <h1 className="font-serif text-4xl md:text-[64px] tracking-tight leading-[1.1] w-full max-w-4xl mb-6">
                History
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {loading ? 'Loading metadata...' : `${filteredHistory.length} analyses · ${averageMatch}% average match`}
            </p>
          </div>
          <button 
            onClick={() => navigate('/analyzer')}
            className="flex items-center gap-2 bg-[#3ca775] text-white hover:bg-[#328e62] transition-all px-5 py-2.5 rounded-full font-medium text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg> 
            New analysis
          </button>
        </div>

        {error && (
          <div className="w-full mb-6 px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Filter Management Bar */}
        <div className="flex gap-4 mb-6 w-full items-center">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#EBEAE4] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3ca775] transition shadow-sm"
            />
          </div>
          
          {/* Sized & Standardized Dropdown Select Wrapper */}
          <div className="relative min-w-[140px] max-w-[160px]">
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="appearance-none w-full bg-white border border-[#EBEAE4] rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#3ca775] cursor-pointer font-medium text-slate-700 shadow-sm"
            >
              <option value="All tones">All tones</option>
              <option value="Professional">Professional</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Concise">Concise</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 w-full">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#EBEAE4] rounded-2xl h-20 animate-pulse w-full" />
            ))
          ) : filteredHistory.map((item) => {
            const isExpanded = expandedId === item._id;
            const companyName = item.company || 'Unknown Company';
            const roleName = item.role || 'Specified Role';
            const score = item.matchScore || 0;
            const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            }) : 'Recent';

            return (
              <div 
                key={item._id}
                className={`bg-white border rounded-[22px] transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-slate-800 shadow-sm' : 'border-[#EBEAE4] hover:border-slate-300'
                }`}
              >
                {/* Header Interactive Row */}
                <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : item._id)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#D4ECE1] text-[#1C2E24] flex items-center justify-center font-semibold text-base">
                      {companyName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-slate-900">
                        {companyName} <span className="text-slate-500 font-normal">· {roleName}</span>
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{dateStr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-10">
                    <div className="text-right hidden sm:block">
                      <div className="w-24 bg-[#EBEAE4] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#3ca775] h-full rounded-full" style={{ width: `${score}%` }} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 inline-block">
                        {score}% match
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl font-medium text-[#1C2E24] w-10 text-right">
                        {score}%
                      </span>
                      {isExpanded ? (
                        <svg className="text-slate-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="text-slate-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>

                {/* Sub-drawer Inner Accordion Module */}
                {isExpanded && (
                  <div className="px-6 pb-5 pt-3 border-t border-[#F5F4EE] bg-[#FCFBF9]">
                    <div className="mt-2">
                      <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Skills Evaluation</h4>
                      <div className="flex flex-wrap gap-1.5 max-w-3xl">
                        {item.matchedSkills?.map((skill, index) => (
                          <span key={`match-${skill}`} className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                            {skill}
                          </span>
                        ))}
                        {item.missingSkills?.map((skill, index) => (
                          <span key={`miss-${skill}`} className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 font-medium">
                            {skill}
                          </span>
                        ))}
                        {(!item.matchedSkills?.length && !item.missingSkills?.length) && (
                          <span className="text-xs italic text-slate-400">No skill data cached.</span>
                        )}
                      </div>
                    </div>

                    {/* Cleaned Actions Footer Layer */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#EDEBE4]">
                      {/* Left Side: Dynamic action buttons */}
                      <div className="flex gap-2.5">
                        <button 
                          onClick={() => navigate('/saved-analysis', {state: {analysis: item}})}
                          className="flex items-center gap-1.5 bg-white border border-[#DEDCD4] hover:bg-slate-50 text-xs font-medium px-4 py-2 rounded-full shadow-sm transition text-slate-700"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Open full result
                        </button>
                      </div>
                      
                      {/* Right Side: Delete */}
                      <button 
                        onClick={(e) => handleDelete(item._id, e)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-rose-600 transition px-2 py-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete record
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!loading && filteredHistory.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#DEDCD4] rounded-2xl bg-white/50">
              <p className="text-sm text-slate-400">No history documents match your filters.</p>
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

export default HistoryPage;