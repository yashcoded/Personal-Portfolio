// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Research from './components/Research';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import './components/styles/Slide.module.css'; // Import the CSS module
import "./App.css"

// Component to handle dynamic title updates
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      switch (pathname) {
        case '/Personal-Portfolio/':
          return 'Yash Bhatia - Full-Stack Developer Portfolio';
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

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/Personal-Portfolio/" element={<Home />} />
        <Route path="/Personal-Portfolio" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/Personal-Portfolio/about" element={<About />} />
        <Route path="/Personal-Portfolio/skills" element={<Skills />} />
        <Route path="/Personal-Portfolio/experience" element={<Experience />} />
        <Route path="/Personal-Portfolio/education" element={<Education />} />
        <Route path="/Personal-Portfolio/projects" element={<Projects />} />
        <Route path="/Personal-Portfolio/research" element={<Research />} />
        <Route path="/Personal-Portfolio/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
