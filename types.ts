export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  BUILDER = 'BUILDER',
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP'
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  url: string;
  technologies: string;
  description: string;
  role?: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface ResumeData {
  id: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    profession: string;
    linkedin: string;
    website: string;
    photoUrl?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  interests: string;
  references: Reference[];
  referencesOnRequest: boolean;
  sectionVisibility: {
    certifications: boolean;
    languages: boolean;
    interests: boolean;
    references: boolean;
  };
  template: string;
  accentColor: string;
  updatedAt: string;
  industry?: string;
}