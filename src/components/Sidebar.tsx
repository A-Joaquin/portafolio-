export function Sidebar() {
  return (
    <aside className="w-full md:w-[220px] flex-shrink-0 min-h-[300px]" style={{ backgroundColor: 'transparent' }}>
      <div
        className="flex flex-col py-16 px-8 h-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '220px',
          height: '100vh',
          backgroundColor: 'rgba(10, 0, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          color: '#00FF41',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '6rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          borderRight: '2px solid #00FF41',
          zIndex: 10
        }}
      >
        {/* Branding */}
        <div className="mb-12" style={{ marginBottom: '4.5rem' }}>
          <h1
            className="font-mono uppercase"
            style={{
              letterSpacing: '0.1em',
              lineHeight: '1.3',
              fontSize: '2.3rem',
              color: '#00FF41',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
            }}
          >
            ARTURO<br />VELIZ
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8">
          <a
            href="#skills"
            className="font-mono no-underline transition-all text-lg"
            style={{
              color: '#00FF41',
              textShadow: '0 0 5px rgba(0, 255, 65, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B00';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 107, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#00FF41';
              e.currentTarget.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.3)';
            }}
          >
            Skills
          </a>
          <a
            href="#contacto"
            className="font-mono no-underline transition-all text-lg"
            style={{
              color: '#00FF41',
              textShadow: '0 0 5px rgba(0, 255, 65, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B00';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 107, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#00FF41';
              e.currentTarget.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.3)';
            }}
          >
            Contact
          </a>
          <a
            href="#about"
            className="font-mono no-underline transition-all text-lg"
            style={{
              color: '#00FF41',
              textShadow: '0 0 5px rgba(0, 255, 65, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B00';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 107, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#00FF41';
              e.currentTarget.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.3)';
            }}
          >
            About Me
          </a>
        </nav>
      </div>
    </aside>
  );
}