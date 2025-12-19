import React from 'react';
import { ResumeData } from '../types';

interface PreviewProps {
  data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const { 
    personalInfo, summary, experiences, education, skills, 
    projects, certifications, languages, interests, references, 
    referencesOnRequest, sectionVisibility, 
    accentColor, template 
  } = data;

  const ExecutiveTemplate = () => (
    <div className="bg-white p-10 font-serif min-h-full text-gray-900">
      <div className="border-b-4 pb-4 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg font-medium mt-1" style={{ color: accentColor }}>{personalInfo.profession}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>
      {summary && (
        <div className="mb-6 bg-gray-50 p-4 border-l-4" style={{ borderColor: accentColor }}>
          <p className="text-gray-700 italic leading-relaxed">{summary}</p>
        </div>
      )}
      {experiences?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b pb-1">Professional Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4 pl-4 border-l-2 border-gray-100">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="font-medium text-sm" style={{ color: accentColor }}>{exp.company}</p>
              <div className="mt-2 text-sm text-gray-700 space-y-1 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b pb-1">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <strong>{edu.degree} in {edu.field}</strong>
                <span className="text-sm text-gray-500">{edu.endDate || (edu.current ? 'Present' : '')}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution} | {edu.location}</p>
              {edu.description && <p className="text-xs text-gray-500 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      {skills?.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b pb-1">Core Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );

  const ModernSidebarTemplate = () => (
    <div className="bg-white min-h-full flex text-gray-800">
      <div className="w-1/3 bg-slate-800 text-white p-6 flex flex-col">
        <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-lg" style={{ backgroundColor: accentColor }}>
          {personalInfo.fullName?.charAt(0) || '?'}
        </div>
        <h1 className="text-xl font-bold text-center leading-tight">{personalInfo.fullName}</h1>
        <p className="text-center text-sm mt-1 opacity-80" style={{ color: accentColor }}>{personalInfo.profession}</p>
        
        <div className="mt-8 space-y-4 text-xs">
          <h3 className="font-bold uppercase tracking-widest opacity-60 text-[10px]" style={{ color: accentColor }}>Contact</h3>
          {personalInfo.email && <div className="flex items-center gap-2"><span className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">✉</span>{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><span className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">📱</span>{personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2"><span className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">📍</span>{personalInfo.location}</div>}
        </div>

        {skills?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold uppercase tracking-widest opacity-60 text-[10px] mb-3" style={{ color: accentColor }}>Skills</h3>
            <div className="space-y-2">
              {skills.map((s, i) => <div key={i} className="bg-slate-700/50 px-3 py-2 rounded text-[11px]">{s}</div>)}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold uppercase tracking-widest opacity-60 text-[10px] mb-3" style={{ color: accentColor }}>Languages</h3>
            {languages.map((l, i) => <p key={i} className="text-[11px] mb-1">{l.name} - <span className="opacity-60">{l.proficiency}</span></p>)}
          </div>
        )}
      </div>
      <div className="w-2/3 p-8">
        {summary && (
          <div className="mb-8">
            <h2 className="font-bold uppercase tracking-widest text-[11px] mb-3" style={{ color: accentColor }}>Professional Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}
        {experiences?.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold uppercase tracking-widest text-[11px] mb-4" style={{ color: accentColor }}>Work Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: `${accentColor}22` }}>
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex justify-between items-start">
                    <strong className="text-gray-900 text-sm">{exp.position}</strong>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold mt-0.5" style={{ color: accentColor }}>{exp.company}</p>
                  <p className="text-xs text-gray-600 mt-2 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold uppercase tracking-widest text-[11px] mb-4" style={{ color: accentColor }}>Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <strong className="text-sm text-gray-900">{edu.degree} in {edu.field}</strong>
                  <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                    <span>{edu.institution}</span>
                    <span>{edu.endDate || (edu.current ? 'Present' : '')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {projects?.length > 0 && (
          <div>
            <h2 className="font-bold uppercase tracking-widest text-[11px] mb-4" style={{ color: accentColor }}>Projects</h2>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <strong className="text-sm text-gray-900">{proj.name}</strong>
                    <span className="text-[10px] text-gray-400 uppercase">{proj.startDate} - {proj.ongoing ? 'Ongoing' : proj.endDate}</span>
                  </div>
                  {proj.technologies && <p className="text-[10px] font-bold" style={{ color: accentColor }}>{proj.technologies}</p>}
                  <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const MinimalCleanTemplate = () => (
    <div className="bg-white p-12 font-sans min-h-full text-gray-800">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg mt-1 font-medium" style={{ color: accentColor }}>{personalInfo.profession}</p>
          <div className="flex gap-4 mt-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
        <div className="w-16 h-1 bg-gray-100 mt-6" style={{ backgroundColor: accentColor }}></div>
      </div>
      
      {summary && <p className="text-sm text-gray-600 mb-10 leading-relaxed max-w-3xl">{summary}</p>}
      
      {experiences?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: accentColor }}>{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-gray-100 whitespace-pre-line leading-relaxed">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  <span className="text-[10px] text-gray-400">{proj.startDate} - {proj.ongoing ? 'Ongoing' : proj.endDate}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-12">
        {education?.length > 0 && (
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex justify-between">
                    <strong className="text-gray-900 text-sm">{edu.degree}</strong>
                    <span className="text-[10px] text-gray-400">{edu.endDate || (edu.current ? 'Present' : '')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills?.length > 0 && (
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="border px-3 py-1 rounded-full text-xs font-medium transition-colors" style={{ borderColor: accentColor, color: accentColor }}>{s}</span>)}
            </div>
          </div>
        )}
      </div>

      {(certifications?.length > 0 || referencesOnRequest) && (
        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-12">
          {certifications?.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Certifications</h2>
              {certifications.map(c => (
                <div key={c.id} className="text-xs mb-2">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-gray-500">{c.issuer} • {c.date}</p>
                </div>
              ))}
            </div>
          )}
          {referencesOnRequest && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">References</h2>
              <p className="text-xs text-gray-500 italic">Available upon request</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const CreativeBoldTemplate = () => (
    <div className="bg-white min-h-full font-sans text-gray-900 overflow-hidden">
      <div className="text-white p-10" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #14b8a6 100%)` }}>
        <h1 className="text-4xl font-extrabold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-emerald-100 text-xl mt-1 font-medium">{personalInfo.profession}</p>
        <div className="flex flex-wrap gap-3 mt-6">
          {personalInfo.email && <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">{personalInfo.email}</span>}
          {personalInfo.phone && <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">{personalInfo.phone}</span>}
          {personalInfo.location && <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">{personalInfo.location}</span>}
        </div>
      </div>
      <div className="p-10">
        {summary && (
          <div className="mb-10 relative">
            <div className="absolute -left-10 top-0 bottom-0 w-2 rounded-r-lg" style={{ background: `linear-gradient(180deg, ${accentColor}, #14b8a6)` }}></div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium italic opacity-80">{summary}</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-10">
            {experiences?.length > 0 && (
              <section>
                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: accentColor }}>💼</span>
                  Professional Journey
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, i) => (
                    <div key={i} className="bg-gray-50/50 hover:bg-white border-2 border-transparent hover:border-emerald-50 rounded-2xl p-6 transition-all duration-300 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-extrabold text-gray-900 text-lg">{exp.position}</h3>
                          <p className="font-bold text-emerald-600" style={{ color: accentColor }}>{exp.company}</p>
                        </div>
                        <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</span>
                      </div>
                      <div className="mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="space-y-10">
            {skills?.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }}></div>
                   Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => <div key={i} className="text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm" style={{ backgroundColor: accentColor }}>{s}</div>)}
                </div>
              </section>
            )}
            {education?.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }}></div>
                   Education
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-100">
                    <strong className="text-sm block">{edu.degree} in {edu.field}</strong>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{edu.institution}</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-2 uppercase">{edu.endDate || (edu.current ? 'Present' : '')}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfessionalClassicTemplate = () => (
    <div className="bg-white p-12 font-serif min-h-full text-gray-900 shadow-inner">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-[0.2em]">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-3 mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
        <p className="text-lg font-bold mt-4 italic" style={{ color: accentColor }}>{personalInfo.profession}</p>
      </div>
      <div className="border-t-2 border-b-2 py-1 mb-8" style={{ borderColor: accentColor }}></div>
      {summary && (
        <div className="mb-10 text-center px-12">
          <p className="text-gray-600 italic leading-relaxed text-sm">{summary}</p>
        </div>
      )}
      {experiences?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-center font-black text-gray-900 uppercase tracking-[0.3em] text-xs mb-6 pb-2 border-b border-gray-100">Professional Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-1 mb-2">
                <strong className="text-base">{exp.position}</strong>
                <span className="text-xs font-bold text-gray-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="font-bold text-sm italic" style={{ color: accentColor }}>{exp.company}</p>
              <div className="mt-3 text-sm text-gray-600 leading-relaxed pl-4">{exp.description}</div>
            </div>
          ))}
        </div>
      )}
      {education?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-center font-black text-gray-900 uppercase tracking-[0.3em] text-xs mb-6 pb-2 border-b border-gray-100">Academic Background</h2>
          <div className="grid grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <div key={i} className="text-center p-4 bg-gray-50/50 rounded">
                <strong className="text-sm block">{edu.degree} in {edu.field}</strong>
                <p className="text-xs text-gray-600 mt-1">{edu.institution}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1">{edu.endDate || (edu.current ? 'Present' : '')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {skills?.length > 0 && (
        <div>
          <h2 className="text-center font-black text-gray-900 uppercase tracking-[0.3em] text-xs mb-4">Core Competencies</h2>
          <p className="text-center text-sm text-gray-600 leading-loose max-w-2xl mx-auto">{skills.join(' • ')}</p>
        </div>
      )}
    </div>
  );

  const TechDeveloperTemplate = () => (
    <div className="bg-slate-900 text-gray-100 p-10 font-mono min-h-full selection:bg-emerald-500 selection:text-white">
      <div className="flex items-center gap-6 mb-10 border-b border-slate-800 pb-8">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)]" style={{ backgroundColor: accentColor }}>
          {personalInfo.fullName?.charAt(0) || '>'}
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">{personalInfo.fullName || 'User.root'}</h1>
          <p className="text-emerald-400 font-bold" style={{ color: accentColor }}>// {personalInfo.profession}</p>
          <div className="flex gap-4 mt-3 text-xs font-medium text-slate-500">
            {personalInfo.email && <span className="hover:text-emerald-400 cursor-pointer">@email: "{personalInfo.email}"</span>}
            {personalInfo.phone && <span className="hover:text-emerald-400 cursor-pointer">@phone: "{personalInfo.phone}"</span>}
          </div>
        </div>
      </div>
      
      {summary && (
        <div className="mb-10 bg-slate-800/50 p-6 rounded-2xl border-l-4 border-emerald-500" style={{ borderColor: accentColor }}>
          <p className="text-slate-300 text-sm leading-relaxed"><span className="text-emerald-400 font-bold" style={{ color: accentColor }}>/**</span> {summary} <span className="text-emerald-400 font-bold" style={{ color: accentColor }}>*/</span></p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-10">
          {experiences?.length > 0 && (
            <section>
              <h2 className="text-emerald-400 font-black mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="opacity-30">01.</span> // Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-black text-lg group-hover:text-emerald-400 transition-colors">{exp.position}</span>
                      <span className="text-slate-500 text-xs font-bold">[{exp.startDate} - {exp.current ? 'NOW' : exp.endDate}]</span>
                    </div>
                    <p className="text-emerald-400 text-sm font-bold mb-4" style={{ color: accentColor }}>{exp.company}</p>
                    <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line border-l border-slate-700 pl-4">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="space-y-10">
          {skills?.length > 0 && (
            <section>
              <h2 className="text-emerald-400 font-black mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="opacity-30">02.</span> // Tech-Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold" style={{ color: accentColor, borderColor: `${accentColor}33`, backgroundColor: `${accentColor}11` }}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}
          {education?.length > 0 && (
            <section>
              <h2 className="text-emerald-400 font-black mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="opacity-30">03.</span> // Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                    <p className="text-white font-bold text-sm">{edu.degree}</p>
                    <p className="text-slate-500 text-xs mt-1">{edu.institution}</p>
                    <p className="text-emerald-400 text-[10px] mt-2 font-black" style={{ color: accentColor }}># {edu.endDate || (edu.current ? 'PRESENT' : '')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentTemplate = () => {
    switch(template) {
      case 'executive': return <ExecutiveTemplate />;
      case 'modern_sidebar': return <ModernSidebarTemplate />;
      case 'minimal_clean': return <MinimalCleanTemplate />;
      case 'creative_bold': return <CreativeBoldTemplate />;
      case 'professional_classic': return <ProfessionalClassicTemplate />;
      case 'tech_developer': return <TechDeveloperTemplate />;
      default: return <MinimalCleanTemplate />;
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-inner overflow-hidden print:shadow-none">
      {renderCurrentTemplate()}
    </div>
  );
};

export default Preview;