import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { HexagonBackground } from './components/HexagonBackground';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { LiquidFilterButtons } from './components/LiquidFilterButtons';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('frontend');
  const { theme } = useTheme();
  const { t } = useLanguage();

  const headerBg = theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';

  // Filtros con sus claves de traducción
  const filters = [
    { key: 'frontend', label: t('filter.frontend') },
    { key: 'backend', label: t('filter.backend') },
    { key: 'student', label: t('filter.student') },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Hexagon Background */}
      <HexagonBackground />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Language Toggle Button */}
      <LanguageToggle />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col md:ml-[220px]">
        {/* Header with Filters */}
        <div
          className="px-8 md:px-[60px] py-6"
          style={{
            backgroundColor: headerBg,
            position: 'relative',
            zIndex: 5,
            transition: 'background-color 0.3s ease',
          }}
        >
          <LiquidFilterButtons
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
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
