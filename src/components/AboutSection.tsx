export function AboutSection() {
  return (
    <section id="sobre-mi" className="mt-32 mb-20 max-w-3xl mx-auto">
      <h2 className="font-mono text-center mb-12 text-black" style={{ fontSize: '32px' }}>
        Sobre mí
      </h2>
      
      <div className="bg-white p-8 md:p-12 border border-gray-200">
        <div className="space-y-6">
          <p className="font-mono text-black leading-relaxed">
            Soy un desarrollador de software y diseñador especializado en crear experiencias digitales 
            minimalistas y funcionales. Mi enfoque combina diseño UI/UX con desarrollo full-stack, 
            buscando siempre la elegancia técnica en cada proyecto.
          </p>
          
          <p className="font-mono text-black leading-relaxed">
            Con experiencia en tecnologías como React, Angular, Django y Spring Boot, me apasiona 
            construir soluciones escalables que equilibren estética y rendimiento. Cada línea de 
            código es una oportunidad para resolver problemas de manera elegante.
          </p>
          
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-mono text-black mb-4">Experiencia</h3>
            <ul className="space-y-2 font-mono text-black">
              <li>• Desarrollo Full-Stack</li>
              <li>• Diseño de Interfaces UI/UX</li>
              <li>• Arquitectura de Software</li>
              <li>• Gestión de Bases de Datos</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
