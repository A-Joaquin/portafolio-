import React, { useState, useEffect } from 'react';

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const css = `@media (max-width: 768px){body{padding-top:64px!important;}aside{display:none!important;}}`;
    const id = 'mobile-header-css';
    let styleEl = document.getElementById(id) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (
    <>
      <header
        // CAMBIO 1: Agregamos flex y alineación aquí, junto con md:hidden
        className="flex items-center justify-between md:hidden" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '64px',
          backgroundColor: '#000000',
          color: '#ffffff',
          // CAMBIO 2: Eliminé display, alignItems y justifyContent de aquí
          // para que no sobrescriban al 'md:hidden'
          padding: '0 16px',
          zIndex: 1000,
        }}
      >
        <div className="font-mono" style={{ fontSize: '18px', letterSpacing: '0.04em' }}>
          Arturo Veliz
        </div>
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer"
          style={{ width: '32px', height: '24px' }}
        >
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#ffffff',
              marginBottom: '6px',
              transition: 'transform 0.2s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#ffffff',
              marginBottom: '6px',
              transition: 'opacity 0.2s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
      </header>

      {open && (
        <nav
          className="md:hidden"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderTop: '1px solid #ffffff',
            zIndex: 999,
          }}
        >
          <ul style={{ listStyle: 'none', padding: '12px 16px' }}>
            <li style={{ marginBottom: '12px' }}>
              <a
                href="#skills"
                className="font-mono text-white no-underline"
                onClick={() => setOpen(false)}
              >
                Skills
              </a>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a
                href="#contacto"
                className="font-mono text-white no-underline"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="font-mono text-white no-underline"
                onClick={() => setOpen(false)}
              >
                About Me
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}