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
        "Delivered presentations and facilitated workshops for 200+ international students, showcasing strong communication and public speaking abilities",
        "Coordinated cross-cultural events and maintained relationships with diverse student groups, demonstrating excellent interpersonal and organizational skills",
        "Provided expert guidance on university resources and cultural integration, effectively translating complex information for international audiences",
        "Represented the university in official capacities, presenting institutional initiatives and fostering community engagement"
      ],
      status: "Completed",
      url: null
    },
    {
      title: "Content Creator & Streamer",
      organization: "YouTube (bhatiagamingtm)",
      duration: "2018 – Present",
      location: "Digital Platform",
      description: "Gaming content creator and live streamer",
      achievements: [
        "Created and presented content demonstrating strong verbal communication and explanation skills to diverse audiences",
        "Developed ability to break down complex gaming strategies and concepts into easily digestible content for viewers",
        "Built and maintained an engaged community through consistent content delivery and audience interaction",
        "Honed public speaking and presentation skills through video content creation and live streaming sessions"
      ],
      status: "Active",
      url: "https://www.youtube.com/@bhatiagamingtm"
    }
  ];

  return (
    <div className={styles.participationWrapper}>
      <motion.div
        className={styles.participationContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {participations.map((participation, index) => (
          <motion.div
            key={index}
            className={`${styles.participationCard} ${participation.url ? styles.clickableCard : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={participation.url ? () => window.open(participation.url, '_blank') : undefined}
            style={participation.url ? { cursor: 'pointer' } : {}}
          >
            <div className={styles.cardHeader}>
              <div className={styles.roleHeader}>
                <h2 className={styles.roleTitle}>{participation.title}</h2>
                <span className={`${styles.status} ${styles[participation.status.toLowerCase()]}`}>
                  {participation.status}
                </span>
              </div>
              <h3 className={styles.organization}>{participation.organization}</h3>
              <p className={styles.description}>{participation.description}</p>
              <div className={styles.roleInfo}>
                <span className={styles.duration}>{participation.duration}</span>
                <span className={styles.location}>{participation.location}</span>
              </div>
            </div>
            <div className={styles.achievementsSection}>
              <h4 className={styles.achievementsTitle}>Key Achievements</h4>
              <ul className={styles.achievements}>
                {participation.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className={styles.achievementItem}>{achievement}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Participation;
