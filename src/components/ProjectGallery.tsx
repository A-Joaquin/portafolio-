import Masonry from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/f085b567c4f9eedda0dec482792b69de95b96c6a.png';

const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1686436050017-5bac329b4171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBleWUlMjBkcmF3aW5nJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NjI4MDM2OXww&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Eye illustration with pen',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY2MTc1MDMwfDA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Course platform UI',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 3,
    image: exampleImage,
    alt: 'Portfolio design showcase',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2UlMjB1aXxlbnwxfHx8fDE3NjYyODAzNzB8MA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Web design interface',
    categories: ['Student of Systems engineer', 'Frontend']
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1639221314358-2291fb903405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHR5cG9ncmFwaHl8ZW58MXx8fHwxNzY2MjgwMzcwfDA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'MAJOR MINOR pixel art',
    categories: ['Student of Systems engineer', 'Frontend', 'Backend']
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1758240931165-60242e5ce08c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBkZXNpZ24lMjBtb2Rlcm58ZW58MXx8fHwxNzY2MjgwMzcxfDA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Dashboard interface',
    categories: ['Student of Systems engineer', 'Backend']
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1766062854576-656159bfb41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYW5pbWUlMjBtYW5nYSUyMGFydHxlbnwxfHx8fDE3NjYyODAzNzB8MA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Dark artistic illustration',
    categories: ['Student of Systems engineer', 'Backend']
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1729575846515-5178676b963e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzaWduJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjYyODAzNzJ8MA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Minimalist design',
    categories: ['Student of Systems engineer', 'Backend']
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1758472712764-4b746ea18d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwaWxsdXN0cmF0aW9uJTIwZGFya3xlbnwxfHx8fDE3NjYyODAzNzJ8MA&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Visual design work',
    categories: ['Student of Systems engineer', 'Backend']
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
              className="overflow-hidden bg-white shadow-md group cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              style={{ borderRadius: '8px' }}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.alt}
                className="w-full h-auto object-cover transition-opacity group-hover:opacity-90"
              />
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
              className="overflow-hidden bg-white shadow-md group cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              style={{ borderRadius: '8px' }}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.alt}
                className="w-full h-auto object-cover transition-opacity group-hover:opacity-90"
              />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}