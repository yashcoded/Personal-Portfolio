// components/Participation.js

import React from 'react';
import styles from './styles/Participation.module.css';
import { motion } from 'framer-motion';

function Participation() {
  const participations = [
    {
      title: "International Ambassador",
      organization: "Saint Louis University",
      duration: "Jan. 2023 – Jan. 2024",
      location: "St. Louis, MO",
      description: "Global Grad at Saint Louis University",
      achievements: [
        "Helped organize events and maintain relations with international students",
        "Provided assistance related to university resources and cultural integration",
        "Participated in various events and coordinated multiple activities"
      ],
      status: "Completed"
    }
  ];

  return (
    <motion.div
      className={styles.participationContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.participationContent}>
        <h1 className={styles.title}>Leadership & Involvement</h1>
        {participations.map((participation, index) => (
          <motion.div
            key={index}
            className={styles.participationCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.roleTitle}>
                <h2>{participation.title}</h2>
                <span className={`${styles.status} ${styles[participation.status.toLowerCase()]}`}>
                  {participation.status}
                </span>
              </div>
              <h3 className={styles.organization}>{participation.organization}</h3>
              <p className={styles.description}>{participation.description}</p>
              <div className={styles.metaInfo}>
                <span className={styles.duration}>{participation.duration}</span>
                <span className={styles.location}>{participation.location}</span>
              </div>
            </div>
            <ul className={styles.achievements}>
              {participation.achievements.map((achievement, achIndex) => (
                <li key={achIndex}>{achievement}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Participation;
