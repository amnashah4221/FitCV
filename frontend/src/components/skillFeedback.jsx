import React from 'react';

const skillFeedback = ({ feedback }) => {
   const data = feedback || {
    keywordsFound: ['React', 'Tailwind CSS', 'JavaScript'],
    missingSkills: ['TypeScript', 'Next.js', 'Unit Testing (Jest)'],
    recommendations: [
      'Add quantifiable achievements to your recent project.',
      'Tailor your summary to emphasize frontend architecture.'
    ]
  };

  return (
    <div className="flex flex-col gap-6 bg-white border border-[#EBEAE4] p-6 rounded-2xl shadow-sm">
      {/* Found Keywords */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2.5">Keywords Found</h4>
        <div className="flex flex-wrap gap-1.5">
          {data.keywordsFound.map((kw, i) => (
            <span key={i} className="text-xs font-medium bg-[#24A174]/10 text-[#1C2E24] px-2.5 py-1 rounded-md">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2.5">Missing Critical Skills</h4>
        <div className="flex flex-wrap gap-1.5">
          {data.missingSkills.map((ms, i) => (
            <span key={i} className="text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-md">
              {ms}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-[#EBEAE4]" />

      {/* Recommendations */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2">Tailoring Recommendations</h4>
        <ul className="list-disc list-inside space-y-2 text-xs text-slate-600">
          {data.recommendations.map((rec, i) => (
            <li key={i} className="leading-relaxed">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default skillFeedback;