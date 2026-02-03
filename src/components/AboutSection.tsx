import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [titleHovered, setTitleHovered] = useState(false);

  const colors = theme === 'light' ? {
    titleColor: '#000000',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    text: 'text-black',
    divider: 'border-gray-200',
  } : {
    titleColor: '#FFFFFF',
    cardBg: 'bg-black',
    cardBorder: 'border-gray-700',
    text: 'text-white',
    divider: 'border-gray-700',
  };

  // Estilos del título con efecto glow intensificado
  const titleGlowStyle = {
    fontSize: '32px',
    color: colors.titleColor,
    cursor: 'default',
    transition: 'all 0.3s ease',
    textShadow: titleHovered
      ? theme === 'light'
        ? '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF, 0 0 50px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6), 0 0 70px rgba(255, 255, 255, 0.4)'
        : '0 0 10px #000000, 0 0 20px #000000, 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 0, 0, 0.4)'
      : 'none',
  };
  
  // 1. Configuración del contenedor principal (Orquestador)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Retraso entre cada hijo directo (Título -> Tarjeta)
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  // 2. Configuración de la Tarjeta Blanca (Actúa como hijo y como padre a la vez)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98 // Un pelín más pequeño al inicio para efecto "pop" sutil
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Física Apple
        // Importante: Esto hace que los párrafos dentro de la tarjeta también se animen en cascada
        staggerChildren: 0.15, 
        delayChildren: 0.2 
      }
    }
  };

  // 3. Configuración de los elementos individuales (Texto, listas)
  const textVariants = {
    hidden: { opacity: 0, y: 20 }, // Desplazamiento corto para textos
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="mt-32 mb-20 max-w-3xl mx-auto"
      // Conectamos la animación
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // TRIGGER: Se activa cuando el 30% del componente es visible.
      // Esto asegura que la animación empiece cuando el elemento está "un poco más abajo del medio".
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        variants={textVariants}
        className="font-mono text-center mb-12"
        style={titleGlowStyle}
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {t('about.title')}
      </motion.h2>

      {/* La tarjeta usa cardVariants para animarse ella misma y coordinar a sus hijos */}
      <motion.div
        variants={cardVariants}
        className={`${colors.cardBg} p-8 md:p-12 border ${colors.cardBorder} shadow-sm transition-colors duration-300`}
      >
        <div className="space-y-6">

          {/* Párrafo 1 */}
          <motion.p
            variants={textVariants}
            className={`font-mono ${colors.text} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: t('about.p1') }}
          />

          {/* Párrafo 2 */}
          <motion.p
            variants={textVariants}
            className={`font-mono ${colors.text} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: t('about.p2') }}
          />

          {/* Párrafo 3 */}
          <motion.p
            variants={textVariants}
            className={`font-mono ${colors.text} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: t('about.p3') }}
          />

          {/* Sección final con borde */}
          <motion.div variants={textVariants} className={`pt-6 border-t ${colors.divider}`}>
            <h3 className={`font-mono ${colors.text} mb-4`}>{t('about.whatIWorkWith')}</h3>
            <ul className={`space-y-2 font-mono ${colors.text}`}>
              <li>• {t('about.webDev')}</li>
              <li>• {t('about.mobileDev')}</li>
              <li>• {t('about.fullstack')}</li>
              <li>• {t('about.cleanCode')}</li>
            </ul>
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}