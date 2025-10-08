// components/About.js

import React from 'react';
import styles from './styles/About.module.css';
import { motion } from 'framer-motion';
import myPhoto from './icons/my_photo.jpg';

function About() {
  return (
    <motion.div
      className={styles.about}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.aboutContainer}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <img src={myPhoto} alt="Yash Bhatia" />
          </div>
          <div className={styles.profileContent}>
            <h2 className={styles.profileTitle}>About Me</h2>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                My journey in technology began with a curiosity about how things work, which led me to pursue Computer Science 
                and eventually specialize in full-stack development. What drives me is the ability to create solutions that 
                genuinely help people and make their lives easier through technology.
              </p>
              <p className={styles.description}>
                I believe in the power of continuous learning and staying curious. Whether it's exploring new frameworks, 
                diving into research papers, or experimenting with emerging technologies, I'm always looking for ways to grow 
                and improve. Currently, I'm deepening my expertise in Blockchain technologies and Cloud DevOps practices, 
                staying ahead of industry trends. This mindset has helped me adapt quickly to new challenges and deliver innovative solutions.
              </p>
              <p className={styles.description}>
                When I'm not coding, you'll find me gaming, creating content, or exploring new technologies. I'm passionate 
                about sharing knowledge and have previously streamed on YouTube, combining my love for technology with content creation. 
                I believe that the best developers are those who never stop learning and always stay curious about the world around them.
              </p>
            </div>
            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>3,000+</span>
                <span className={styles.highlightText}>Monthly Users</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>3</span>
                <span className={styles.highlightText}>Published Papers</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>5+</span>
                <span className={styles.highlightText}>Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
