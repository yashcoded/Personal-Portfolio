import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/CallToAction.module.css';

const CallToAction = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Build Something Amazing?
          </motion.h2>
          
          <motion.p 
            className={styles.ctaDescription}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Let's collaborate on your next project. I bring expertise in full-stack development, 
            cloud architecture, and modern web technologies to deliver exceptional results.
          </motion.p>
          
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a 
              href="#contact" 
              className="btn btn-primary btn-large btn-icon hover-lift"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" />
              </svg>
              Start a Conversation
            </a>
            
            <a 
              href="https://drive.google.com/file/d/1RIb08dbHTMvMm8lwsb4aYg59K-dAn4ov/view?usp=share_link" 
              className="btn btn-outline btn-large btn-icon hover-lift"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
              </svg>
              Download Resume
            </a>
          </motion.div>
          
          <motion.div 
            className={styles.ctaStats}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>24h</span>
              <span className={styles.ctaStatLabel}>Response Time</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>100%</span>
              <span className={styles.ctaStatLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>5+</span>
              <span className={styles.ctaStatLabel}>Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
