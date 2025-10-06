// components/Research.js

import React from 'react';
import styles from './styles/Research.module.css';
import { motion } from 'framer-motion';
import { FaDatabase, FaFileAlt } from 'react-icons/fa';

function Research() {
  const researchPapers = [
    {
      title: "Leveraging Computer Vision and Natural Language Processing for Object Detection and Localization",
      authors: "Yash Bhatia, et al.",
      journal: "ResearchGate Publication",
      year: "2024",
      description: [
        "Developed advanced AI system combining computer vision and NLP for enhanced object detection",
        "Implemented deep learning models for real-time object localization and classification",
        "Achieved significant improvements in accuracy and processing speed for complex visual recognition tasks",
        "Published research findings on object detection methodologies and performance optimization"
      ],
      url: "https://www.researchgate.net/publication/392754682_LEVERAGING_COMPUTER_VISION_AND_NATURAL_LANGUAGE_PROCESSING_FOR_OBJECT_DETECTION_AND_LOCALIZATION",
      techStack: ["Computer Vision", "NLP", "Deep Learning", "Python", "TensorFlow"],
      icon: FaFileAlt,
      status: "Published",
      metrics: "ResearchGate Publication"
    },
    {
      title: "Predict Unknown Properties of Elements of Periodic Table with Machine Learning",
      authors: "Yash Bhatia, et al.",
      journal: "OPAST Publishers",
      year: "2024",
      description: [
        "Developed machine learning models to predict unknown properties of chemical elements in the periodic table",
        "Utilized advanced regression techniques and feature engineering for atomic property prediction",
        "Achieved high accuracy in predicting chemical characteristics and atomic properties",
        "Published research contributing to computational chemistry and materials science applications"
      ],
      url: "https://www.opastpublishers.com/open-access-articles/predict-unknown-properties-of-elements-of-periodic-table-with-machine-learning.pdf",
      techStack: ["Machine Learning", "Data Science", "Chemistry", "Regression", "Feature Engineering"],
      icon: FaFileAlt,
      status: "Published",
      metrics: "Computational Chemistry Research"
    },
    {
      title: "Semantic Web Search Engine",
      authors: "Yash Bhatia, et al.",
      journal: "International Journal of Scientific Research (IJSR)",
      year: "2019",
      description: [
        "Developed intelligent search engine using DBpedia and SPARQL queries for semantic web technologies",
        "Achieved 30% improvement in search accuracy and 15% faster response times",
        "Implemented advanced query processing algorithms for enhanced search relevance",
        "Published comprehensive research on semantic web technologies and search optimization"
      ],
      url: "https://www.ijsr.net/getabstract.php?paperid=ART20196648",
      techStack: ["Semantic Web", "SPARQL", "DBpedia", "Search Algorithms", "Research"],
      icon: FaDatabase,
      status: "Published",
      metrics: "30% accuracy improvement"
    }
  ];

  function getStatusColor(status) {
    switch (status) {
      case 'Published': return '#50fa7b';
      case 'Under Review': return '#ffd700';
      case 'Draft': return '#b3b3b3';
      default: return '#b3b3b3';
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.researchContent}>
        <div className={styles.researchGrid}>
        {researchPapers.map((paper, index) => {
          const IconComponent = paper.icon;
          return (
                  <motion.div
                    key={index}
                    className={`${styles.paperCard} ${paper.url ? styles.clickableCard : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    onClick={paper.url ? () => window.open(paper.url, '_blank', 'noopener,noreferrer') : undefined}
                  >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <IconComponent size={24} color="#e50914" />
                  <h2 className={styles.paperTitle}>{paper.title}</h2>
                </div>
                <div className={styles.paperMeta}>
                  <span className={styles.authors}>{paper.authors}</span>
                  <span style={{ color: getStatusColor(paper.status) }}>•</span>
                  <span style={{ color: getStatusColor(paper.status) }}>{paper.status}</span>
                </div>
                <div className={styles.journalInfo}>
                  <span className={styles.journal}>{paper.journal}</span>
                  <span className={styles.year}>{paper.year}</span>
                </div>
                {paper.metrics && (
                  <div className={styles.paperMetrics}>
                    <span className={styles.metricsText}>{paper.metrics}</span>
                  </div>
                )}
              </div>

              <div className={styles.paperDescription}>
                <ul>
                  {paper.description.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.techStack}>
                {paper.techStack.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Research;
