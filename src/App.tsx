import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { HexagonBackground } from './components/HexagonBackground';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('Frontend');
  const { theme } = useTheme();

  const colors = theme === 'light' ? {
    headerBg: 'rgb(255, 255, 255)',
    buttonBorder: 'border-black',
    buttonActive: 'bg-black text-white',
    buttonInactive: 'bg-white text-black',
  } : {
    headerBg: 'rgb(0, 0, 0)',
    buttonBorder: 'border-white',
    buttonActive: 'bg-white text-black',
    buttonInactive: 'bg-black text-white',
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Hexagon Background */}
      <HexagonBackground />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col md:ml-[220px]">
        {/* Header with Filters */}
        <div
          className="px-8 md:px-[60px] py-6"
          style={{
            backgroundColor: colors.headerBg,
            position: 'relative',
            zIndex: 5,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div className="flex flex-wrap gap-4">
            {['Frontend', 'Backend', 'Student of Systems engineer'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 border ${colors.buttonBorder} font-mono text-sm transition-colors ${
                  activeFilter === filter ? colors.buttonActive : colors.buttonInactive
                }`}
                style={{ borderRadius: '4px' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
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
