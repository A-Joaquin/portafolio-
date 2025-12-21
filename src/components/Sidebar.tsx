export function Sidebar() {
  return (
    <aside className="w-full md:w-[220px] bg-black text-white flex-shrink-0 min-h-[300px] md:min-h-screen">
      <div className="flex flex-col justify-between h-full py-16 px-8 md:py-20 md:px-8">
        {/* Branding */}
        <div className="mb-auto">
          <h1 
            className="font-mono text-white uppercase"
            style={{ 
              letterSpacing: '0.1em',
              lineHeight: '1.3',
              fontSize: '1.5rem'
            }}
          >
            ARTURO<br />VELIZ
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8 mt-auto">
          <a 
            href="#skills" 
            className="font-mono text-white no-underline hover:opacity-70 transition-opacity text-lg"
          >
            Skills
          </a>
          <a 
            href="#contacto" 
            className="font-mono text-white no-underline hover:opacity-70 transition-opacity text-lg"
          >
            Contacto
          </a>
          <a 
            href="#sobre-mi" 
            className="font-mono text-white no-underline hover:opacity-70 transition-opacity text-lg"
          >
            Sobre mí
          </a>
        </nav>
      </div>
    </aside>
  );
}