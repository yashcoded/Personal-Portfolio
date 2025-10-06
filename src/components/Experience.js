// components/Experience.js

import React from 'react';
import styles from './styles/Experience.module.css';
import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      title: "Software Developer",
      company: "Saint Louis University",
      duration: "Feb. 2023 – Present",
      location: "St. Louis, MO",
      achievements: [
        "Created 3 tools for 8 developers, improving workflow efficiency 25%",
        "Coordinated Agile sprints with 6 teammates, managing 10+ Jira tasks per sprint",
        "Onboarded and mentored 5 juniors; presented design updates to stakeholders, contributing to 2M USD MVP launch"
      ],
      status: "Current"
    },
    {
      title: "Software Developer",
      company: "University of Missouri St. Louis",
      duration: "Jun. 2025 – Sept. 2025",
      location: "St. Louis, MO",
      achievements: [
        "Developed museum web platform with AWS/Google Maps, used by 3,000+ monthly visitors",
        "Cut data retrieval 35% with DynamoDB/S3 backend; ensured 99.9% uptime",
        "Led a cross-functional team of 4 in designing React/Next.js UI for 200+ museum locations"
      ],
      status: "Completed"
    },
    {
      title: "Senior Engineer",
      company: "Eezee Business Machines",
      duration: "Jan. 2021 – Jul. 2022",
      location: "Mumbai, Maharashtra, India",
      achievements: [
        "Integrated 10+ hardware systems with cloud, boosting throughput 20%",
        "Reduced downtime 15% by collaborating with support and operations teams",
        "Improved release reliability from 30% to 75% via automation and guided 2 interns on QA practices"
      ],
      status: "Completed"
    },
    {
      title: "Full Stack Engineer",
      company: "Headstrait Exceptional Software",
      duration: "Jun. 2019 – Dec 2019",
      location: "Mumbai, Maharashtra, India",
      achievements: [
        "Engineered 5+ features with TDD, reducing bugs 30%",
        "Implemented CI/CD pipelines, cutting deploy time from 1h to 10m; collaborated with QA team for smooth releases"
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
        <h1 className={styles.title}>Professional Experience</h1>
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
