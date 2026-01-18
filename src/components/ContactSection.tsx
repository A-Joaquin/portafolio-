import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MobileHeader } from './MobileHeader';
import { useTheme } from '../context/ThemeContext';

export function ContactSection() {
  const { theme } = useTheme();
  const [titleHovered, setTitleHovered] = useState(false);

  const colors = theme === 'light' ? {
    titleColor: '#000000',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    text: 'text-black',
  } : {
    titleColor: '#FFFFFF',
    cardBg: 'bg-black',
    cardBorder: 'border-gray-700',
    text: 'text-white',
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
  // CONFIGURACIÓN DE LA ANIMACIÓN APPLE
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <>
      <MobileHeader />
      
      <motion.section 
        id="contacto" 
        className="mt-32 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // CAMBIO CLAVE AQUÍ:
        // 'once: true' -> Solo se anima una vez.
        // 'margin: "-40% 0px -40% 0px"' -> La zona de activación es solo el 20% central de la pantalla.
        // Esto obliga a que el componente esté BIEN ADENTRO (en el medio) antes de dispararse.
        viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
      >
        
        <motion.h2
          variants={itemVariants}
          className="font-mono text-center mb-12"
          style={titleGlowStyle}
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          Contact
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className={`${colors.cardBg} p-8 md:p-12 border ${colors.cardBorder} transition-colors duration-300`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Email */}
            <div>
              <h3 className={`font-mono ${colors.text} mb-4`}>Email</h3>
              <a
                href="mailto:arturoveliz159@gmail.com"
                className={`font-mono ${colors.text} hover:opacity-70 transition-opacity no-underline`}
              >
                arturoveliz159@gmail.com
              </a>
            </div>

            {/* Social */}
            <div>
              <h3 className={`font-mono ${colors.text} mb-4`}>Social</h3>
              <div className="flex flex-col gap-3">

                <a
                  href="https://github.com/A-Joaquin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 font-mono ${colors.text} hover:opacity-70 transition-opacity no-underline`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub →
                </a>

                <a
                  href="https://portafolio-arturoveliz.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 font-mono ${colors.text} hover:opacity-70 transition-opacity no-underline`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.86l2.83-3.54H9.96z"/>
                  </svg>
                  Portfolio →
                </a>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}