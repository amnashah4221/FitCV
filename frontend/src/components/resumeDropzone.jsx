import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

export default function ResumeDropzone() {
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['pdf'] },
        multiple: false,
    });

    return (
        <div {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#3ca775] bg-[#3ca775]/5' : 'border-[#e2dfd5] bg-transparent'}`}>

        <input {...getInputProps()} />

        {!file ? (
            <div className="text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3ca775]/10 flex items-center justify-center text-[#3ca775]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <div>
            <p className="text-slate-800 font-medium">Drop your resume (PDF)</p>
            <p className="text-xs text-slate-400 mt-1">or click to browse · 5MB max</p>
          </div>
        </div>
        ) : (
            <div className="flex items-center gap-2 bg-[#e9e6dc] px-3 py-1.5 rounded-full text-xs font-medium text-slate-700">
          <span>📄 {file.name}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
            className="hover:text-red-500 font-bold ml-1"
          >
            ×
          </button>
        </div>
      )}
        </div>
    )};