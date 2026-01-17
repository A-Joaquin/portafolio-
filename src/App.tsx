import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { NervCursor } from './components/NervCursor';
import { HexagonBackground } from './components/HexagonBackground';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('Frontend');

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ cursor: 'none' }}>
      {/* Hexagon Background - Evangelion Style */}
      <HexagonBackground />
      {/* Custom NERV Cursor */}
      <NervCursor />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with EVA Header */}
      <div className="flex-1 flex flex-col md:ml-[220px]" style={{ position: 'relative', zIndex: 1 }}>
        {/* EVA Purple Header with Filters */}
        <div className="px-8 md:px-[60px] py-6" style={{ backgroundColor: 'rgba(42, 0, 71, 0.7)', borderBottom: '2px solid #00FF41', backdropFilter: 'blur(8px)' }}>
          <div className="flex flex-wrap gap-4">
            {['Frontend', 'Backend', 'Student of Systems engineer'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-2 font-mono text-sm transition-all"
                style={{
                  borderRadius: '4px',
                  border: activeFilter === filter ? '2px solid #00FF41' : '2px solid #FF6B00',
                  backgroundColor: activeFilter === filter ? '#00FF41' : 'transparent',
                  color: activeFilter === filter ? '#0A0014' : '#00FF41',
                  boxShadow: activeFilter === filter ? '0 0 15px rgba(0, 255, 65, 0.6)' : 'none',
                  fontWeight: activeFilter === filter ? 'bold' : 'normal'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content with Semi-transparent Background */}
        <main className="flex-1 p-8 md:p-[60px]" style={{ backgroundColor: 'rgba(61, 0, 102, 0.6)', position: 'relative', zIndex: 1 }}>
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