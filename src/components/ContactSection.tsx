export function ContactSection() {
  return (
    <section id="contacto" className="mt-32 max-w-3xl mx-auto">
      <h2 className="font-mono text-center mb-12 text-black" style={{ fontSize: '32px' }}>
        Contacto
      </h2>
      
      <div className="bg-white p-8 md:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-mono text-black mb-4">Email</h3>
            <a 
              href="mailto:arturo.veliz@example.com" 
              className="font-mono text-black hover:opacity-70 transition-opacity no-underline"
            >
              arturo.veliz@example.com
            </a>
          </div>
          
          <div>
            <h3 className="font-mono text-black mb-4">Social</h3>
            <div className="flex flex-col gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-black hover:opacity-70 transition-opacity no-underline"
              >
                GitHub →
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-black hover:opacity-70 transition-opacity no-underline"
              >
                LinkedIn →
              </a>
              <a 
                href="https://behance.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-black hover:opacity-70 transition-opacity no-underline"
              >
                Behance →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
