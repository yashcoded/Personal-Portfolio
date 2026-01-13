// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio'; // Renamed from Home
import LandingPage from './components/LandingPage'; // New Landing Page
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Research from './components/Research';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import './components/styles/Slide.module.css';
import "./App.css"

// Component to handle dynamic title updates
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      switch (pathname) {
        case '/':
        case '/Personal-Portfolio/':
          return 'Yash Bhatia - Portfolio';
        case '/portfolio':
          return 'Full Portfolio - Yash Bhatia';
        case '/Personal-Portfolio/about':
          return 'About - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/skills':
          return 'Skills - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/experience':
          return 'Experience - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/education':
          return 'Education - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/projects':
          return 'Projects - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/research':
          return 'Research - Yash Bhatia Portfolio';
        case '/Personal-Portfolio/contact':
          return 'Contact - Yash Bhatia Portfolio';
        default:
          return 'Yash Bhatia - Full-Stack Developer Portfolio';
      }
    };

    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/Personal-Portfolio/' || location.pathname === '/Personal-Portfolio';

  return (
    <>
      <TitleUpdater />
      {!isLandingPage && <Navbar />}
      <Chatbot />
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Personal-Portfolio/" element={<LandingPage />} />
        <Route path="/Personal-Portfolio" element={<LandingPage />} />

        {/* Portfolio Page Route */}
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Individual Sections (Optional deep links) */}
        <Route path="/Personal-Portfolio/about" element={<About />} />
        <Route path="/Personal-Portfolio/skills" element={<Skills />} />
        <Route path="/Personal-Portfolio/experience" element={<Experience />} />
        <Route path="/Personal-Portfolio/education" element={<Education />} />
        <Route path="/Personal-Portfolio/projects" element={<Projects />} />
        <Route path="/Personal-Portfolio/research" element={<Research />} />
        <Route path="/Personal-Portfolio/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
