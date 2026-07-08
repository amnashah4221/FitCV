import React from 'react';
import {useNavigate} from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col justify-between font-sans text-[#1C2E24] antialiased selection:bg-[#24A174]/10">  

        <nav className="fixed top-0 left-0 right-0 w-full bg-[#FAF9F5]/80 backdrop-blur-md border-b border-[#EBEAE4]/60 z-50 transition-all duration-200">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-[#1C2E24] tracking-tight">
              <div className="flex items-center justify-center w-12 h-12 bg-[#42b47e] rounded-[20px] shadow-sm mb-6">
          <svg 
            className="w-8 h-8 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 22V12" />
            <path d="M12 12c0-3.5 2.5-6 6-6 0 2.5-2.5 6-6 6Z" />
            <path d="M12 14c0-3-1.5-5-4.5-5 0 2 1.5 5 4.5 5Z" />
          </svg>
        </div>
              FitCV
            </div>
            
            <div className="flex items-center gap-6">
              <button className="text-sm font-medium text-gray-500 hover:text-[#1C2E24] transition-colors cursor-pointer" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="bg-[#24A174] hover:bg-[#1E8761] text-white text-xs font-medium px-4 py-2 rounded-full cursor-pointer shadow-sm transition-all hover:shadow active:scale-95" onClick={() => navigate('/signup')}>
                Register
              </button>
            </div>
          </div>
        </nav>

        <div className="w-full flex-grow flex flex-col items-center px-4 pt-32 pb-16">
            
            <section className="max-w-5xl mx-auto text-center flex flex-col items-center mb-16">
                
                <div className="inline-flex items-center gap-1.5 bg-white border border-[#EBEAE4] rounded-full px-3 py-1 text-[11px] md:text-xs font-medium text-gray-500 shadow-sm mb-8">
                  <span className="text-emerald-600 text-xs">↗</span>
                  Smarter applications, less guesswork
                </div>

                <h1 className="font-serif text-4xl md:text-[64px] tracking-tight leading-[1.1] w-full max-w-4xl mb-6">
                  <span className="block md:inline md:whitespace-nowrap text-[#1C2E24]">Tailor your resume to any job,</span>
                  <span className="block text-[#239970] italic font-normal mt-1">in one click.</span>
                </h1>

                <h3 className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-normal">
                  FitCV reads your resume, studies the job post, and writes a cover letter that 
                  actually sounds like you — with a skills match you can trust.
                </h3>

                <div className="flex flex-row items-center justify-center gap-4 mb-5">
                  <button className="bg-[#24A174] hover:bg-[#1E8761] text-white text-sm font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer" onClick={() => navigate('/demo')}>
                      Explore as Guest <span className="text-xs">➔</span>
                  </button>

                  <button className="bg-white border border-[#EBEAE4] hover:bg-gray-50 text-[#1C2E24] text-sm font-medium px-7 py-3 rounded-full transition-all shadow-sm cursor-pointer" onClick={() => navigate('/login')}>
                      Sign in
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] md:text-xs text-gray-500 font-medium">
                  <p className="flex items-center gap-1">
                      <span className="text-[#24A174]">✓</span> No credit card
                  </p>
                  <p className="flex items-center gap-1">
                      <span className="text-[#24A174]">✓</span> Guest demo
                  </p>
                </div>

            </section>

            <section className="w-full max-w-4xl mx-auto px-4 mb-24">
              <div className="bg-[#FCFBF7] border border-[#EBEAE4] rounded-[20px] shadow-[0_12px_44px_rgba(28,46,36,0.035)] overflow-hidden">
                <div className="bg-[#FAF9F5] border-b border-[#EBEAE4] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E76E55]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#F5BF4F]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#60C454]"></span>
                  </div>
                  <div className="text-gray-400 text-xs font-mono tracking-tight select-none">fitcv.app / analyzer</div>
                  <div className="w-12"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 text-left divide-y md:divide-y-0 md:divide-x divide-[#EBEAE4]">
                  <div className="p-8 md:p-10 flex flex-col justify-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2 block">JOB POST</span>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1C2E24] leading-tight mb-6">Senior Product Engineer — Linear</h2>
                    <ul className="flex flex-col gap-3 text-sm font-medium text-[#1C2E24]">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#24A174]"></span>5+ years TypeScript</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#24A174]"></span>Design-driven thinking</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#24A174]"></span>Realtime systems</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#24A174]"></span>Empathy for craft</li>
                    </ul>
                  </div>

                  <div className="p-8 md:p-10 bg-[#FAF9F5]/40 flex flex-col justify-between gap-8">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">MATCH SCORE</span>
                        <span className="font-serif text-3xl md:text-4xl text-[#239970] italic font-normal">87%</span>
                      </div>
                      <div className="w-full bg-[#EBEAE4] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#24A174] h-full rounded-full w-[87%]"></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2 block">COVER LETTER</span>
                      <p className="font-serif italic text-sm md:text-[15px] leading-relaxed text-[#1C2E24]/80 text-justify">
                        "Dear Linear team, I've spent the last six years building tools that designers and engineers love to live in. Realtime, sharp typography, zero patience for friction — your work speaks my language..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border border-[#F2F1EC] rounded-[24px] p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col items-center gap-5 min-h-[250px]">
                    <div className="w-11 h-11 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#24A174] shrink-0 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-serif text-[24px] text-[#1C2E24] tracking-tight leading-tight">Tailored cover letters</h4>
                        <p className="text-gray-500 text-[14px] leading-relaxed font-normal mt-2">Three tones, one voice — yours. Streamed live so you can edit on the fly.</p>
                    </div>
                </div>

                <div className="bg-white border border-[#F2F1EC] rounded-[24px] p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col items-center gap-5 min-h-[250px]">
                    <div className="w-11 h-11 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#24A174] shrink-0 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-serif text-[24px] text-[#1C2E24] tracking-tight leading-tight">Skills match</h4>
                        <p className="text-gray-500 text-[14px] leading-relaxed font-normal mt-2">Matched, missing, and bonus skills. A score you can act on, not just stare at.</p>
                    </div>
                </div>

                <div className="bg-white border border-[#F2F1EC] rounded-[24px] p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col items-center gap-5 min-h-[250px]">
                    <div className="w-11 h-11 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#24A174] shrink-0 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21L7.188 15.904L2 15L7.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-serif text-[24px] text-[#1C2E24] tracking-tight leading-tight">Chrome extension</h4>
                        <p className="text-gray-500 text-[14px] leading-relaxed font-normal mt-2">Tailor in seconds without ever leaving the job board.</p>
                    </div>
                </div>
            </section>

        </div>

        <footer className="w-full border-t border-[#EBEAE4] py-8 text-center bg-[#FAF9F5]">
          <p className="text-[13px] text-gray-400 font-normal tracking-wide">
            © 2026 FitCV. Made with care.
          </p>
        </footer>

    </div>
  );  
}

export default LandingPage;