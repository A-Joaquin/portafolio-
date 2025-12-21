import Masonry from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/f085b567c4f9eedda0dec482792b69de95b96c6a.png';

const projects = [
  {
    id: 1,
    image: '/imagenesProyectos/5.jpg',
    alt: 'LMS NEWSCHOOL',
    title: 'LMS NEWSCHOOL',
    description: 'A LEARNING MANAGEMENT SYSTEM (LMS) FOR ONLINE EDUCATION',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 2,
    image: '/imagenesProyectos/6.jpg',
    alt: 'LMS NEWSCHOOL',
    title: 'LMS NEWSCHOOL',
    description: 'A LEARNING MANAGEMENT SYSTEM (LMS) FOR ONLINE EDUCATION',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 3,
    image: '/imagenesProyectos/10.jpg',
    alt: 'LMS NEWSCHOOL',
    title: 'LMS NEWSCHOOL',
    description: 'A LEARNING MANAGEMENT SYSTEM (LMS) FOR ONLINE EDUCATION',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 4,
    image: '/imagenesProyectos/unnamed..jpg',
    alt: 'App gusto total menu',
    title: 'menu gusto total',
    description: 'App menu design for Gusto Total restaurant',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 5,
    image: '/imagenesProyectos/unnamed.jpg',
    alt: 'App gusto total menu',
    title: 'settings gusto total',
    description: 'app gusto total settings',
    categories: ['Student of Systems engineer', 'Frontend', 'Backend']
  }
];

interface ProjectGalleryProps {
  activeFilter: string;
}

export function ProjectGallery({ activeFilter }: ProjectGalleryProps) {
  // Ordenar proyectos: primero los que pertenecen a la categoría activa
  const sortedProjects = [...projects].sort((a, b) => {
    const aHasCategory = a.categories.includes(activeFilter);
    const bHasCategory = b.categories.includes(activeFilter);
    
    if (aHasCategory && !bHasCategory) return -1;
    if (!aHasCategory && bHasCategory) return 1;
    return 0; // Mantener orden original si ambos tienen o no tienen la categoría
  });
  return (
    <div className="mb-16">
      {/* Mobile: 1 column */}
      <div className="block md:hidden">
        <Masonry columnsCount={1} gutter="24px">
          {sortedProjects.map((project) => (
            <motion.div 
              key={project.id}
              layout
              transition={{ 
                layout: { 
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }
              }}
              className="overflow-hidden bg-white shadow-md group cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl relative"
              style={{ borderRadius: '8px' }}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.alt}
                className="w-full h-auto object-cover transition-opacity"
              />
              {/* Overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center"
              >
                <h3 className="text-white text-lg font-bold text-center mb-2 px-4">
                  {project.title}
                </h3>
                <p className="text-white/90 text-sm text-center px-4">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Desktop and Tablet: 3 columns */}
      <div className="hidden md:block">
        <Masonry columnsCount={3} gutter="40px">
          {sortedProjects.map((project) => (
            <motion.div 
              key={project.id}
              layout
              transition={{ 
                layout: { 
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }
              }}
              className="overflow-hidden bg-white shadow-md group cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl relative"
              style={{ borderRadius: '8px' }}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.alt}
                className="w-full h-auto object-cover transition-opacity"
              />
              {/* Overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center"
              >
                <h3 className="text-white text-lg font-bold text-center mb-2 px-4">
                  {project.title}
                </h3>
                <p className="text-white/90 text-sm text-center px-4">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}