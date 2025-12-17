// Knowledge Base for RAG Chatbot
export const knowledgeBase = {
  personalInfo: {
    name: "Yash Bhatia",
    title: "Full-Stack Developer & Computer Science Graduate",
    location: "St. Louis, Missouri, United States",
    email: "ybhatia125@gmail.com",
    phone: "+1 (314) 814-6036",
    linkedin: "https://www.linkedin.com/in/yashcoded/",
    github: "https://github.com/yashcoded",
    website: "https://yashcoded.com",
    twitter: "https://x.com/yashcoded",
    youtube: "https://youtube.com/@bhatiagamingtm"
  },
  education: [
    {
      degree: "M.Sc. in Computer Science",
      institution: "Saint Louis University",
      location: "St. Louis, MO",
      period: "Aug. 2022 – May 2024",
      status: "Completed",
      coursework: [
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
      institution: "University of Mumbai",
      location: "Mumbai, India",
      period: "2016 – 2019",
      status: "Completed",
      coursework: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Computer Networks",
        "Database Management Systems",
        "Software Engineering",
        "Operating Systems"
      ]
    }
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      company: "Saint Louis University",
      location: "St. Louis, MO",
      period: "Current",
      achievements: [
        "Architecting scalable web solutions serving 3,000+ users",
        "Leading cross-functional teams to deliver enterprise applications",
        "Contributing to $2M MVP launch",
        "Presenting technical strategies to stakeholders",
        "Building solutions serving 3,000+ users"
      ]
    },
    {
      title: "Graduate Assistant",
      company: "Saint Louis University",
      location: "St. Louis, MO",
      period: "2022 - 2024",
      achievements: [
        "Working as a Tech Lead for open-source projects",
        "Organizing Scrum Meetings and problem-solving sessions",
        "Building Software from Scratch while learning new technologies",
        "Ensuring Quality and following Scrum Principles"
      ]
    }
  ],
  projects: [
    {
      name: "Playlist Tracker",
      description: "Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music. Built with Next.js 15, TypeScript, and Tailwind CSS. Features include PWA capabilities, offline support, and secure architecture with no server-side data storage.",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "PWA", "YouTube API", "Spotify API", "Apple Music API"],
      url: "https://github.com/yashcoded/playlist_tracker",
      status: "Active"
    },
    {
      name: "Where's Religion",
      description: "App for religious landmark search, reaching 1,000+ Monthly Active Users (MAUs). Presented product updates to user groups. Deployed on wheresreligion.org, handling 1k+ monthly requests. Integrated media delivery and maps for 500+ sites with a 3-member dev team.",
      tech: ["React Native", "Next.js", "AWS", "Maps API", "Media Delivery"],
      url: "https://wheresreligion.org",
      status: "Active",
      metrics: "1,000+ MAUs"
    },
    {
      name: "Museum Web Platform",
      description: "Museum web platform with AWS/Google Maps, used by 3,000+ monthly visitors. Cut data retrieval time by 35% with DynamoDB/S3 backend. Ensured 99.9% uptime. Led a cross-functional team of 4 in designing React/Next.js UI for 200+ museum locations.",
      tech: ["React.js", "Next.js", "AWS", "DynamoDB", "S3", "Google Maps"],
      status: "Active",
      metrics: "3,000+ monthly visitors, 35% data retrieval improvement"
    },
    {
      name: "International Travel Information",
      description: "AI-powered travel companion for visa requirements and transit information. Integrated intelligent chatbot for personalized travel advice and follow-up questions. Developed comprehensive form system for route selection, layover details, and documentation guidance. Implemented real-time country search and validation with 227+ countries database.",
      tech: ["Next.js", "React", "AI Integration", "Vercel", "Travel API"],
      url: "https://internationalinformation.vercel.app/",
      status: "Active",
      metrics: "AI-powered travel assistance"
    },
    {
      name: "Crypto Tracker",
      description: "Dashboard for top 100 crypto assets with 60-second updates for 500+ users. Explained optimization strategies to teammates. Reduced load time by 25% using React hooks and lazy loading. Built with React.js, Netlify, and CoinGecko API integration.",
      tech: ["React.js", "Netlify", "CoinGecko API", "Performance Optimization"],
      url: "https://crypto-price-react-tracker.netlify.app",
      status: "Completed",
      metrics: "500+ users, 25% load reduction"
    }
  ],
  skills: {
    languages: {
      expert: ["JavaScript", "HTML", "CSS"],
      advanced: ["Python", "Java", "SQL"],
      intermediate: ["C/C++"]
    },
    frameworks: {
      expert: ["React.js", "Next.js"],
      advanced: ["Node.js", "MongoDB", "PostgreSQL", "React Native", "Expo"],
      intermediate: ["Spring Boot"]
    },
    cloud: {
      advanced: ["AWS (DynamoDB, S3, EC2)", "Google Cloud Platform", "Netlify"]
    },
    tools: {
      expert: ["VS Code"],
      advanced: ["Android Studio", "Anaconda", "Docker", "Git", "CI/CD Pipelines"]
    },
    operatingSystems: {
      expert: ["Windows"],
      advanced: ["Linux", "Ubuntu", "macOS"],
      intermediate: ["Kali Linux", "Android"]
    }
  },
  achievements: [
    "Built solutions serving 3,000+ users",
    "Contributed to $2M MVP launch",
    "Led cross-functional teams",
    "Presented technical strategies to stakeholders",
    "Delivered 15+ full-stack projects"
  ]
};

// Convert to searchable text chunks for RAG
export function getKnowledgeChunks() {
  const chunks = [];
  
  // Personal info chunk
  chunks.push({
    text: `Personal Information: ${knowledgeBase.personalInfo.name} is a ${knowledgeBase.personalInfo.title} based in ${knowledgeBase.personalInfo.location}. Contact information: Email: ${knowledgeBase.personalInfo.email}, Phone: ${knowledgeBase.personalInfo.phone}. LinkedIn: ${knowledgeBase.personalInfo.linkedin}, GitHub: ${knowledgeBase.personalInfo.github}, Website: ${knowledgeBase.personalInfo.website}`,
    category: "personal",
    metadata: knowledgeBase.personalInfo
  });
  
  // Education chunks
  knowledgeBase.education.forEach(edu => {
    chunks.push({
      text: `Education: ${edu.degree} from ${edu.institution} located in ${edu.location}, completed ${edu.period}. Status: ${edu.status}. Relevant coursework includes: ${edu.coursework.join(", ")}`,
      category: "education",
      metadata: edu
    });
  });
  
  // Experience chunks
  knowledgeBase.experience.forEach(exp => {
    chunks.push({
      text: `Work Experience: ${exp.title} at ${exp.company} (${exp.location}), ${exp.period}. Key achievements: ${exp.achievements.join(". ")}`,
      category: "experience",
      metadata: exp
    });
  });
  
  // Projects chunks
  knowledgeBase.projects.forEach(proj => {
    const urlText = proj.url ? ` Project URL: ${proj.url}` : "";
    const metricsText = proj.metrics ? ` Metrics: ${proj.metrics}` : "";
    chunks.push({
      text: `Project: ${proj.name} - ${proj.description}. Technologies used: ${proj.tech.join(", ")}. Status: ${proj.status}.${metricsText}${urlText}`,
      category: "projects",
      metadata: proj
    });
  });
  
  // Skills chunks
  const allLanguages = [
    ...knowledgeBase.skills.languages.expert,
    ...knowledgeBase.skills.languages.advanced,
    ...knowledgeBase.skills.languages.intermediate
  ];
  const allFrameworks = [
    ...knowledgeBase.skills.frameworks.expert,
    ...knowledgeBase.skills.frameworks.advanced,
    ...knowledgeBase.skills.frameworks.intermediate
  ];
  
  chunks.push({
    text: `Technical Skills: Programming Languages - Expert: ${knowledgeBase.skills.languages.expert.join(", ")}. Advanced: ${knowledgeBase.skills.languages.advanced.join(", ")}. Intermediate: ${knowledgeBase.skills.languages.intermediate.join(", ")}. Frameworks and Libraries - Expert: ${knowledgeBase.skills.frameworks.expert.join(", ")}. Advanced: ${knowledgeBase.skills.frameworks.advanced.join(", ")}. Cloud Platforms: ${knowledgeBase.skills.cloud.advanced.join(", ")}. Development Tools: ${knowledgeBase.skills.tools.expert.join(", ")}, ${knowledgeBase.skills.tools.advanced.join(", ")}`,
    category: "skills",
    metadata: knowledgeBase.skills
  });
  
  // Achievements chunk
  chunks.push({
    text: `Key Achievements: ${knowledgeBase.achievements.join(". ")}`,
    category: "achievements",
    metadata: { achievements: knowledgeBase.achievements }
  });
  
  return chunks;
}
