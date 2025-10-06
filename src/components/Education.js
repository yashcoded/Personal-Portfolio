import React from 'react';
import styles from './styles/Education.module.css';
import { motion } from 'framer-motion';

function Education() {
  const educationData = [
    {
      degree: "M.Sc. in Computer Science",
      university: "Saint Louis University",
      duration: "Aug. 2022 – May 2024",
      location: "St. Louis, MO",
      status: "Completed",
      courses: [
        "Advanced Algorithms and Data Structures",
        "Machine Learning and AI",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Research Methods in Computer Science"
      ]
    },
    {
      degree: "B.E. in Computer Engineering",
      university: "University of Mumbai",
      duration: "2016 – 2019",
      location: "Mumbai, India",
      status: "Completed",
      courses: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Computer Networks",
        "Database Management Systems",
        "Software Engineering",
        "Operating Systems"
      ]
    }
  ];

  return (
    <div className={styles.educationWrapper}>
      <div className={styles.educationContainer}>
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className={styles.educationCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.degreeHeader}>
                <h2 className={styles.degreeTitle}>{edu.degree}</h2>
                <span className={styles.status}>{edu.status}</span>
              </div>
              <h3 className={styles.university}>{edu.university}</h3>
              <div className={styles.degreeInfo}>
                <span className={styles.duration}>{edu.duration}</span>
                <span className={styles.location}>{edu.location}</span>
              </div>
            </div>
            
            <div className={styles.coursesSection}>
              <h4 className={styles.coursesTitle}>Relevant Coursework</h4>
              <ul className={styles.coursesList}>
                {edu.courses.map((course, courseIndex) => (
                  <li key={courseIndex} className={styles.courseItem}>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Education;