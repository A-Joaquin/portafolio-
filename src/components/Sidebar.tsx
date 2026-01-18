import { useTheme } from '../context/ThemeContext';

export function Sidebar() {
  const { theme } = useTheme();

  const colors = theme === 'light' ? {
    background: 'rgb(0, 0, 0)',
    text: '#ffffff',
  } : {
    background: 'rgb(0, 0, 0)',
    text: '#ffffff',
  };

  return (
    <aside className="w-full md:w-[220px] flex-shrink-0 min-h-[300px]">
      <div
        className="flex flex-col py-16 px-8 h-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '220px',
          height: '100vh',
          backgroundColor: colors.background,
          color: colors.text,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '6rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          zIndex: 10,
          transition: 'background-color 0.3s ease, color 0.3s ease',
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
              color: colors.text,
            }}
          >
            ARTURO<br />VELIZ
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8">
          <a
            href="#skills"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            Skills
          </a>
          <a
            href="#contacto"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            Contact
          </a>
          <a
            href="#about"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            About Me
          </a>
        </nav>
      </div>
    </aside>
  );
}
