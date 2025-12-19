import React, { useState, useEffect } from 'react';
import { AppView, ResumeData } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Builder from './components/Builder';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const DEFAULT_RESUME: ResumeData = {
  id: 'new',
  title: 'My Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profession: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: '',
  references: [],
  // Fixed: Updated property name to match ResumeData interface
  referencesOnRequest: false,
  sectionVisibility: {
    certifications: false,
    languages: false,
    interests: false,
    references: false
  },
  template: 'executive',
  accentColor: '#10B981',
  updatedAt: new Date().toISOString()
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('jioresume_resumes');
    if (saved) {
      setResumes(JSON.parse(saved));
    }
  }, []);

  const saveResume = (resume: ResumeData) => {
    const updatedResumes = [...resumes];
    const index = updatedResumes.findIndex(r => r.id === resume.id);
    
    const finalResume = {
      ...resume,
      id: resume.id === 'new' ? Math.random().toString(36).substr(2, 9) : resume.id,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      updatedResumes[index] = finalResume;
    } else {
      updatedResumes.push(finalResume);
    }

    setResumes(updatedResumes);
    localStorage.setItem('jioresume_resumes', JSON.stringify(updatedResumes));
    setCurrentResume(finalResume);
  };

  const deleteResume = (id: string) => {
    const filtered = resumes.filter(r => r.id !== id);
    setResumes(filtered);
    localStorage.setItem('jioresume_resumes', JSON.stringify(filtered));
  };

  const handleCreateNew = () => {
    if (!isLoggedIn) {
      setView(AppView.SIGNIN);
      return;
    }
    setCurrentResume({ ...DEFAULT_RESUME, id: 'new' });
    setView(AppView.BUILDER);
  };

  const handleEditResume = (resume: ResumeData) => {
    setCurrentResume(resume);
    setView(AppView.BUILDER);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setView(AppView.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-white">
      {view === AppView.LANDING && (
        <LandingPage 
          onStart={handleCreateNew} 
          onDashboard={() => isLoggedIn ? setView(AppView.DASHBOARD) : setView(AppView.SIGNIN)} 
        />
      )}
      
      {view === AppView.SIGNIN && (
        <SignIn 
          onSuccess={handleAuthSuccess} 
          onToggle={() => setView(AppView.SIGNUP)} 
          onBack={() => setView(AppView.LANDING)}
        />
      )}

      {view === AppView.SIGNUP && (
        <SignUp 
          onSuccess={handleAuthSuccess} 
          onToggle={() => setView(AppView.SIGNIN)}
          onBack={() => setView(AppView.LANDING)}
        />
      )}

      {view === AppView.DASHBOARD && (
        <Dashboard 
          resumes={resumes} 
          onCreate={handleCreateNew} 
          onEdit={handleEditResume} 
          onDelete={deleteResume}
          onLogout={() => { setIsLoggedIn(false); setView(AppView.LANDING); }}
        />
      )}

      {view === AppView.BUILDER && currentResume && (
        <Builder 
          resume={currentResume} 
          onSave={saveResume} 
          onBack={() => setView(AppView.DASHBOARD)} 
        />
      )}
    </div>
  );
};

export default App;