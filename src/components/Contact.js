import React from 'react';
import styles from './styles/Contact.module.css';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Contact() {
  const allContacts = [
    {
      type: "Email",
      value: "ybhatia125@gmail.com",
      url: "ybhatia125@gmail.com",
      icon: FaEnvelope,
      description: "Send me an email"
    },
    {
      type: "Phone",
      value: "+1 (314)-814-6036",
      url: "tel:+13148146036",
      icon: FaPhone,
      description: "Call me directly"
    },
    {
      type: "GitHub",
      value: "yashcoded",
      url: "https://github.com/yashcoded",
      icon: FaGithub,
      description: "View my code repositories"
    },
    {
      type: "LinkedIn",
      value: "yashcoded",
      url: "https://www.linkedin.com/in/yashcoded/",
      icon: FaLinkedin,
      description: "Connect professionally"
    },
    {
      type: "YouTube",
      value: "bhatiagamingtm",
      url: "https://www.youtube.com/@BhatiaGamingTM",
      icon: FaYoutube,
      description: "Watch my content"
    },
    {
      type: "X",
      value: "yashcoded",
      url: "https://x.com/yashcoded",
      icon: FaXTwitter,
      description: "Follow my updates"
    }
  ];

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        <div className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <div className={styles.contactGrid}>
            {allContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.contactCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => window.open(contact.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className={styles.cardIcon}>
                    <IconComponent size={28} color="#e50914" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{contact.type}</h3>
                    <p className={styles.cardValue}>{contact.value}</p>
                    <p className={styles.cardDescription}>{contact.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;