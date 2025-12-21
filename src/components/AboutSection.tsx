export function AboutSection() {
  return (
    <section id="about" className="mt-32 mb-20 max-w-3xl mx-auto">
      <h2
        className="font-mono text-center mb-12 text-black"
        style={{ fontSize: '32px' }}
      >
        About Me
      </h2>

      <div className="bg-white p-8 md:p-12 border border-gray-200">
        <div className="space-y-6">
          
          <p className="font-mono text-black leading-relaxed">
            I am a <strong>Systems Engineering student</strong> with a strong interest in 
            software development and building practical, well-structured applications. 
            This portfolio showcases my academic projects and my learning journey in 
            web and mobile development.
          </p>

          <p className="font-mono text-black leading-relaxed">
            I enjoy working on both frontend and backend development, focusing on clean code,
            clear structure, and maintainable solutions. I am especially interested in 
            learning industry best practices and improving through real-world projects
            and collaboration.
          </p>

          <p className="font-mono text-black leading-relaxed">
            I have experience working with technologies such as Angular, React, Spring Boot,
            and Android development with Jetpack Compose. All projects shown here were developed
            as part of my university studies and personal practice.
          </p>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-mono text-black mb-4">What I Work With</h3>
            <ul className="space-y-2 font-mono text-black">
              <li>• Web Application Development</li>
              <li>• Mobile Application Development</li>
              <li>• Frontend & Backend Fundamentals</li>
              <li>• Clean Code & Software Structure</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
