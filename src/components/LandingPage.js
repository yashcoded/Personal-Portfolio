import React, { useEffect } from 'react';
import styles from './styles/LandingPage.module.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaUniversity, FaBriefcase, FaBook, FaFolderOpen, FaGraduationCap } from 'react-icons/fa';
import myPhoto from './icons/my_photo.jpg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    // Save original styles
    const originalBackground = document.body.style.background;
    const originalColor = document.body.style.color;
    const originalFont = document.body.style.fontFamily;

    // Apply light theme styles to body for Landing Page
    document.body.style.background = '#fcfcfc';
    document.body.style.color = '#333333';
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

    // Override Scrollbar for Landing Page
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.body.style.background = originalBackground;
      document.body.style.color = originalColor;
      document.body.style.fontFamily = originalFont;
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>Yash Bhatia</h1>
        <div className={styles.profileImageContainer}>
          <img src={myPhoto} alt="Yash Bhatia" className={styles.profileImage} />
        </div>
        
        <div className={styles.socialIcons}>
          <a href="https://www.linkedin.com/in/yashcoded" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaLinkedin />
          </a>
          <a href="https://github.com/yashcoded" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaGithub />
          </a>
          <a href="mailto:ybhatia125@gmail.com" className={styles.socialIcon}>
            <FaEnvelope />
          </a>
          <Link to="/portfolio" className={styles.socialIcon} title="View Full Portfolio">
            <FaFolderOpen />
          </Link>
        </div>
      </header>

      <div className={styles.introCard}>
        I am a product-focused <strong>Full Stack Engineer</strong> who ships and owns production systems used by thousands. 
        M.Sc. in Computer Science. Currently looking for full-time opportunities.
      </div>

      <div className={styles.interestCard}>
        I'm interested in Research, Full-Stack Development, Machine Learning, and building scalable enterprise applications.
      </div>

      <div className={styles.timelineSection}>
        
        {/* Work Experience - SLU (2025) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBriefcase size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2025</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>Technical Lead / Software Development Engineer (Full Stack) @ SLU</div>
            <div className={styles.itemDescription}>
              Owned end-to-end development of "Where's Religion", a platform serving 2,000+ active users. 
              Led delivery across 5 parallel feature tracks, managing 15 developers and shipping MVP. 
              Designed LLM-based content classification pipeline, reducing manual moderation by 70%.
            </div>
          </div>
        </div>

        {/* Work Experience - UMSL (2025) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBriefcase size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2025</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>Software Development Engineer (Full Stack) @ UMSL</div>
            <div className={styles.itemDescription}>
              Designed and implemented backend APIs using Node.js and Express with authentication and caching. 
              Coordinated frontend and backend integration and worked within CI/CD pipelines to deliver reliable releases.
            </div>
          </div>
        </div>

        {/* Research Paper 1 (2024) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBook size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2024</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>ResearchGate Publication</div>
            <div className={styles.itemDescription}>
              Published "<a href="https://www.researchgate.net/publication/392754682_LEVERAGING_COMPUTER_VISION_AND_NATURAL_LANGUAGE_PROCESSING_FOR_OBJECT_DETECTION_AND_LOCALIZATION" target="_blank" rel="noopener noreferrer">Leveraging Computer Vision and Natural Language Processing for Object Detection and Localization</a>". 
              Developed advanced AI system combining computer vision and NLP for enhanced object detection.
            </div>
          </div>
        </div>

        {/* Research Paper 2 (2024) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBook size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2024</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>OPAST Publication</div>
            <div className={styles.itemDescription}>
              Published "Predict Unknown Properties of Elements with Machine Learning". 
              Developed ML models to predict chemical element properties with high accuracy.
            </div>
          </div>
        </div>

        {/* Education (2024) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaGraduationCap size={28} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2024</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>M.Sc. in Computer Science</div>
            <div className={styles.itemDescription}>
              Graduated from <a href="https://www.slu.edu/" target="_blank" rel="noopener noreferrer">Saint Louis University</a>. 
              Specialized in Advanced Algorithms, Machine Learning, and Software Engineering.
            </div>
          </div>
        </div>

        {/* Work Experience - Eezee (2022) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBriefcase size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2022</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>Software Engineer @ Eezee Business Machines</div>
            <div className={styles.itemDescription}>
              Built client-facing dashboards and API integrations for IoT platforms. 
              Defined API contracts and supported production systems with monitoring and CI pipelines.
            </div>
          </div>
        </div>

        {/* Work Experience - Headstrait (2019) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBriefcase size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2019</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>Full Stack Developer @ Headstrait Exceptional Software</div>
            <div className={styles.itemDescription}>
              Implemented Test-Driven Development (TDD) on a cricket analytics platform using Jest. 
              Developed full-stack features using React and MongoDB, integrating data scraping pipelines. 
              Maintained code quality using SonarQube and managed agile workflows via Jira.
            </div>
          </div>
        </div>

        {/* Research Paper 2 (2019) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaBook size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2019</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>IJSR Publication</div>
            <div className={styles.itemDescription}>
              Published "<a href="https://www.ijsr.net/getabstract.php?paperid=ART20196648" target="_blank" rel="noopener noreferrer">Semantic Web Search Engine</a>". 
              Developed intelligent search engine using DBpedia and SPARQL queries, achieving 30% improvement in search accuracy.
            </div>
          </div>
        </div>

        {/* Education 2 (2019) */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineIcon}>
              <FaUniversity size={24} color="#0055a5" />
            </div>
            <span className={styles.timelineYear}>2019</span>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.itemTitle}>B.E. in Computer Engineering</div>
            <div className={styles.itemDescription}>
              Completed Bachelor's degree from University of Mumbai.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
