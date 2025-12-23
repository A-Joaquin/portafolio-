import React from 'react';
import { motion } from 'framer-motion';

export function AboutSection() {
  
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
        variants={textVariants} // El título usa la variante de texto simple
        className="font-mono text-center mb-12 text-black"
        style={{ fontSize: '32px' }}
      >
        About Me
      </motion.h2>

      {/* La tarjeta blanca usa cardVariants para animarse ella misma y coordinar a sus hijos */}
      <motion.div 
        variants={cardVariants}
        className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm"
      >
        <div className="space-y-6">
          
          {/* Párrafo 1 */}
          <motion.p variants={textVariants} className="font-mono text-black leading-relaxed">
            I am a <strong>Systems Engineering student</strong> with a strong interest in 
            software development and building practical, well-structured applications. 
            This portfolio showcases my academic projects and my learning journey in 
            web and mobile development.
          </motion.p>

          {/* Párrafo 2 */}
          <motion.p variants={textVariants} className="font-mono text-black leading-relaxed">
            I enjoy working on both frontend and backend development, focusing on clean code,
            clear structure, and maintainable solutions. I am especially interested in 
            learning industry best practices and improving through real-world projects
            and collaboration.
          </motion.p>

          {/* Párrafo 3 */}
          <motion.p variants={textVariants} className="font-mono text-black leading-relaxed">
            I have experience working with technologies such as Angular, React, Spring Boot,
            and Android development with Jetpack Compose. All projects shown here were developed
            as part of my university studies and personal practice.
          </motion.p>

          {/* Sección final con borde */}
          <motion.div variants={textVariants} className="pt-6 border-t border-gray-200">
            <h3 className="font-mono text-black mb-4">What I Work With</h3>
            <ul className="space-y-2 font-mono text-black">
              <li>• Web Application Development</li>
              <li>• Mobile Application Development</li>
              <li>• Frontend & Backend Fundamentals</li>
              <li>• Clean Code & Software Structure</li>
            </ul>
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}