import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project, Certification, Language, Reference } from '../types';
import Preview from './Preview';
import { TEMPLATES, INDUSTRY_KEYWORDS } from '../constants';
import { generateResumeSummary, generateProjectDescription, improveBulletPoints } from '../services/geminiService';

interface BuilderProps {
  resume: ResumeData;
  onSave: (resume: ResumeData) => void;
  onBack: () => void;
}

type Tab = 'content' | 'summary_skills' | 'experience' | 'education' | 'projects' | 'additional' | 'templates';

/* Premium AI Button Components */
const AIGenerateButton = ({ onClick, loading, label = "Generate with AI" }: { onClick: () => void, loading: boolean, label?: string }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 shadow-md transition-all disabled:opacity-50"
  >
    {loading ? (
       <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    ) : (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L13.09 8.26L18 6L15.74 10.91L22 12L15.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L8.26 13.09L2 12L8.26 10.91L6 6L10.91 8.26L12 2Z"/></svg>
    )}
    {label}
  </button>
);

const calculateATSScore = (data: ResumeData) => {
  let score = 0;
  if (data.personalInfo.fullName) score += 10;
  if (data.personalInfo.email) score += 10;
  if (data.personalInfo.phone) score += 10;
  if (data.summary?.length > 50) score += 15;
  if (data.experiences?.length > 0) score += 20;
  if (data.education?.length > 0) score += 15;
  if (data.skills?.length >= 5) score += 20;
  return score;
};

const Builder: React.FC<BuilderProps> = ({ resume, onSave, onBack }) => {
  const [data, setData] = useState<ResumeData>(resume);
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [loadingAI, setLoadingAI] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [showExport, setShowExport] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpdate = (updates: Partial<ResumeData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handlePersonalInfoUpdate = (field: string, value: string) => {
    handleUpdate({
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert('File must be under 5MB');
    }
  };

  const handleGenerateSummary = async () => {
    setLoadingAI(true);
    const summary = await generateResumeSummary(
      data.personalInfo.profession || 'Professional',
      data.experiences.map(e => `${e.position} at ${e.company}`)
    );
    handleUpdate({ summary });
    setLoadingAI(false);
  };

  const handleImproveExp = async (id: string) => {
    const exp = data.experiences.find(e => e.id === id);
    if (!exp) return;
    setLoadingAI(true);
    const improved = await improveBulletPoints(exp.position, exp.description);
    updateExperience(id, 'description', improved);
    setLoadingAI(false);
  };

  const handleGenerateProjectAI = async (id: string) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;
    setLoadingAI(true);
    const description = await generateProjectDescription(
      project.name || 'Project',
      project.role || 'Contributor',
      project.technologies || ''
    );
    updateProject(id, 'description', description);
    setLoadingAI(false);
  };

  // EXPERIENCE
  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '', position: '', startDate: '', endDate: '',
      current: false, description: ''
    };
    handleUpdate({ experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const experiences = data.experiences.map(e => e.id === id ? { ...e, [field]: value } : e);
    handleUpdate({ experiences });
  };

  const removeExperience = (id: string) => {
    handleUpdate({ experiences: data.experiences.filter(e => e.id !== id) });
  };

  // EDUCATION
  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      institution: '', degree: '', field: '', location: '',
      startDate: '', endDate: '', current: false, gpa: '', description: ''
    };
    handleUpdate({ education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const education = data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    handleUpdate({ education });
  };

  const removeEducation = (id: string) => {
    handleUpdate({ education: data.education.filter(edu => edu.id !== id) });
  };

  // PROJECTS
  const addProject = () => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: '', startDate: '', endDate: '', ongoing: false,
      url: '', technologies: '', description: ''
    };
    handleUpdate({ projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    handleUpdate({ projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const removeProject = (id: string) => {
    handleUpdate({ projects: data.projects.filter(p => p.id !== id) });
  };

  // ADDITIONAL - Certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: Math.random().toString(36).substr(2, 9),
      name: '', issuer: '', date: '', credentialId: ''
    };
    handleUpdate({ certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    handleUpdate({ certifications: data.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) });
  };

  const removeCertification = (id: string) => {
    handleUpdate({ certifications: data.certifications.filter(c => c.id !== id) });
  };

  // ADDITIONAL - Languages
  const addLanguage = () => {
    const newLang: Language = {
      id: Math.random().toString(36).substr(2, 9),
      name: '', proficiency: ''
    };
    handleUpdate({ languages: [...data.languages, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    handleUpdate({ languages: data.languages.map(l => l.id === id ? { ...l, [field]: value } : l) });
  };

  const removeLanguage = (id: string) => {
    handleUpdate({ languages: data.languages.filter(l => l.id !== id) });
  };

  // ADDITIONAL - References
  const addReference = () => {
    const newRef: Reference = {
      id: Math.random().toString(36).substr(2, 9),
      name: '', title: '', company: '', relationship: '', email: '', phone: ''
    };
    handleUpdate({ references: [...data.references, newRef] });
  };

  const updateReference = (id: string, field: keyof Reference, value: any) => {
    handleUpdate({ references: data.references.map(r => r.id === id ? { ...r, [field]: value } : r) });
  };

  const removeReference = (id: string) => {
    handleUpdate({ references: data.references.filter(r => r.id !== id) });
  };

  const atsScore = calculateATSScore(data);

  return (
    <div className="flex flex-col h-screen bg-white font-['Inter',_sans-serif]">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-gray-900">Jio</span>
            <span className="text-xl font-bold text-emerald-500">Resume</span>
          </div>
          <div className="flex items-center">
            <input 
              type="text" 
              value={data.title} 
              onChange={(e) => handleUpdate({ title: e.target.value })}
              className="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 text-center"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition">My Resumes</button>
            <button onClick={() => onSave(data)} className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition shadow-lg">Save</button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-gray-50 border-b border-gray-200 shrink-0">
        <div className="flex items-center space-x-1 px-6 py-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'content', label: 'Content' },
            { id: 'summary_skills', label: 'Summary & Skills' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'projects', label: 'Projects' },
            { id: 'additional', label: 'Additional' },
            { id: 'templates', label: 'Templates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 font-medium rounded-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-emerald-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Forms Panel */}
        <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar">
          {activeTab === 'content' && (
            <div className="p-6">
              <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" id="resume-upload"/>
                <label htmlFor="resume-upload" className="flex flex-col items-center cursor-pointer">
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span className="font-medium text-gray-700">Upload Existing Resume</span>
                  <span className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</span>
                </label>
              </div>

              {uploadedFile && (
                <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-emerald-700 text-sm mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  {uploadedFile.name}
                </div>
              )}

              <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <Input label="Full Name" value={data.personalInfo.fullName} onChange={(val: string) => handlePersonalInfoUpdate('fullName', val)} required />
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Profession
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.profession}
                    onChange={(e) => handlePersonalInfoUpdate('profession', e.target.value)}
                    placeholder="e.g. Software Engineer, Marketing Manager"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
                <Input label="Email" type="email" value={data.personalInfo.email} onChange={(val: string) => handlePersonalInfoUpdate('email', val)} required />
                <Input label="Phone" value={data.personalInfo.phone} onChange={(val: string) => handlePersonalInfoUpdate('phone', val)} />
                <Input label="Location" value={data.personalInfo.location} onChange={(val: string) => handlePersonalInfoUpdate('location', val)} />
                <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={(val: string) => handlePersonalInfoUpdate('linkedin', val)} />
              </div>
            </div>
          )}

          {activeTab === 'summary_skills' && (
            <div className="p-6 space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Professional Summary</label>
                <textarea rows={6} value={data.summary} onChange={(e) => handleUpdate({ summary: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm mb-4" placeholder="Summarize your professional experience..." />
                <AIGenerateButton onClick={handleGenerateSummary} loading={loadingAI} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Industry</label>
                <select 
                  value={data.industry || ''} 
                  onChange={(e) => handleUpdate({ industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition text-sm mb-4"
                >
                  <option value="">Select Industry</option>
                  {Object.keys(INDUSTRY_KEYWORDS).map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>

                {data.industry && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Recommended Keywords for {data.industry}:</p>
                    <div className="flex flex-wrap gap-1">
                      {INDUSTRY_KEYWORDS[data.industry].map(kw => (
                        <button 
                          key={kw} 
                          onClick={() => {
                            if (!data.skills.includes(kw)) {
                              handleUpdate({ skills: [...data.skills, kw] });
                            }
                          }}
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-100 transition"
                        >
                          + {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Skills (Comma separated)</label>
                <input type="text" value={data.skills.join(', ')} onChange={(e) => handleUpdate({ skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition text-sm" placeholder="React, TypeScript, Node.js..." />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Work Experience</h2>
                <button onClick={addExperience} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-200 transition">+ Add</button>
              </div>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 relative group">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                  <div className="grid grid-cols-1 gap-4">
                    <Input label="Company" value={exp.company} onChange={(v: string) => updateExperience(exp.id, 'company', v)} />
                    <Input label="Position" value={exp.position} onChange={(v: string) => updateExperience(exp.id, 'position', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Start Date" value={exp.startDate} onChange={(v: string) => updateExperience(exp.id, 'startDate', v)} type="month" />
                      <Input label="End Date" value={exp.endDate} onChange={(v: string) => updateExperience(exp.id, 'endDate', v)} type="month" disabled={exp.current} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} id={`curr-${exp.id}`} className="w-4 h-4 text-emerald-500 rounded" />
                    <label htmlFor={`curr-${exp.id}`} className="text-sm text-gray-600">I currently work here</label>
                  </div>
                  <textarea rows={4} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition text-sm resize-none mt-2" placeholder="Responsibilities..." />
                  <div className="mt-4">
                    <AIGenerateButton onClick={() => handleImproveExp(exp.id)} loading={loadingAI} label="Optimize Bullets with AI" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <p className="text-sm text-gray-500 mb-4">Add your educational background</p>

              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-800">{edu.institution || 'New Education'}</span>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                  </div>

                  {/* Institution */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      Institution <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Enter institution name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Degree */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="e.g. Bachelor's, Master's" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Field of Study */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                      Field of Study
                    </label>
                    <input type="text" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="e.g. Computer Science" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Dates with Calendar */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Start Date
                      </label>
                      <input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        End Date
                      </label>
                      <input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} disabled={edu.current} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-100"/>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={edu.current} onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)} className="w-4 h-4 text-emerald-500 rounded"/>
                    Currently studying here
                  </label>
                </div>
              ))}

              <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                Add Education
              </button>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <p className="text-sm text-gray-500 mb-4">Showcase your best work</p>

              {data.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-800">{project.name || 'New Project'}</span>
                    <button onClick={() => removeProject(project.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                  </div>

                  {/* Project Name */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={project.name} onChange={(e) => updateProject(project.id, 'name', e.target.value)} placeholder="Enter project name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Project URL */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                      Project URL
                    </label>
                    <input type="url" value={project.url} onChange={(e) => updateProject(project.id, 'url', e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Technologies */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                      Technologies
                    </label>
                    <input type="text" value={project.technologies} onChange={(e) => updateProject(project.id, 'technologies', e.target.value)} placeholder="React, Node.js, MongoDB..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Start Date
                      </label>
                      <input type="month" value={project.startDate} onChange={(e) => updateProject(project.id, 'startDate', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"/>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        End Date
                      </label>
                      <input type="month" value={project.endDate} onChange={(e) => updateProject(project.id, 'endDate', e.target.value)} disabled={project.ongoing} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none disabled:bg-gray-100"/>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <input type="checkbox" checked={project.ongoing} onChange={(e) => updateProject(project.id, 'ongoing', e.target.checked)} className="w-4 h-4 text-emerald-500 rounded"/>
                    Ongoing project
                  </label>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/></svg>
                      Description
                    </label>
                    <textarea value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} placeholder="Describe your project..." rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"/>
                    <div className="mt-2 flex justify-end">
                      <button onClick={() => handleGenerateProjectAI(project.id)} className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 hover:text-emerald-700">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L13.09 8.26L18 6L15.74 10.91L22 12L15.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L8.26 13.09L2 12L8.26 10.91L6 6L10.91 8.26L12 2Z"/></svg>
                        AI Generate Description
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={addProject} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                Add Project
              </button>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
              <p className="text-sm text-gray-500 mb-4">Add extra details to strengthen your resume</p>

              {/* CERTIFICATIONS */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800 flex items-center gap-2">📜 Certifications</h3>
                  <button onClick={addCertification} className="text-emerald-600 text-sm font-medium hover:text-emerald-700">+ Add</button>
                </div>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} placeholder="Certification name" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} placeholder="Issuing organization" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="month" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <button onClick={() => removeCertification(cert.id)} className="text-red-500 text-sm hover:text-red-700 font-medium">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* LANGUAGES */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800 flex items-center gap-2">🌐 Languages</h3>
                  <button onClick={addLanguage} className="text-emerald-600 text-sm font-medium hover:text-emerald-700">+ Add</button>
                </div>
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-2 mb-2">
                    <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} placeholder="Language" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                    <select value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-emerald-500">
                      <option value="">Level</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                    <button onClick={() => removeLanguage(lang.id)} className="text-red-500 px-3 py-2 hover:bg-red-50 rounded-lg transition">✕</button>
                  </div>
                ))}
              </div>

              {/* INTERESTS */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-3">🎯 Interests</h3>
                <input type="text" value={data.interests} onChange={(e) => handleUpdate({ interests: e.target.value })} placeholder="Photography, Hiking, Chess... (comma separated)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"/>
              </div>

              {/* REFERENCES */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800 flex items-center gap-2">👥 References</h3>
                  <button onClick={addReference} className="text-emerald-600 text-sm font-medium hover:text-emerald-700">+ Add</button>
                </div>
                <label className="flex items-center gap-2 mb-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
                  <input type="checkbox" checked={data.referencesOnRequest} onChange={(e) => handleUpdate({ referencesOnRequest: e.target.checked })} className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 rounded"/>
                  Available upon request
                </label>
                {!data.referencesOnRequest && data.references.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={ref.name} onChange={(e) => updateReference(ref.id, 'name', e.target.value)} placeholder="Full name" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="text" value={ref.title} onChange={(e) => updateReference(ref.id, 'title', e.target.value)} placeholder="Job title" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="text" value={ref.company} onChange={(e) => updateReference(ref.id, 'company', e.target.value)} placeholder="Company" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="email" value={ref.email} onChange={(e) => updateReference(ref.id, 'email', e.target.value)} placeholder="Email" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <input type="tel" value={ref.phone} onChange={(e) => updateReference(ref.id, 'phone', e.target.value)} placeholder="Phone" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"/>
                      <button onClick={() => removeReference(ref.id)} className="text-red-500 text-sm hover:text-red-700 font-medium">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-6 space-y-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Template</h3>
              <div className="grid grid-cols-2 gap-4">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleUpdate({ template: template.id, accentColor: template.defaultColor })}
                    className={`relative p-4 rounded-xl border-2 transition text-left h-full flex flex-col ${data.template === template.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}
                  >
                    <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400">Preview</div>
                    <p className="font-bold text-sm">{template.name}</p>
                    <p className="text-xs text-gray-500 mt-1 flex-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="w-3/5 bg-gray-100 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar flex flex-col items-center">
            <div className="w-full max-w-[210mm] bg-white shadow-2xl min-h-[297mm] mb-8" id="resume-preview">
              <Preview data={data} />
            </div>
            
            <div className="flex items-center gap-4 mb-12">
              <div className="relative">
                <button 
                  onClick={() => setShowExport(!showExport)}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-3 rounded-full shadow-lg shadow-emerald-500/30 font-bold hover:bg-emerald-600 transition"
                >
                  <span>Download</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {showExport && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border p-2 min-w-[200px] z-50">
                    <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition">
                      <span className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">📄</span>
                      <div><p className="font-bold text-sm">PDF</p><p className="text-[10px] text-gray-500">Best for printing</p></div>
                    </button>
                    <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition">
                      <span className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">📝</span>
                      <div><p className="font-bold text-sm">DOCX</p><p className="text-[10px] text-gray-500">Editable format</p></div>
                    </button>
                    <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition">
                      <span className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">🌐</span>
                      <div><p className="font-bold text-sm">HTML</p><p className="text-[10px] text-gray-500">Web format</p></div>
                    </button>
                  </div>
                )}
              </div>
              <button className="px-8 py-3 bg-white text-gray-700 font-bold border rounded-full hover:bg-gray-50 transition">Share Link</button>
            </div>
          </div>

          {/* Right Sidebar for ATS & Matcher */}
          <div className="w-80 bg-white border-l p-6 overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-xl p-4 border shadow-sm mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">ATS Score</h3>
                <span className="text-2xl font-bold text-emerald-500">{atsScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" style={{width: `${atsScore}%`}}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {data.personalInfo.fullName ? '✅' : '❌'} <span>Contact Information</span>
                </div>
                <div className="flex items-center gap-2">
                  {data.summary?.length > 50 ? '✅' : '❌'} <span>Professional Summary</span>
                </div>
                <div className="flex items-center gap-2">
                  {data.experiences?.length > 0 ? '✅' : '❌'} <span>Work Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  {data.education?.length > 0 ? '✅' : '❌'} <span>Education</span>
                </div>
                <div className="flex items-center gap-2">
                  {data.skills?.length >= 5 ? '✅' : '❌'} <span>Skills (5+ recommended)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">🎯 Job Matcher</h3>
              <textarea 
                placeholder="Paste job description here to analyze matching keywords..." 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 h-32 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
              <button className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg font-bold hover:bg-emerald-600 transition">
                Analyze Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder = "", type = "text", disabled = false, required = false }: any) => (
  <div className="mb-4">
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition text-sm disabled:bg-gray-100 disabled:cursor-not-allowed outline-none" placeholder={placeholder} disabled={disabled} />
  </div>
);

export default Builder;