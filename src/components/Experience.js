// components/Experience.js

import React from 'react';
import styles from './styles/Experience.module.css';
import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      title: "Technical Lead / Software Development Engineer (Full Stack)",
      company: "Saint Louis University, $2M Research Initiative",
      duration: "Feb 2023 – Dec 2025",
      location: "St. Louis, MO",
      achievements: [
        "Owned end to end development of Where's Religion, a production web and mobile platform serving 2,000+ active users across iOS, Android, and web.",
        "Led delivery across 5 parallel feature tracks by managing 15 developers, resolving blockers, cutting scope, and shipping MVP under fixed funding and timeline constraints.",
        "Designed and shipped an LLM based content classification pipeline with prompt versioning and confidence thresholds, reducing manual moderation effort by approximately 70 percent.",
        "Built scalable frontend and backend systems using TypeScript, React, Next.js, React Native (Expo), and Firebase supporting geospatial datasets and cross platform synchronization.",
        "Owned production authentication, API integrations, caching strategies, and release stability across web and mobile clients."
      ],
      status: "Completed"
    },
    {
      title: "Software Development Engineer (Full Stack)",
      company: "University of Missouri, St. Louis",
      duration: "May 2025 – Oct 2025",
      location: "St. Louis, MO",
      achievements: [
        "Designed and implemented backend APIs using Node.js and Express including authentication, caching, and performance optimizations for production workloads.",
        "Translated ambiguous product requirements into shippable features by coordinating frontend and backend integration points.",
        "Worked within CI/CD pipelines to deliver reliable releases and debugged production issues affecting data flow and user experience."
      ],
      status: "Completed"
    },
    {
      title: "Software Engineer",
      company: "Eezee Business Machines",
      duration: "Jan 2021 – Jul 2022",
      location: "Mumbai, India",
      achievements: [
        "Built client facing dashboards and API integrations for IoT platforms processing real time device data.",
        "Defined and maintained API contracts consumed by multiple web and mobile client applications.",
        "Supported production systems with monitoring, alerting, and CI pipelines to maintain uptime and reliability."
      ],
      status: "Completed"
    },
    {
      title: "Full Stack Developer",
      company: "Headstrait Exceptional Software",
      duration: "Jun 2019 – Dec 2019",
      location: "Mumbai, India",
      achievements: [
        "Implemented Test-Driven Development (TDD) methodologies on a cricket analytics platform, utilizing Jest for unit testing to ensure code reliability.",
        "Developed full-stack features using React and MongoDB, integrating data scraping pipelines to aggregate and display real-time information.",
        "Maintained code quality using SonarQube and managed agile workflows via Jira, ensuring efficient delivery of software modules."
      ],
      status: "Completed"
    }
  ];

  return (
    <motion.div
      className={styles.experienceContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.experienceContent}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={styles.experienceCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.jobTitle}>
                <h2>{exp.title}</h2>
                <span className={`${styles.status} ${styles[exp.status.toLowerCase()]}`}>
                  {exp.status}
                </span>
              </div>
              <h3 className={styles.company}>{exp.company}</h3>
              <div className={styles.metaInfo}>
                <span className={styles.duration}>{exp.duration}</span>
                <span className={styles.location}>{exp.location}</span>
              </div>
            </div>
            <ul className={styles.achievements}>
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex}>{achievement}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Experience;
