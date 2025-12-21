import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('Frontend');

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with Black Header */}
      <div className="flex-1 flex flex-col">
        {/* Black Header with Filters */}
        <div className="bg-black px-8 md:px-[60px] py-6">
          <div className="flex flex-wrap gap-4">
            {['Frontend', 'Backend', 'Student of Systems engineer'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 border border-white font-mono text-sm transition-colors ${
                  activeFilter === filter ? 'bg-white text-black' : 'bg-black text-white'
                }`}
                style={{ borderRadius: '4px' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content with Gray Background */}
        <main className="flex-1 bg-[#F5F5F5] p-8 md:p-[60px]">
          {/* Projects Gallery */}
          <ProjectGallery activeFilter={activeFilter} />

          {/* Skills Section */}
          <SkillsSection />

          {/* Contact Section */}
          <ContactSection />

          {/* About Section */}
          <AboutSection />
        </main>
      </div>
    </div>
  );
}