// components/Projects.js

import React from 'react';
import styles from './styles/Projects.module.css';
import { motion } from 'framer-motion';
import { FaDatabase, FaMobile, FaMusic, FaGlobe, FaMedkit, FaLandmark, FaDesktop, FaRobot, FaUsers } from 'react-icons/fa';

function Projects() {
  const projects = [
    {
      title: "Where's Religion",
      place: "Saint Louis University",
      duration: "2023 – 2025",
      year: 2025,
      description: [
        "Owned end-to-end development of production web and mobile platform (wheresreligion.org) serving 2,000+ active users across iOS, Android, and web",
        "Web app: Next.js monorepo (packages/web, server, lrda-server-core) with Tiptap, shadcn, Firebase; mobile app: React Native, TypeScript, Expo (Lived Religion / LRDA), connecting to the same backend",
        "Led delivery across 5 parallel feature tracks, managing 15 developers and shipping MVP; designed LLM-based content classification pipeline, reducing manual moderation by 70%",
        "Open source: oss-slu/lrda_website (web), oss-slu/lrda_mobile (mobile)"
      ],
      url: "https://wheresreligion.org",
      techStack: ["TypeScript", "React", "Next.js", "React Native", "Expo", "Firebase", "LLM"],
      icon: [FaDesktop, FaMobile],
      status: "Active",
      metrics: "2,000+ active users · Web + Mobile"
    },
    {
      title: "Missouri Crossroads",
      place: "University of Missouri St. Louis",
      duration: "2025",
      year: 2025,
      description: [
        "Museum web platform for highlighting and preserving the history of Missouri; live at missouricrossroads.org, used by 3,000+ monthly visitors",
        "Cut data retrieval 35% with DynamoDB/S3 backend; ensured 99.9% uptime; led cross-functional team of 4 designing React/Next.js UI for 200+ locations",
        "Open source (GPL-3.0); Next.js, TypeScript, AWS Amplify, GitHub Actions; geographic and historical content with mapping and discovery"
      ],
      url: "https://missouricrossroads.org/",
      techStack: ["Next.js", "TypeScript", "AWS", "DynamoDB", "S3", "Google Maps", "Amplify"],
      icon: FaLandmark,
      status: "Active",
      metrics: "3,000+ monthly visitors"
    },
    {
      title: "International Travel Information",
      place: "Personal Project",
      duration: "2023",
      year: 2023,
      description: [
        "Built comprehensive AI-powered travel information platform for visa requirements and transit information",
        "Integrated intelligent chatbot using OpenAI for personalized travel advice and real-time Q&A",
        "Developed user-friendly form system for route selection, layover details, and documentation guidance",
        "Implemented real-time country search and validation with 227+ countries database; deployed on Vercel"
      ],
      url: "https://internationalinformation.vercel.app/",
      techStack: ["Next.js", "React", "OpenAI API", "AI Integration", "Vercel", "Travel API"],
      icon: FaGlobe,
      status: "Active",
      metrics: "AI-powered travel assistance"
    },
    {
      title: "Playlist Tracker",
      place: "Personal Project",
      duration: "2024",
      year: 2024,
      description: [
        "Built Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music",
        "Developed with Next.js 15 App Router, TypeScript, and Tailwind CSS; PWA features including offline support and installable app experience",
        "Designed secure architecture with no server-side data storage, ensuring user privacy and data protection"
      ],
      url: "https://github.com/yashcoded/playlist_tracker",
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "PWA", "YouTube API", "Spotify API", "Apple Music API"],
      icon: FaMusic,
      status: "Active",
      metrics: "Multi-platform playlist sync"
    },
    {
      title: "Manashray",
      place: "Personal Project",
      duration: "2025",
      year: 2025,
      description: [
        "Built professional website for Manashray — a psychiatry and mental health clinic (Making Mental Health Vital) for my friend Dr. Madhura Godbole Jani",
        "Showcases doctor profile, credentials (MBBS, MD Psychiatry, DNB), certifications, awards, and services (depression, anxiety, OCD, child & adolescent mental health, therapy, corporate workshops)",
        "Responsive design with contact info, location, appointment details, and bilingual (English/Hindi) support; manashraydrmadhura.in"
      ],
      url: "https://www.manashraydrmadhura.in/",
      techStack: ["React", "Responsive Web", "Healthcare", "Professional Site"],
      icon: FaMedkit,
      status: "Active",
      metrics: "manashraydrmadhura.in"
    },
    {
      title: "AI Agent Toolbox",
      place: "Personal Project",
      duration: "2025",
      year: 2025,
      description: [
        "Comprehensive AI agent system built with LangChain, FastAPI, and Next.js: streaming agents, tool calling, evaluations, and observability",
        "Multiple AI agents (Research, Code) with extensible tool registry (calculator, search, code analysis); SSE streaming, PostgreSQL metrics, Redis caching",
        "Next.js dashboard with chat, tool visualizer, and eval dashboard; Docker-ready with docker-compose; CI/CD via GitHub Actions (GPL-3.0)"
      ],
      url: "https://github.com/yashcoded/ai_agent_toolbox/tree/copilot/implement-ai-agent-toolbox",
      techStack: ["LangChain", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "SSE"],
      icon: FaRobot,
      status: "Active",
      metrics: "Research & Code agents · Eval framework"
    },
    {
      title: "Bhatia-Buzz",
      place: "Personal Project",
      duration: "2025",
      year: 2025,
      description: [
        "Sindhi community mobile app (Expo / React Native, TypeScript) with Instagram-like feed, request management, and matrimonial matching",
        "Firebase (Firestore, Auth, Storage, Functions, Cloud Messaging); Redux Toolkit, React Navigation; Instagram Graph API integration; pull-to-refresh, offline caching",
        "Playwright E2E (69 tests); Docker; CI pipeline (tests → Docker → Expo); admin moderation for requests and matrimonial profiles"
      ],
      url: "https://github.com/yashcoded/Bhatia-Buzz",
      techStack: ["Expo", "React Native", "TypeScript", "Firebase", "Redux", "Playwright"],
      icon: FaUsers,
      status: "Active",
      metrics: "Community app · 69 E2E tests"
    },
    {
      title: "Crypto Tracker",
      place: "Personal Project",
      duration: "2023",
      year: 2023,
      description: [
        "Developed dashboard for top 100 assets with 60s updates for 500+ users",
        "Reduced load 25% using React hooks and lazy loading; built with React.js, Netlify, and CoinGecko API"
      ],
      url: "https://btcvalestracker.netlify.app",
      techStack: ["React.js", "Netlify", "CoinGecko API", "Performance Optimization"],
      icon: FaDatabase,
      status: "Completed",
      metrics: "500+ users, 25% load reduction"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#00d4ff';
      case 'Maintained': return '#e50914';
      case 'Completed': return '#50fa7b';
      case 'Published': return '#ffd700';
      default: return '#b3b3b3';
    }
  };

  const projectsByYear = [...projects].sort((a, b) => (b.year || 0) - (a.year || 0));

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
    >
      {projectsByYear.map((project, index) => {
        const iconOrIcons = project.icon;
        const isIconArray = Array.isArray(iconOrIcons);
        return (
          <motion.div
            key={index}
            className={`${styles.card} ${project.url ? styles.clickableCard : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onClick={project.url ? () => window.open(project.url, '_blank', 'noopener,noreferrer') : undefined}
          >
            <div className={styles.cardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                {isIconArray
                  ? iconOrIcons.map((Icon, i) => <Icon key={i} size={24} color="#e50914" style={{ marginRight: i < iconOrIcons.length - 1 ? 4 : 0 }} />)
                  : (() => { const Icon = iconOrIcons; return <Icon size={24} color="#e50914" />; })()}
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              <div className={styles.cardSubtitle}>
                <span>{project.place}</span>
                <span style={{ color: getStatusColor(project.status) }}>•</span>
                <span style={{ color: getStatusColor(project.status) }}>{project.status}</span>
              </div>
              <div className={styles.cardDuration}>{project.duration}</div>
              {project.metrics && (
                <div className={styles.cardMetrics}>
                  <span className={styles.metricsText}>{project.metrics}</span>
                </div>
              )}
            </div>

            <div className={styles.cardDescription}>
              <ul>
                {project.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.techStack}>
              {project.techStack.map((tech, techIndex) => (
                <span key={techIndex} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Projects;
