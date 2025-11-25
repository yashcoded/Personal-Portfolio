// components/Projects.js

import React from 'react';
import styles from './styles/Projects.module.css';
import { motion } from 'framer-motion';
import { FaReact, FaDatabase, FaMobile, FaMusic } from 'react-icons/fa';

function Projects() {
  const projects = [
    {
      title: "Playlist Tracker",
      place: "Personal Project",
      duration: "November 2024 - Present",
      description: [
        "Built Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music",
        "Developed with Next.js 15 App Router, TypeScript, and Tailwind CSS for modern, responsive design",
        "Implemented PWA features including offline support, installable app experience, and optimized performance",
        "Designed secure architecture with no server-side data storage, ensuring user privacy and data protection"
      ],
      url: "https://github.com/yashcoded/playlist_tracker",
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "PWA", "YouTube API", "Spotify API", "Apple Music API"],
      icon: FaMusic,
      status: "Active",
      metrics: "Multi-platform playlist sync"
    },
    {
      title: "Where's Religion",
      place: "Saint Louis University",
      duration: "February 2023 - Present",
      description: [
        "Launched app for religious landmark search, reaching 1,000+ MAUs",
        "Presented product updates to user groups; deployed on wheresreligion.org, handling 1k+ monthly requests",
        "Integrated media delivery and maps for 500+ sites with a 3-member dev team"
      ],
      url: "https://wheresreligion.org",
      techStack: ["React Native", "Next.js", "AWS", "Maps API", "Media Delivery"],
      icon: FaMobile,
      status: "Active",
      metrics: "1,000+ MAUs"
    },
    {
      title: "Museum Web Platform",
      place: "University of Missouri St. Louis",
      duration: "June 2025 - Present",
      description: [
        "Developed museum web platform with AWS/Google Maps, used by 3,000+ monthly visitors",
        "Cut data retrieval 35% with DynamoDB/S3 backend; ensured 99.9% uptime",
        "Led a cross-functional team of 4 in designing React/Next.js UI for 200+ museum locations"
      ],
      techStack: ["React.js", "Next.js", "AWS", "DynamoDB", "S3", "Google Maps"],
      icon: FaReact,
      status: "Active",
      metrics: "3,000+ monthly visitors"
    },
    {
      title: "International Travel Information",
      place: "Personal Project",
      duration: "December 2023 - Present",
      description: [
        "Built AI-powered travel companion for visa requirements and transit information",
        "Integrated intelligent chatbot for personalized travel advice and follow-up questions",
        "Developed comprehensive form system for route selection, layover details, and documentation guidance",
        "Implemented real-time country search and validation with 227+ countries database"
      ],
      url: "https://internationalinformation.vercel.app/",
      techStack: ["Next.js", "React", "AI Integration", "Vercel", "Travel API"],
      icon: FaMobile,
      status: "Active",
      metrics: "AI-powered travel assistance"
    },
    {
      title: "Crypto Tracker",
      place: "Personal Project",
      duration: "September 2023",
      description: [
        "Developed dashboard for top 100 assets with 60s updates for 500+ users",
        "Explained optimization strategies to teammates; reduced load 25% using React hooks/lazy load",
        "Built with React.js, Netlify, and CoinGecko API integration"
      ],
      url: "https://crypto-price-react-tracker.netlify.app",
      techStack: ["React.js", "Netlify", "CoinGecko API", "Performance Optimization"],
      icon: FaDatabase,
      status: "Completed",
      metrics: "500+ users, 25% load reduction"
    },
    {
      title: "Hardware-Cloud Integration",
      place: "Eezee Business Machines",
      duration: "January 2021 - July 2022",
      description: [
        "Integrated 10+ hardware systems with cloud, boosting throughput 20%",
        "Reduced downtime 15% by collaborating with support and operations teams",
        "Improved release reliability from 30% to 75% via automation and guided 2 interns on QA practices"
      ],
      techStack: ["Cloud Integration", "Hardware Systems", "Automation", "CI/CD", "QA"],
      icon: FaDatabase,
      status: "Completed",
      metrics: "20% throughput boost, 75% reliability"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#00d4ff';
      case 'Maintained': return '#e50914';
      case 'Completed': return '#50fa7b';
      case 'Published': return '#ffd700';
      default: return '#b3b3b3';
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
    >
      {projects.map((project, index) => {
        const IconComponent = project.icon;
        return (
          <motion.div
            key={index}
            className={`${styles.card} ${project.url ? styles.clickableCard : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onClick={project.url ? () => window.open(project.url, '_blank', 'noopener,noreferrer') : undefined}
          >
            <div className={styles.cardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <IconComponent size={24} color="#e50914" />
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              <div className={styles.cardSubtitle}>
                <span>{project.place}</span>
                <span style={{ color: getStatusColor(project.status) }}>•</span>
                <span style={{ color: getStatusColor(project.status) }}>{project.status}</span>
              </div>
              <div className={styles.cardDuration}>{project.duration}</div>
              {project.metrics && (
                <div className={styles.cardMetrics}>
                  <span className={styles.metricsText}>{project.metrics}</span>
                </div>
              )}
            </div>

            <div className={styles.cardDescription}>
              <ul>
                {project.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.techStack}>
              {project.techStack.map((tech, techIndex) => (
                <span key={techIndex} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Projects;
