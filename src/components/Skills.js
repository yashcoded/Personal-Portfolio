// components/Skills.js

import React from 'react';
import styles from './styles/Skills.module.css';
import { motion } from 'framer-motion';
import jsIcon from './icons/js.png';
import htmlIcon from './icons/html-5.png';
import cssIcon from './icons/css-3.png';
import pythonIcon from './icons/python.png';
import reactIcon from './icons/react.png';
import nodeIcon from './icons/node-js.png';
import sqlIcon from './icons/database.png';
import mongodbIcon from './icons/mongodb.png';
import javaIcon from './icons/java.png';
import cppIcon from './icons/c-.png';
import kaliIcon from './icons/kalilinux.png';
import windowsIcon from './icons/windows.png';
import androidIcon from './icons/android.png';
import macIcon from './icons/mac.png';
import ubuntuIcon from './icons/ubuntu.png';
import linuxIcon from './icons/linux.png';
import nmapIcon from './icons/nmap.png';
import wiresharkIcon from './icons/wireshark-64.png';
import psqlIcon from './icons/postgre.png';
import springBootIcon from './icons/spring-boot.png';
import vscodeIcon from './icons/visual-studio-code.png';
import androidStudioIcon from './icons/android-studio-48.png';
import visualStudioIcon from './icons/visual-studio.png';
import anacondaIcon from './icons/anaconda-48.png';
import sublimeIcon from './icons/sublime.png';
import nextjsIcon from './icons/nextjs.png';
import expoIcon from './icons/expo.png';

function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: jsIcon, level: "Expert" },
        { name: "Python", icon: pythonIcon, level: "Advanced" },
        { name: "Java", icon: javaIcon, level: "Advanced" },
        { name: "C/C++", icon: cppIcon, level: "Intermediate" },
        { name: "HTML", icon: htmlIcon, level: "Expert" },
        { name: "CSS", icon: cssIcon, level: "Expert" },
        { name: "SQL", icon: sqlIcon, level: "Advanced" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React.js", icon: reactIcon, level: "Expert" },
        { name: "Next.js", icon: nextjsIcon, level: "Advanced" },
        { name: "React Native", icon: reactIcon, level: "Advanced" },
        { name: "Expo", icon: expoIcon, level: "Advanced" },
        { name: "Node.js", icon: nodeIcon, level: "Advanced" },
        { name: "Spring Boot", icon: springBootIcon, level: "Intermediate" },
        { name: "MongoDB", icon: mongodbIcon, level: "Advanced" },
        { name: "PostgreSQL", icon: psqlIcon, level: "Advanced" }
      ]
    },
    {
      title: "Operating Systems",
      skills: [
        { name: "Linux", icon: linuxIcon, level: "Advanced" },
        { name: "Ubuntu", icon: ubuntuIcon, level: "Advanced" },
        { name: "Kali Linux", icon: kaliIcon, level: "Intermediate" },
        { name: "Windows", icon: windowsIcon, level: "Expert" },
        { name: "macOS", icon: macIcon, level: "Advanced" },
        { name: "Android", icon: androidIcon, level: "Intermediate" }
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "VS Code", icon: vscodeIcon, level: "Expert" },
        { name: "Android Studio", icon: androidStudioIcon, level: "Advanced" },
        { name: "Visual Studio", icon: visualStudioIcon, level: "Intermediate" },
        { name: "Anaconda", icon: anacondaIcon, level: "Advanced" },
        { name: "Sublime Text", icon: sublimeIcon, level: "Intermediate" },
        { name: "Nmap", icon: nmapIcon, level: "Intermediate" },
        { name: "Wireshark", icon: wiresharkIcon, level: "Intermediate" }
      ]
    }
  ];

  const getProgressWidth = (level) => {
    switch (level) {
      case 'Expert': return '95%';
      case 'Advanced': return '80%';
      case 'Intermediate': return '65%';
      case 'Beginner': return '40%';
      default: return '50%';
    }
  };

  return (
    <motion.div
      className={styles.skillsContainer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
    >
      <div className={styles.skillsContent}>
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className={styles.skillCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillsGrid}>
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className={styles.skillItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (categoryIndex * 0.1) + (skillIndex * 0.05) 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className={styles.skillIcon}
                  />
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}</span>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: getProgressWidth(skill.level) }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
