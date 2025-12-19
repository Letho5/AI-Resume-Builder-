import React, { useState } from 'react';
import { ResumeData } from '../types';

interface DashboardProps {
  resumes: ResumeData[];
  onCreate: () => void;
  onEdit: (resume: ResumeData) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ resumes, onCreate, onEdit, onDelete, onLogout }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Max 5MB allowed.');
        return;
      }
      setUploadedFile(file);
      // Parse file and extract data (simulated)
      console.log('Parsing resume:', file.name);
      alert('File received: ' + file.name + '. AI Parsing would start here.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">resume</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600">Hi, Lethukuthula Mthiyane</span>
            <button 
              onClick={onLogout}
              className="px-6 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <button 
            onClick={onCreate}
            className="h-64 bg-white border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:shadow-xl transition group"
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">+</div>
            <span className="font-semibold text-gray-600">Create Resume</span>
          </button>

          {/* Upload Card Enhanced */}
          <div className="h-64 bg-white border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:shadow-xl transition group relative overflow-hidden">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              id="resume-upload"
            />
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-600">Upload Existing</span>
            <p className="text-[10px] text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
            {uploadedFile && (
              <div className="mt-2 text-[10px] text-emerald-600 font-bold animate-pulse">
                ✓ {uploadedFile.name}
              </div>
            )}
          </div>

          {/* Existing Resumes */}
          {resumes.map(resume => (
            <div key={resume.id} className="h-64 bg-purple-50 rounded-2xl p-6 relative flex flex-col justify-center items-center group cursor-pointer hover:shadow-2xl transition" onClick={() => onEdit(resume)}>
              <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900">{resume.title || 'My Resume'}</h4>
              <p className="text-xs text-purple-400 mt-2">Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(resume.id); }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;