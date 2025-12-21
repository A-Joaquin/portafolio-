export function ContactSection() {
  return (
    <section id="contacto" className="mt-32 max-w-3xl mx-auto">
      <h2
        className="font-mono text-center mb-12 text-black"
        style={{ fontSize: '32px' }}
      >
        Contact
      </h2>

      <div className="bg-white p-8 md:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Email */}
          <div>
            <h3 className="font-mono text-black mb-4">Email</h3>
            <a
              href="mailto:arturoveliz159@gmail.com"
              className="font-mono text-black hover:opacity-70 transition-opacity no-underline"
            >
              arturoveliz159@gmail.com
            </a>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-black mb-4">Social</h3>
            <div className="flex flex-col gap-3">

              <a
                href="https://github.com/A-Joaquin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-black hover:opacity-70 transition-opacity no-underline"
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
                className="flex items-center gap-3 font-mono text-black hover:opacity-70 transition-opacity no-underline"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.86l2.83-3.54H9.96z"/>
                </svg>
                Portfolio →
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
