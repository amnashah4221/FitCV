// components/ToneSelector.jsx
import React from 'react';

export default function ToneSelector({selectedTone, onToneChange}) {
 
  const tones = [
    { id: 'professional', title: 'Professional', desc: 'Crisp, measured' },
    { id: 'enthusiastic', title: 'Enthusiastic', desc: 'Warm, curious' },
    { id: 'concise', title: 'Concise', desc: 'Tight, no fluff' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
        Tone
      </p>
      <div className="grid grid-cols-3 gap-3">
        {tones.map((tone) => {
              const isActive = selectedTone === tone.id;
          return (
            <button
              key={tone.id}
              type="button"
                  onClick={() => onToneChange(tone.id)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all
                ${isActive 
                  ? 'border-[#3ca775] bg-[#3ca775]/5 ring-1 ring-[#3ca775]' 
                  : 'border-[#e2dfd5] bg-white hover:border-slate-400'
                }`}
            >
              <span className="text-sm font-semibold text-slate-800">{tone.title}</span>
              <span className="text-xs text-slate-400 mt-0.5">{tone.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}