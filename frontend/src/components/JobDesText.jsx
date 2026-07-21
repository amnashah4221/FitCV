export default function JobDescText({value, onChange}) {
     return(
        <div className="bg-[#fcfbfa] border border-[#e2dfd5] rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
      <p className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
        Job description
      </p>
      
      <textarea value = {value} onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-40 bg-transparent resize-none border-0 p-0 text-sm text-slate-800 placeholder-slate-400 focus:ring-0 focus:outline-none"
      />
      
      <div className="text-xs text-slate-400 border-t border-[#f3f1eb] pt-3 mt-2">
        {value.length} characters
      </div>
    </div>
    )
}