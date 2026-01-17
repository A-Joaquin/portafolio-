import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { HexagonBackground } from './components/HexagonBackground';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('Frontend');

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Hexagon Background */}
      <HexagonBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with Black Header */}
      <div className="flex-1 flex flex-col md:ml-[220px]">
        {/* Black Header with Filters */}
        <div className="px-8 md:px-[60px] py-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', position: 'relative', zIndex: 5 }}>
          <div className="flex flex-wrap gap-4">
            {['Frontend', 'Backend', 'Student of Systems engineer'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 border border-black font-mono text-sm transition-colors ${
                  activeFilter === filter ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                style={{ borderRadius: '4px' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content with Gray Background */}
        <main className="flex-1 p-8 md:p-[60px]" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 5 }}>
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