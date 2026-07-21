import React from 'react';

const SkillFeedback = ({ feedback }) => {
  if (!feedback) return null;

  const {
    keywordsFound = [],
    missingSkills = [],
    bonusSkills = [],
  } = feedback;

  return (
    <div className="flex flex-col gap-6 bg-white border border-[#EBEAE4] p-6 rounded-2xl shadow-sm">
      {/* Matched Skills */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2.5">
          ✓ Matched Skills
        </h4>

        {keywordsFound.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {keywordsFound.map((kw) => (
              <span
                key={kw}
                className="text-xs font-medium bg-[#24A174]/10 text-[#1C2E24] px-2.5 py-1 rounded-md"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No matched skills found.
          </p>
        )}
      </div>

      {/* Missing Skills */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2.5">
          ✗ Missing Skills
        </h4>

        {missingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map((ms) => (
              <span
                key={ms}
                className="text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-md"
              >
                {ms}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No missing skills — great match!
          </p>
        )}
      </div>

      <hr className="border-[#EBEAE4]" />

      {/* Bonus Skills */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-2.5">
          ★ Bonus Skills
        </h4>

        {bonusSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {bonusSkills.map((bs) => (
              <span
                key={bs}
                className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-md"
              >
                {bs}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No bonus skills detected.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillFeedback;