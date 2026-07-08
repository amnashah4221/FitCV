import React from 'react';

const MatchScore = ({ score = 75 }) => {
   const getColor = (val) => {
    if (val >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (val >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className={`p-6 rounded-2xl border flex items-center justify-between ${getColor(score)}`}>
      <div>
        <h3 className="font-serif text-lg font-semibold text-slate-900">ATS Match Score</h3>
        <p className="text-xs text-slate-500 mt-0.5">Based on your keywords and core experience.</p>
      </div>
      <div className="text-4xl font-bold tracking-tight">
        {score}%
      </div>
    </div>
  );
};

export default MatchScore;