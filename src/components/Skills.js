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
import nextjsIcon from './icons/nextjs.svg';
import expoIcon from './icons/expo.png';
import awsIcon from './icons/aws.png';
import cursorIcon from './icons/cursor.png';
import firebaseIcon from './icons/firebase.png';
import gcpIcon from './icons/gcp.png';
import openaiIcon from './icons/openai.png';
import claudeIcon from './icons/claude.png';
import emergentIcon from './icons/emergent.png';
import githubCopilotIcon from './icons/githubcopilot.png';
import playwrightIcon from './icons/playwright.png';

function Skills() {
  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: [
        { name: "React", icon: reactIcon, level: "Expert" },
        { name: "Next.js", icon: nextjsIcon, level: "Advanced" },
        { name: "React Native", icon: reactIcon, level: "Advanced" },
        { name: "Expo", icon: expoIcon, level: "Advanced" }
      ]
    },
    {
      title: "Backend & Data",
      skills: [
        { name: "Node.js", icon: nodeIcon, level: "Advanced" },
        { name: "Spring Boot", icon: springBootIcon, level: "Intermediate" },
        { name: "MongoDB", icon: mongodbIcon, level: "Advanced" },
        { name: "PostgreSQL", icon: psqlIcon, level: "Advanced" }
      ]
    },
    {
      title: "AI & GenAI",
      skills: [
        { name: "OpenAI API", icon: openaiIcon, level: "Advanced" },
        { name: "Claude", icon: claudeIcon, level: "Advanced" },
        { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain", level: "Advanced", iconWithBg: true },
        { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface", level: "Advanced" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", icon: awsIcon, level: "Advanced" },
        { name: "Firebase", icon: firebaseIcon, level: "Advanced" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker", level: "Advanced" },
        { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions", level: "Advanced" },
        { name: "GCP", icon: gcpIcon, level: "Advanced" }
      ]
    },
    {
      title: "Design & Coding Platforms",
      skills: [
        { name: "Figma", icon: "https://cdn.simpleicons.org/figma", level: "Advanced" },
        { name: "Cursor", icon: cursorIcon, level: "Expert" },
        { name: "VS Code", icon: vscodeIcon, level: "Expert" },
        { name: "GitHub Copilot", icon: githubCopilotIcon, level: "Advanced", iconWithBg: true },
        { name: "Emergent", icon: emergentIcon, level: "Advanced" },
        { name: "Android Studio", icon: androidStudioIcon, level: "Advanced" },
        { name: "Anaconda", icon: anacondaIcon, level: "Advanced" },
        { name: "Visual Studio", icon: visualStudioIcon, level: "Intermediate" },
        { name: "Sublime Text", icon: sublimeIcon, level: "Intermediate" }
      ]
    },
    {
      title: "Testing & Security",
      skills: [
        { name: "Jest", icon: "https://cdn.simpleicons.org/jest", level: "Advanced" },
        { name: "Playwright", icon: playwrightIcon, level: "Advanced", iconWithBg: true },
        { name: "Nmap", icon: nmapIcon, level: "Intermediate" },
        { name: "Wireshark", icon: wiresharkIcon, level: "Intermediate" }
      ]
    },
    {
      title: "Languages",
      skills: [
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript", level: "Advanced" },
        { name: "JavaScript", icon: jsIcon, level: "Expert" },
        { name: "Python", icon: pythonIcon, level: "Advanced" },
        { name: "Java", icon: javaIcon, level: "Advanced" },
        { name: "SQL", icon: sqlIcon, level: "Advanced" },
        { name: "HTML", icon: htmlIcon, level: "Expert" },
        { name: "CSS", icon: cssIcon, level: "Expert" },
        { name: "C/C++", icon: cppIcon, level: "Intermediate" }
      ]
    },
    {
      title: "Operating Systems",
      skills: [
        { name: "Windows", icon: windowsIcon, level: "Expert" },
        { name: "macOS", icon: macIcon, level: "Advanced" },
        { name: "Android", icon: androidIcon, level: "Intermediate" },
        { name: "Ubuntu", icon: ubuntuIcon, level: "Advanced" },
        { name: "Linux", icon: linuxIcon, level: "Advanced" },
        { name: "Kali Linux", icon: kaliIcon, level: "Intermediate" }
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
                  <span className={skill.iconWithBg ? styles.skillIconWrap : undefined}>
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className={styles.skillIcon}
                    />
                  </span>
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
