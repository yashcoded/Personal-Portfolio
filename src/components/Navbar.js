import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { BsX } from 'react-icons/bs';
import styles from './styles/Navbar.module.css';
import { motion } from 'framer-motion';

function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSetActive = (section) => {
    setActiveSection(section);
    if (menuActive) {
      setMenuActive(false);
    }
  };

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${menuActive ? styles.active : ''} ${scrolled ? styles.scrolled : ''}`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button className={styles['menu-icon']} onClick={handleMenuClick}>
  {menuActive ? <BsX /> : <span className={styles.signature}>ybhatia</span>}
</button>


      <ul className={`${styles['nav-links']} ${menuActive ? styles.active : ''}`}>
        <li>
        <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'home'}
            onClick={() => handleSetActive('home')}
          >
            Home
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'about'}
            onClick={() => handleSetActive('about')}
          >
            About
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="skills"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'skills'}
            onClick={() => handleSetActive('skills')}
          >
            Skills
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="experience"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'experience'}
            onClick={() => handleSetActive('experience')}
          >
            Experience
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="education"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'education'}
            onClick={() => handleSetActive('education')}
          >
            Education
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'projects'}
            onClick={() => handleSetActive('projects')}
          >
            Projects
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="research"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'research'}
            onClick={() => handleSetActive('research')}
          >
            Research
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="participation"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'participation'}
            onClick={() => handleSetActive('participation')}
          >
            Leadership
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className={styles.link}
            active={activeSection === 'contact'}
            onClick={() => handleSetActive('contact')}
          >
            Contact
          </ScrollLink>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
