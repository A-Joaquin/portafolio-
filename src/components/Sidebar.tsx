export function Sidebar() {
  return (
    <aside className="w-full md:w-[220px] bg-black text-white flex-shrink-0 min-h-[300px] md:min-h-screen md:sticky md:top-0">
      <div className="flex flex-col py-16 px-8 md:py-20 md:px-8 h-full">
        {/* Branding */}
        <div className="mb-12">
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
        <nav className="flex flex-col gap-8">
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
            Contact
          </a>
          <a 
            href="#sobre-mi" 
            className="font-mono text-white no-underline hover:opacity-70 transition-opacity text-lg"
          >
            About Me
          </a>
        </nav>
      </div>
    </aside>
  );
}