import { Mail, Linkedin, Phone, Github, Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.opacity += star.speed * 0.01;
        if (star.opacity >= 1 || star.opacity <= 0) {
          star.speed *= -1;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white relative overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-blue-400">SHIVAM DHIMAN</a>

            <div className="flex items-center gap-4">
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-900 dark:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-blue-500/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 pt-16">
        <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-6xl w-full">
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-8">
                I'm Shivam Dhiman
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              A passionate Software Engineer 
            </p>
            <div className="bg-white border border-gray-200 dark:bg-[#1a1f2e] dark:border-blue-500/30 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">What I Do</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="text-blue-400 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Full Stack Development</h3>
                    <p className="text-gray-700 dark:text-gray-400">Building dynamic web applications using React, Node.js, Express, and MongoDB, ensuring smooth frontend-backend integration and scalability.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-yellow-400 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">🧠 AI-Powered Solutions</h3>
                    <p className="text-gray-700 dark:text-gray-400">Integrating Google Gemini and ChatGPT APIs into Node.js applications to create intelligent and interactive user experiences.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-red-400 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Process Optimization</h3>
                    <p className="text-gray-700 dark:text-gray-400">Automating workflows, improving code efficiency, and enhancing performance across web applications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-green-400 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Tools & technologies</h3>
                    <p className="text-gray-700 dark:text-gray-400">Git, GitHub, VS Code, Firebase, Postman, Cursor, Agile methodologies.</p>
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-6xl w-full">
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-16 text-blue-400">
              Projects
            </h1>

            <div className="space-y-16">
              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-0.5 h-32 bg-gradient-to-b from-blue-500 to-transparent"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2"></p>
                  <h2 className="text-3xl font-bold mb-2">AI Integration with Gemini</h2>
                  <p className="text-blue-400 mb-4">Tech Stack: Node.js, Google Generative AI SDK, OpenAI API</p>
                  <div className="border-l-4 border-blue-500 pl-6 py-2">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Integrated AI models into backend systems to generate smart, context-aware content responses via custom API endpoints.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-0.5 h-32 bg-gradient-to-b from-yellow-500 to-transparent"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2"></p>
                  <h2 className="text-3xl font-bold mb-2">💬 Real-Time Chat Application</h2>
                  <p className="text-yellow-400 mb-4">Tech Stack: Node.js, Express, Socket.io, MongoDB, React</p>
                  <div className="border-l-4 border-yellow-500 pl-6 py-2">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Developed a real-time chat app supporting one-to-one and group messaging with instant updates using Socket.io and MongoDB for message persistence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2"></p>
                  <h2 className="text-3xl font-bold mb-2">Hotel Booking & Admin App</h2>
                  <p className="text-orange-400 mb-4">Tech Stack: Node.js, Express.js, MongoDB, JWT</p>
                  <div className="border-l-4 border-orange-500 pl-6 py-2">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Created a hotel booking and admin app with user authentication, booking management, and admin dashboard using Node.js, Express.js, and MongoDB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Experience</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="text-blue-400 mt-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Backend Developer Intern — Mushafir Global</h3>
                    <p className="text-gray-500 text-sm italic mb-4">Nov 2025 – Present</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Working on backend development using Node.js, Express.js, and MongoDB.</li>
                      <li>Building and optimizing RESTful APIs for performance and scalability.</li>
                      <li>Collaborating with frontend developers to ensure seamless integration.</li>
                      <li>Implementing authentication and data management features.</li>
                      <li>Gaining hands-on experience in real-world project development and deployment.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-2 border-gray-200 dark:bg-[#1a1f2e] dark:border-blue-500 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-400 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Full Stack Development (MERN Stack)</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  JavaScript, React, Node.js, Express, MongoDB
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 dark:bg-[#1a1f2e] dark:border-yellow-500 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-yellow-400 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Programming</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  JavaScript, HTML, CSS, c++, SQL
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 dark:bg-[#1a1f2e] dark:border-red-500 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-red-400 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Tools & Technologies</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  Git, GitHub, VS Code, cursor, Agile methodologies
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 dark:bg-[#1a1f2e] dark:border-green-500 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Development</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  huggingface,ollama,LM Studio, OpenAI, LangChain
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Education</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="text-blue-400 mt-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Bachelor of Technology - CSE</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Seth jai parkash Mukand Lal Institute of Technology</p>
                    <p className="text-gray-500 text-sm italic">January 2022 - July 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-yellow-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="text-yellow-400 mt-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">DIPLOMA</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Seth jai parkash polytechnic college, Damla, Haryana</p>
                    <p className="text-gray-500 text-sm italic">2018-2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Certifications & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 dark:bg-[#1a1f2e] dark:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-blue-400 mt-1">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cyber Security Course</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Issued by honeywell</p>
                  </div>
                </div>
                    <p className="text-gray-700 dark:text-gray-300">Certification in Cyber Security with hands-on experience in enterprise implementations.</p>
                  </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-yellow-500 dark:bg-[#1a1f2e] dark:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-yellow-400 mt-1">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Full Stack Developer Course</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Issued by udemy (angela yu)</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Comprehensive training in JavaScript, react, node.js, express, mongodb.</p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-red-500 dark:bg-[#1a1f2e] dark:border-red-500/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-red-400 mt-1">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Git & GitHub Proficiency</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Version Control Expert</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Expertise in distributed version control systems, collaborative workflows.</p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-green-500 dark:bg-[#1a1f2e] dark:border-green-500/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-green-400 mt-1">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1m2-1v2.5M20 4l-2-1-2 1m2-1v2.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Node.js & Express.js </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm"> by Maximilian — Udemy </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Proficient backend development using Node.js and Express.js.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Let's Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <a
                href="mailto:shivamdhiman336@gmail.com"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-red-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 text-center group"
              >
                <Mail className="w-16 h-16 mx-auto mb-4 text-red-500 dark:text-red-400 group-hover:text-red-400 dark:group-hover:text-red-300" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-700 dark:text-gray-400">shivamdhiman336@gmail.com</p>
              </a>

              <a
                href="https://www.linkedin.com/in/shivam-dhiman-b35b76286"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 text-center group"
              >
                <Linkedin className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300" />
                <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                <p className="text-gray-700 dark:text-gray-400">/in/shivam-dhiman-b35b76286</p>
              </a>

              <a
                href="tel:+91-9992011619"   
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-green-500 dark:bg-[#1a1f2e] dark:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 text-center group"
              >
                <Phone className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400 group-hover:text-green-500 dark:group-hover:text-green-300" />
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-700 dark:text-gray-400">+91 9992011619</p>
              </a>
            </div>

            <div className="bg-gray-100 dark:bg-[#0f1420] py-8 rounded-t-3xl">
              <div className="flex justify-center gap-6 mb-4">
                <a
                  href="https://www.linkedin.com/in/shivam-dhiman-b35b76286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
                <a
                  href="https://github.com/shivam0786743"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <Github className="w-8 h-8" />
                </a>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-500 text-sm">
                &copy; 2025 SHIVAM DHIMAN. All Rights Reserved.
              </p>
            </div>
          </div>
        </section>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:transform hover:scale-110 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
