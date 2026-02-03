import { useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    id: 1,
    image: '/imagenesProyectos/5.jpg',
    alt: 'LMS NEWSCHOOL',
    titleKey: 'gallery.lmsTitle',
    descriptionKey: 'gallery.lmsDesc',
    categories: ['student', 'backend']
  },
  {
    id: 2,
    image: '/imagenesProyectos/6.jpg',
    alt: 'LMS NEWSCHOOL',
    titleKey: 'gallery.lmsTitle',
    descriptionKey: 'gallery.lmsDesc',
    categories: ['student', 'backend']
  },
  {
    id: 3,
    image: '/imagenesProyectos/10.jpg',
    alt: 'LMS NEWSCHOOL',
    titleKey: 'gallery.lmsTitle',
    descriptionKey: 'gallery.lmsDesc',
    categories: ['student', 'backend']
  },
  {
    id: 4,
    image: '/imagenesProyectos/unnamed..jpg',
    alt: 'App gusto total menu',
    titleKey: 'gallery.gustoMenuTitle',
    descriptionKey: 'gallery.gustoMenuDesc',
    categories: ['student', 'frontend']
  },
  {
    id: 5,
    image: '/imagenesProyectos/unnamed.jpg',
    alt: 'App gusto total menu',
    titleKey: 'gallery.gustoSettingsTitle',
    descriptionKey: 'gallery.gustoSettingsDesc',
    categories: ['student', 'frontend']
  }
];

interface ProjectGalleryProps {
  activeFilter: string;
}

export function ProjectGallery({ activeFilter }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t } = useLanguage();

  const sortedProjects = [...projects].sort((a, b) => {
    const aHasCategory = a.categories.includes(activeFilter);
    const bHasCategory = b.categories.includes(activeFilter);

    if (aHasCategory && !bHasCategory) return -1;
    if (!aHasCategory && bHasCategory) return 1;
    return 0;
  });

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  return (
    <div className="mb-16">

      {/* ==============================================
          MÓVIL: Estilo SPLIT - Sin whileInView para evitar conflictos con navegación
         ============================================== */}
      <div className="block md:hidden">
        <Masonry columnsCount={1} gutter="24px">
          {sortedProjects.map((project) => {
            const isSelected = selectedProject === project.id;

            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="cursor-pointer group"
              >
                {/* 1. IMAGEN */}
                <div className="relative overflow-hidden shadow-md transition-all duration-300 rounded-t-lg">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.alt}
                    className="block w-full h-auto object-cover"
                  />
                </div>

                {/* 2. CAJA DE DETALLES - Siempre visible en móvil */}
                <div className="bg-black shadow-md overflow-hidden rounded-b-lg">
                  <div className="p-4 flex flex-col items-center justify-center text-center">
                    {isSelected ? (
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2">{t(project.titleKey)}</h3>
                        <p className="text-white text-white/90 text-sm">{t(project.descriptionKey)}</p>
                      </div>
                    ) : (
                      <p className="text-white font-medium border-b border-white pb-1 inline-block">
                        {t('gallery.clickForDetails')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>
      </div>

      {/* ==============================================
          DESKTOP: Estilo SPLIT (Hover Trigger)
         ============================================== */}
      <div className="hidden md:block">
        <Masonry columnsCount={3} gutter="40px">
          {sortedProjects.map((project) => {
            const isHovered = hoveredProject === project.id;
            const isSelected = selectedProject === project.id;
            const showDetailsBox = isHovered || isSelected;

            return (
              <motion.div
                key={project.id}
                layout
                transition={{ layout: { type: "spring", stiffness: 350, damping: 30 } }}
                onClick={() => handleProjectClick(project.id)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="cursor-pointer group"
              >
                {/* Caja Imagen */}
                <div className={`relative overflow-hidden shadow-md transition-all duration-300 ${showDetailsBox ? 'rounded-t-lg' : 'rounded-lg'}`}>
                  <div className="transform transition-transform duration-500 group-hover:scale-105">
                     <ImageWithFallback
                       src={project.image}
                       alt={project.alt}
                       className="block w-full h-auto object-cover"
                     />
                  </div>
                </div>

                {/* Caja Detalles */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: showDetailsBox ? 'auto' : 0,
                    opacity: showDetailsBox ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="bg-black shadow-md overflow-hidden rounded-b-lg"
                >
                  <div className="p-4 flex flex-col items-center justify-center text-center">
                    {isSelected ? (
                      <>
                        <h3 className="text-white text-xl font-bold mb-2">{t(project.titleKey)}</h3>
                        <p className="text-white text-white/90 text-sm">{t(project.descriptionKey)}</p>
                      </>
                    ) : (
                      <p className="text-white font-medium border-b border-white pb-1 inline-block">
                        {t('gallery.clickForDetails')}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </Masonry>
      </div>

    </div>
  );
}
