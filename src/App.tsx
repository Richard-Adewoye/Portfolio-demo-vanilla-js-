import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResumeModal } from './components/ResumeModal';
import { ContactSection } from './components/ContactSection';
import { InteractiveDemosModal } from './components/InteractiveDemosModal';
import { CommandMenuModal } from './components/CommandMenuModal';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';
import { PortfolioChatbot } from './components/PortfolioChatbot';
import { Footer } from './components/Footer';

import { 
  initialProfileData, 
  initialProjects, 
  initialExperiences, 
  initialSkills, 
  initialTestimonials, 
  initialServices 
} from './data/portfolioData';

import { Project, Service, ThemeMode, ProfileData } from './types';

export default function App() {
  // State management
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [projects] = useState<Project[]>(initialProjects);
  const [experiences] = useState(initialExperiences);
  const [skills] = useState(initialSkills);
  const [testimonials] = useState(initialTestimonials);
  const [services] = useState(initialServices);

  // Theme mode
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDemosModalOpen, setIsDemosModalOpen] = useState(false);
  const [demoProject, setDemoProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Pre-filled contact subject
  const [contactSubject, setContactSubject] = useState('');

  const handleSelectService = (service: Service) => {
    setContactSubject(`Inquiry regarding ${service.title}`);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDemoForProject = (project: Project) => {
    setDemoProject(project);
    setIsDemosModalOpen(true);
  };

  // Get container theme classes
  const getThemeClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-slate-950 text-slate-100 theme-light';
      case 'emerald':
        return 'bg-slate-950 text-slate-100 theme-emerald';
      case 'amber':
        return 'bg-slate-950 text-slate-100 theme-amber';
      case 'dark':
      default:
        return 'bg-slate-950 text-slate-100 theme-dark';
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300 ${getThemeClass()}`}>
      
      {/* Sticky Top Navbar */}
      <Navbar
        profile={profile}
        theme={theme}
        onThemeChange={setTheme}
        onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
        onOpenEditor={() => setIsEditorModalOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Hero Section */}
      <main>
        <Hero 
          profile={profile}
          onOpenDemos={() => {
            setDemoProject(null);
            setIsDemosModalOpen(true);
          }}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* About Section */}
        <AboutSection profile={profile} />

        {/* Projects Showcase */}
        <ProjectsSection 
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenDemoForProject={handleOpenDemoForProject}
        />

        {/* Career Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Skills & Tech Matrix */}
        <SkillsSection skills={skills} />

        {/* Services & Solutions */}
        <ServicesSection 
          services={services}
          onSelectService={handleSelectService}
        />

        {/* Client Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Contact Form & Information */}
        <ContactSection 
          profile={profile} 
          prefilledSubject={contactSubject}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* MODALS */}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenDemo={handleOpenDemoForProject}
      />

      {/* Interactive Live Sandbox Demos Modal */}
      <InteractiveDemosModal
        isOpen={isDemosModalOpen}
        onClose={() => setIsDemosModalOpen(false)}
        initialProject={demoProject}
      />

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={profile}
        experiences={experiences}
        skills={skills}
      />

      {/* Cmd + K Command Launcher */}
      <CommandMenuModal
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        projects={projects}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenDemos={() => setIsDemosModalOpen(true)}
        onOpenEditor={() => setIsEditorModalOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onThemeChange={setTheme}
      />

      {/* Personalize Profile Data Editor */}
      <PortfolioEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        profile={profile}
        onUpdateProfile={(updated) => setProfile(updated)}
        onResetDefault={() => setProfile(initialProfileData)}
      />

      {/* AI Portfolio Assistant Floating Chatbot */}
      <PortfolioChatbot
        profile={profile}
        projects={projects}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenProject={(proj) => setSelectedProject(proj)}
      />

    </div>
  );
}
