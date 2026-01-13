import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/Home.module.css';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Participation from './Participation';
import { InView } from 'react-intersection-observer';
import Projects from './Projects';
import Research from './Research';
import Contact from './Contact';
import myPhoto from "./icons/my_photo.jpg";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 100 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2,
      ease: "easeOut",
      staggerChildren: 0.2
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  },
};

const Portfolio = () => {
  return (
    <motion.div
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <div id="home" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.heroText}
            variants={heroVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className={styles.heroTitle}
              variants={itemVariants}
            >
              Hi, I'm Yash Bhatia
            </motion.h1>
            <motion.p 
              className={styles.heroSubtitle}
              variants={itemVariants}
            >
              Computer Science Student & Full-Stack Developer
            </motion.p>
            <motion.p 
              className={styles.heroDescription}
              variants={itemVariants}
            >
              Results-driven Full-Stack Developer with M.Sc. in Computer Science, specializing in React.js, Node.js, and cloud technologies. 
              Currently architecting scalable web solutions at Saint Louis University, leading cross-functional teams to deliver enterprise applications. 
              Proven track record of building solutions serving 3,000+ users, presenting technical strategies to stakeholders, and contributing to a $2M MVP launch. 
              Passionate about leveraging cutting-edge technologies to drive innovation and business value.
            </motion.p>
            <motion.div 
              className={styles.heroButtons}
              variants={itemVariants}
            >
              <a 
                href="https://drive.google.com/file/d/1RIb08dbHTMvMm8lwsb4aYg59K-dAn4ov/view?usp=share_link" 
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
              <a 
                href="#projects" 
                className="btn btn-secondary"
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            variants={heroVariants}
            initial="hidden"
            animate="show"
          >
            <motion.img 
              src={myPhoto} 
              alt="Yash Bhatia" 
              className={styles.myPhoto}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
            />
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="about"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <h2 className={styles.sectionHeader}>About Me</h2>
              <About />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="skills" // Update the id attribute here to "skills"
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            >
              <h2 className={styles.sectionHeader}>Skills</h2>
              <Skills />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="experience"
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className={styles.sectionContainer}
            >
              <h2 className={styles.sectionHeader}>Experience</h2>
              <Experience />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="education"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className={styles.sectionContainer}
            >
              <h2 className={styles.sectionHeader}>Education</h2>
              <Education />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="projects"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className={styles.sectionContainer}
            >
              <h2 className={styles.sectionHeader}>Projects</h2>
              <Projects />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
              id="research"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className={styles.sectionContainer}
              style={{ marginTop: '6rem' }}
            >
              <h2 className={styles.sectionHeader}>Research Publications</h2>
              <Research />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
              id="participation"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className={styles.sectionContainer}
            >
              <h2 className={styles.sectionHeader}>Leadership & Involvement</h2>
              <Participation />
            </motion.div>
          )}
        </InView>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
            id="contact"
              ref={ref}
              variants={sectionVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <h2 className={styles.sectionHeader}>Contact</h2>
              <Contact />
            </motion.div>
          )}
        </InView>
    </motion.div>
  );
};

export default Portfolio;
