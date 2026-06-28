import React from 'react';

export default function LeftPane() {
  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#FAF8F2] px-6 py-12 text-center overflow-hidden lg:w-1/2"
      style={{
        backgroundImage: `linear-gradient(rgba(250, 248, 242, 0.94), rgba(250, 248, 242, 0.94)), url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#e3eedb] opacity-60 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        
        <div className="flex items-center justify-center w-20 h-20 bg-[#42b47e] rounded-[24px] shadow-sm mb-6">
          <svg 
            className="w-10 h-10 text-white" 
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

        <h1 className="font-serif text-5xl font-normal text-[#1F2E22] tracking-wide mb-5">
          FitCV
        </h1>

        <p className="text-[#556153] font-sans text-[15px] font-medium leading-relaxed mb-10 max-w-[260px]">
          Tailor your resume to every job. Get the interview.
        </p>

        <div className="flex flex-wrap justify-center gap-2.5">
          <span className="px-4 py-2 bg-[#EFECE3] text-[#55524A] text-xs font-medium rounded-full tracking-wide">
            Cover letters
          </span>
          <span className="px-4 py-2 bg-[#EFECE3] text-[#55524A] text-xs font-medium rounded-full tracking-wide">
            Skills match
          </span>
          <span className="px-4 py-2 bg-[#EFECE3] text-[#55524A] text-xs font-medium rounded-full tracking-wide">
            History
          </span>
        </div>

      </div>
    </div>
  );
}