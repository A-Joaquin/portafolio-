export function Sidebar() {
  return (
    <aside className="w-full md:w-[220px] bg-black text-white flex-shrink-0 min-h-[300px]">
      <div 
        className="flex flex-col py-16 px-8 h-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '220px',
          height: '100vh',
          backgroundColor: '#000000',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '6rem',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}
      >
        {/* Branding */}
        <div className="mb-12" style={{ marginBottom: '4.5rem' }}>
          <h1 
            className="font-mono text-white uppercase"
            style={{ 
              letterSpacing: '0.1em',
              lineHeight: '1.3',
              fontSize: '2.3rem'
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
            href="#about" 
            className="font-mono text-white no-underline hover:opacity-70 transition-opacity text-lg"
          >
            About Me
          </a>
        </nav>
      </div>
    </aside>
  );
}