// Chatbot Service for RAG API calls
// SECURITY NOTE: OpenAI API key should be stored in backend API, not frontend
// This service calls an external API endpoint (hosted separately on Vercel/Netlify)

const API_ENDPOINT = process.env.REACT_APP_CHATBOT_API_URL || 'https://your-api-endpoint.vercel.app/api/chat';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Only use if backend API unavailable

// Knowledge base chunks for RAG - Enhanced with detailed resume content
const knowledgeChunks = [
  {
    text: "Personal Information: Yash Bhatia is a Full-Stack Software Development Engineer II who works on both front-end and back-end development. He specializes in Front-End and Client-Side Engineering but also has strong back-end capabilities. Based in St. Louis, Missouri, United States. Contact: Email: ybhatia125@gmail.com, Phone: +1 (314) 814-6036. LinkedIn: linkedin.com/in/yashcoded, GitHub: github.com/yashcoded, Website: yashcoded.com",
    category: "personal"
  },
  {
    text: "Full-Stack Capabilities: Yash is a full-stack developer proficient in both front-end and back-end technologies. Front-End: TypeScript, JavaScript, React, Next.js, React Native, HTML, CSS, component-based architecture, responsive design, accessibility, performance optimization. Back-End: Node.js, Express, RESTful APIs, authentication, caching, database systems, server-side logic. He develops and documents RESTful APIs, implements authentication and caching, works with CI/CD pipelines, and integrates front-end applications with back-end services.",
    category: "skills"
  },
  {
    text: "Education: M.Sc. in Computer Science from Saint Louis University, St. Louis, MO, completed August 2022 – May 2024. Master's degree focused on advanced computer science concepts, algorithms, and software engineering principles.",
    category: "education"
  },
  {
    text: "Current Position: Software Developer at Saint Louis University, St. Louis, MO, February 2023 – Present. Created 3 tools for 8 developers, improving workflow efficiency by 25%. Coordinated Agile sprints with 6 teammates, managing 10+ Jira tasks per sprint. Onboarded and mentored 5 junior developers. Presented design updates to stakeholders, contributing to a $2M USD MVP launch. Leads client-side development for cross-platform web and mobile applications using TypeScript, React, Next.js, and React Native. Owns front-end architecture, component patterns, and state management for scalable UI systems.",
    category: "experience"
  },
  {
    text: "Experience: Software Developer at University of Missouri St. Louis, St. Louis, MO, June 2025 – September 2025. Developed museum web platform with AWS and Google Maps, used by 3,000+ monthly visitors. Cut data retrieval time by 35% with DynamoDB/S3 backend and ensured 99.9% uptime. Led a cross-functional team of 4 in designing React/Next.js UI for 200+ museum locations. Developed and documented RESTful APIs using Node.js and Express. Implemented authentication, caching, and performance optimizations.",
    category: "experience"
  },
  {
    text: "Experience: Senior Engineer at Eezee Business Machines, Mumbai, Maharashtra, India, January 2021 – July 2022. Integrated 10+ hardware systems with cloud infrastructure, boosting throughput by 20%. Reduced downtime by 15% by collaborating with support and operations teams. Improved release reliability from 30% to 75% via automation. Guided 2 interns on QA practices. Built client-facing dashboards and API integrations supporting IoT device platforms across multiple systems.",
    category: "experience"
  },
  {
    text: "Experience: Full Stack Engineer at Headstrait Exceptional Software, Mumbai, Maharashtra, India, June 2019 – December 2019. Engineered 5+ features with Test-Driven Development (TDD) approach, reducing bugs by 30%. Implemented CI/CD pipelines, cutting deployment time from 1 hour to 10 minutes. Collaborated with QA team for smooth releases. Created web-based software following Scrum Principles and TDD methodology, resulting in smoother and error-free software.",
    category: "experience"
  },
  {
    text: "Project: International Information Assistant - Built in 2024 using Next.js and TypeScript. A responsive client-side web app with structured data retrieval and API-driven workflows. Uses AI (ChatGPT API with custom prompts) to provide information to users about whether they require transit visas or not. Features AI-powered travel information platform for visa requirements and transit information with intelligent chatbot integration using OpenAI ChatGPT for personalized travel advice and real-time transit visa determinations.",
    category: "projects"
  },
  {
    text: "Project: Where's Religion - Full Stack, Mobile application built with React Native, Next.js, and Firebase (2023). Owned full-stack development including web frontend, React Native mobile app, and backend data workflows. Uses AI for generating tags for user content automatically. Designed shared UI patterns, data models, and synchronization logic across web and mobile clients. Reaches 1,000+ Monthly Active Users (MAUs). Deployed on wheresreligion.org.",
    category: "projects"
  },
  {
    text: "Project: Playlist Tracker - Built in 2024 using React and REST APIs. Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music. Integrated multiple third-party APIs into a typed client-side application with error handling and performance considerations. Built with Next.js 15, TypeScript, and Tailwind CSS.",
    category: "projects"
  },
  {
    text: "Project: Museum Web Platform - Museum web platform with AWS and Google Maps integration, used by 3,000+ monthly visitors. Cut data retrieval time by 35% with DynamoDB/S3 backend. Technologies: React.js, Next.js, AWS DynamoDB, S3, Google Maps API.",
    category: "projects"
  },
  {
    text: "Technical Skills - Languages: TypeScript (expert), JavaScript (expert), HTML (expert), CSS (expert), Python (advanced), Java (advanced), SQL (advanced), C/C++ (intermediate). Front-End Frameworks: React.js (expert), Next.js (advanced), React Native with Expo (advanced), EmberJS (familiarity). Back-End Technologies: Node.js (advanced), Express, Spring Boot (intermediate), RESTful APIs, authentication, caching, database systems, TDD (Test-Driven Development). Databases: MongoDB (advanced), PostgreSQL (advanced). Client-Side Concepts: Component-based architecture, responsive design, accessibility, performance optimization. APIs: REST, OpenAPI (reading and integration), GraphQL (basic). Testing: Jest, Playwright. DevOps: Git, GitHub Actions, Jenkins, Docker, CI/CD pipelines. Cloud: AWS (S3, CloudFront, DynamoDB, EC2), Google Cloud Platform (advanced), Firebase (advanced). AI/ML: OpenAI ChatGPT API (advanced), Claude AI (advanced), AI-powered content generation, prompt engineering, Computer Vision, NLP, Deep Learning, TensorFlow. Operating Systems: Linux (advanced), Ubuntu (advanced), Windows (expert), macOS (advanced), Kali Linux (intermediate), Android (intermediate). Development Tools: VS Code (expert), Cursor (expert), Android Studio (advanced), Anaconda (advanced), Visual Studio (intermediate), Sublime Text (intermediate), Nmap (intermediate), Wireshark (intermediate).",
    category: "skills"
  },
  {
    text: "Leadership Experience: International Ambassador at Saint Louis University, Global Grad Program, January 2023 – January 2024, St. Louis, MO. Delivered presentations and facilitated workshops for 200+ international students, showcasing strong communication and public speaking abilities. Coordinated cross-cultural events and maintained relationships with diverse student groups, demonstrating excellent interpersonal and organizational skills. Provided expert guidance on university resources and cultural integration, effectively translating complex information for international audiences. Represented the university in official capacities, presenting institutional initiatives and fostering community engagement.",
    category: "leadership"
  },
  {
    text: "Content Creation: YouTube Content Creator & Streamer (bhatiagamingtm), 2018 – Present. Gaming content creator, live streamer, and occasional vlogger. Created and presented content demonstrating strong verbal communication and explanation skills to diverse audiences. Developed ability to break down complex gaming strategies and concepts into easily digestible content for viewers. Built and maintained an engaged community through consistent content delivery and audience interaction. Honed public speaking and presentation skills through video content creation and live streaming sessions. YouTube channel: youtube.com/@bhatiagamingtm",
    category: "leadership"
  },
  {
    text: "Leadership and Collaboration: Yash leads cross-functional teams as a Team Lead, mentors junior contributors (has mentored 5+ juniors at SLU and 2 interns at Eezee), participates in Agile Scrum ceremonies, reviews pull requests, writes technical documentation, and collaborates with designers and front-end engineers. He improves usability through iterative UI refinement informed by usage instrumentation and stakeholder feedback. Has delivered presentations to 200+ people as International Ambassador.",
    category: "leadership"
  },
  {
    text: "Research Publication: Leveraging Computer Vision and Natural Language Processing for Object Detection and Localization (2024), ResearchGate Publication. Developed advanced AI system combining computer vision and NLP for enhanced object detection. Implemented deep learning models for real-time object localization and classification. Achieved significant improvements in accuracy and processing speed for complex visual recognition tasks. Technologies: Computer Vision, NLP, Deep Learning, Python, TensorFlow.",
    category: "research"
  },
  {
    text: "Research Publication: Predict Unknown Properties of Elements of Periodic Table with Machine Learning (2024), OPAST Publishers. Developed machine learning models to predict unknown properties of chemical elements in the periodic table. Utilized advanced regression techniques and feature engineering for atomic property prediction. Achieved high accuracy in predicting chemical characteristics and atomic properties. Published research contributing to computational chemistry and materials science applications. Technologies: Machine Learning, Data Science, Chemistry, Regression, Feature Engineering.",
    category: "research"
  },
  {
    text: "Research Publication: Semantic Web Search Engine (2019), International Journal of Scientific Research (IJSR). Developed intelligent search engine using DBpedia and SPARQL queries for semantic web technologies. Achieved 30% improvement in search accuracy and 15% faster response times compared to existing systems. Implemented advanced query processing algorithms for enhanced search relevance. Technologies: Semantic Web, SPARQL, DBpedia, Search Algorithms.",
    category: "research"
  },
  {
    text: "Architecture and Design: Yash owns front-end architecture, component patterns, and state management for scalable UI systems. He designs shared UI patterns, data models, and synchronization logic across web and mobile clients. He implements authentication, caching, and performance optimizations for scalable client-server interactions. Has led cross-functional teams of 4+ members and improved system performance by up to 35%.",
    category: "architecture"
  }
];

// Semantic keyword mapping for better matching
const semanticMap = {
  // Experience related
  'work': ['experience', 'job', 'employment', 'position', 'role', 'career'],
  'coding': ['development', 'programming', 'engineering', 'software'],
  'developer': ['engineer', 'programmer', 'software engineer', 'sde'],
  'frontend': ['front-end', 'client-side', 'ui', 'user interface', 'front end'],
  'backend': ['back-end', 'server-side', 'api', 'server', 'back end'],
  'fullstack': ['full-stack', 'full stack', 'fullstack', 'both front and back', 'end to end'],
  
  // Skills related
  'programming': ['coding', 'development', 'languages', 'tech stack'],
  'framework': ['library', 'technology', 'tool', 'stack'],
  'tech': ['technology', 'technologies', 'skills', 'tools'],
  'node': ['node.js', 'nodejs', 'express', 'server', 'backend'],
  'react': ['react.js', 'reactjs', 'frontend', 'ui'],
  
  // AI/ML related
  'ai': ['artificial intelligence', 'machine learning', 'ml', 'openai', 'chatgpt', 'gpt'],
  'chatgpt': ['openai', 'gpt', 'ai', 'chat bot', 'chatbot'],
  'prompt': ['prompt engineering', 'ai prompts', 'chatgpt prompts'],
  
  // Project related
  'app': ['application', 'project', 'website', 'platform'],
  'website': ['web app', 'web application', 'site', 'platform'],
  'mobile': ['react native', 'native app', 'mobile app'],
  
  // Education related
  'degree': ['education', 'graduation', 'university', 'college', 'school'],
  'masters': ['master', 'msc', 'graduate', 'postgraduate'],
  'bachelor': ['bachelor', 'b.e.', 'undergraduate', 'college degree'],
  
  // Role related
  'lead': ['leadership', 'team lead', 'manager', 'senior', 'mentor'],
  'architect': ['architecture', 'design', 'system design', 'planning'],
  'mentor': ['teaching', 'guiding', 'training', 'leadership'],
  
  // Contact related
  'reach': ['contact', 'email', 'phone', 'connect', 'get in touch'],
  'linkedin': ['professional', 'network', 'social'],
  'github': ['code', 'repository', 'open source', 'projects']
};

// Enhanced semantic keyword-based retrieval
function retrieveRelevantChunks(query, topK = 4) {
  const lowerQuery = query.toLowerCase();
  
  // Extract keywords (words longer than 2 characters)
  let keywords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  // Expand keywords with semantic mappings
  const expandedKeywords = new Set(keywords);
  keywords.forEach(keyword => {
    // Check if keyword exists in semantic map
    const key = Object.keys(semanticMap).find(k => keyword.includes(k) || k.includes(keyword));
    if (key && semanticMap[key]) {
      semanticMap[key].forEach(synonym => expandedKeywords.add(synonym));
    }
    // Also check reverse - if any semantic value matches keyword
    Object.keys(semanticMap).forEach(k => {
      if (semanticMap[k].some(s => keyword.includes(s) || s.includes(keyword))) {
        expandedKeywords.add(k);
        semanticMap[k].forEach(s => expandedKeywords.add(s));
      }
    });
  });
  
  keywords = Array.from(expandedKeywords);
  
  const scoredChunks = knowledgeChunks.map(chunk => {
    let score = 0;
    const lowerText = chunk.text.toLowerCase();
    const lowerCategory = chunk.category.toLowerCase();
    
    // Exact keyword matching (higher weight)
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 2; // Higher weight for direct matches
      }
      // Partial matches (word boundaries)
      const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'i');
      if (regex.test(lowerText)) {
        score += 1;
      }
    });
    
    // Category-based semantic matching
    const categoryKeywords = {
      'experience': ['work', 'job', 'employment', 'position', 'role', 'career', 'professional', 'employed', 'current role', 'company'],
      'projects': ['project', 'app', 'application', 'website', 'built', 'developed', 'created', 'portfolio'],
      'skills': ['skill', 'technology', 'tech', 'framework', 'tool', 'language', 'proficient', 'expert', 'know', 'technologies'],
      'education': ['education', 'degree', 'university', 'college', 'graduated', 'school', 'studied', 'masters', 'bachelor'],
      'leadership': ['lead', 'leadership', 'team', 'mentor', 'manage', 'guide', 'senior', 'architect', 'ambassador', 'youtube', 'content', 'streamer'],
      'architecture': ['architecture', 'design', 'system', 'scalable', 'pattern', 'structure', 'planning'],
      'research': ['research', 'publication', 'paper', 'journal', 'published', 'academic', 'study', 'semantic web', 'computer vision', 'machine learning', 'nlp']
    };
    
    Object.keys(categoryKeywords).forEach(cat => {
      if (categoryKeywords[cat].some(kw => lowerQuery.includes(kw))) {
        if (lowerCategory === cat) {
          score += 3; // Strong category match
        }
      }
    });
    
    // Specific job title matching
    if (lowerQuery.includes('frontend') || lowerQuery.includes('front-end') || lowerQuery.includes('client-side')) {
      if (lowerText.includes('front-end') || lowerText.includes('client-side')) score += 3;
    }
    
    if (lowerQuery.includes('full stack') || lowerQuery.includes('fullstack')) {
      if (lowerText.includes('full stack') || lowerText.includes('fullstack')) score += 3;
    }
    
    if (lowerQuery.includes('team lead') || lowerQuery.includes('leadership')) {
      if (lowerText.includes('team lead') || lowerText.includes('lead')) score += 3;
    }
    
    // Technology-specific matching
    const techKeywords = ['react', 'next.js', 'typescript', 'javascript', 'node', 'aws', 'api', 'rest'];
    techKeywords.forEach(tech => {
      if (lowerQuery.includes(tech) && lowerText.includes(tech)) {
        score += 2;
      }
    });
    
    return { chunk, score };
  });
  
  // Filter and sort by score
  const relevantChunks = scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(item => item.chunk);
  
  // If no chunks found, return top chunks by category
  if (relevantChunks.length === 0) {
    return knowledgeChunks.slice(0, topK);
  }
  
  return relevantChunks;
}

// Call backend API (preferred method)
async function callBackendAPI(message, conversationHistory) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      conversationHistory: conversationHistory.slice(-5),
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

// Call OpenAI directly (fallback - NOT RECOMMENDED for production)
async function callOpenAIDirectly(message, conversationHistory) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found. Please use backend API or set REACT_APP_CHATBOT_API_URL.');
  }

  // Retrieve relevant chunks using RAG
  const relevantChunks = retrieveRelevantChunks(message, 3);
  const context = relevantChunks.map(chunk => chunk.text).join('\n\n');

  const systemPrompt = `You are a professional AI assistant helping answer questions about Yash Bhatia, a Software Development Engineer II specializing in Front-End and Client-Side Engineering.

IMPORTANT GUIDELINES:
- Use ONLY the provided context to answer questions accurately
- Be specific and cite actual details from the resume (job titles, technologies, dates, achievements)
- For semantic questions (e.g., "coding" = "development", "frontend" = "front-end/client-side"), understand the context and provide relevant information
- Be concise but thorough - provide enough detail to be helpful
- Use professional language and maintain a friendly tone
- If information is not in the context, politely redirect: "I don't have that specific detail, but I can tell you about Yash's experience, projects, technical skills, or education."

RESPONSE STYLE:
- Use specific job titles: "Software Development Engineer (Front-End) / Team Lead" not just "developer"
- Mention exact technologies: "TypeScript, React, Next.js, React Native" not just "web technologies"
- Include relevant metrics: "3,000+ users", "1,000+ MAUs", "$2M MVP launch"
- Reference specific companies and locations when relevant

Keep responses under 250 words unless the user specifically asks for more detail.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-4).map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    })),
    {
      role: 'user',
      content: `Context:\n${context}\n\nQuestion: ${message}\n\nAnswer based on the context above:`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function sendMessage(message, conversationHistory = []) {
  try {
    // Debug: Check if env variables are loaded
    console.log('API_ENDPOINT:', API_ENDPOINT ? 'Set' : 'Not set');
    console.log('OPENAI_API_KEY:', OPENAI_API_KEY ? 'Set (length: ' + OPENAI_API_KEY.length + ')' : 'Not set');
    
    // Try backend API first (preferred)
    if (API_ENDPOINT && !API_ENDPOINT.includes('your-api-endpoint')) {
      return await callBackendAPI(message, conversationHistory);
    }
    
    // Fallback to direct OpenAI API (if backend unavailable)
    if (OPENAI_API_KEY) {
      console.warn('⚠️ Using OpenAI API directly from frontend. This exposes your API key. Use backend API for production!');
      return await callOpenAIDirectly(message, conversationHistory);
    }
    
    // If neither available, throw error
    throw new Error('No API endpoint or OpenAI key configured. Please set REACT_APP_CHATBOT_API_URL or REACT_APP_OPENAI_API_KEY in .env and RESTART your dev server.');
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    throw error;
  }
}

// Enhanced fallback response with semantic understanding
export function getFallbackResponse(query) {
  const lowerQuery = query.toLowerCase();
  
  // Contact information
  if (lowerQuery.match(/\b(email|contact|phone|reach|connect|linkedin|github|website)\b/)) {
    return "You can reach Yash at ybhatia125@gmail.com or call +1 (314) 814-6036. Connect on LinkedIn at linkedin.com/in/yashcoded, GitHub at github.com/yashcoded, or visit his website at yashcoded.com.";
  }
  
  // Current role / experience
  if (lowerQuery.match(/\b(current|now|present|currently|work|job|position|role|experience|career|employed)\b/)) {
    return "Yash is a Software Developer at Saint Louis University (Feb 2023 - Present). He created 3 tools for 8 developers, improving workflow efficiency by 25%. He coordinates Agile sprints with 6 teammates, managing 10+ Jira tasks per sprint. He has onboarded and mentored 5 junior developers and presented design updates to stakeholders, contributing to a $2M USD MVP launch. He works on both front-end (TypeScript, React, Next.js, React Native) and back-end (Node.js, Express, REST APIs) development. Previously worked at UMSL (Jun-Sep 2025), Eezee Business Machines (2021-2022), and Headstrait Exceptional Software (2019).";
  }
  
  // Projects / Portfolio
  if (lowerQuery.match(/\b(project|app|application|built|developed|created|portfolio|github|repository)\b/)) {
    return "Yash has built several full-stack projects: International Information Assistant (Next.js, TypeScript - uses AI/ChatGPT API with custom prompts to determine transit visa requirements), Where's Religion (React Native, Next.js, Firebase - uses AI for generating tags for user content, 1,000+ MAUs, wheresreligion.org), Playlist Tracker (React, REST APIs - PWA for bidirectional playlist transfer between YouTube, Spotify, Apple Music, Amazon Music), Museum Web Platform (React.js, Next.js, AWS - 3,000+ monthly visitors, 35% faster data retrieval), and Crypto Tracker (React.js, Netlify, CoinGecko API). Check out github.com/yashcoded for more details.";
  }
  
  // Skills / Technologies
  if (lowerQuery.match(/\b(skill|technology|tech|framework|language|proficient|expert|know|use|tools|stack|typescript|javascript|react|next|node)\b/)) {
    return "Yash is a full-stack developer with expertise in both front-end and back-end. Front-End: TypeScript, JavaScript, HTML, CSS, React, Next.js, React Native (Expo), EmberJS, component-based architecture, responsive design, accessibility, performance optimization. Back-End: Node.js, Express, RESTful APIs, authentication, caching, SQL, database systems. APIs: REST, OpenAPI, GraphQL (basic). AI/ML: OpenAI ChatGPT API integration, AI-powered content generation, prompt engineering. Testing: Jest, Playwright. DevOps: Git, GitHub Actions, Jenkins, Docker. Cloud: AWS (S3, CloudFront, DynamoDB), CI/CD pipelines.";
  }
  
  // Education
  if (lowerQuery.match(/\b(education|degree|graduate|masters|bachelor|university|college|school|studied|m.sc|b.e)\b/)) {
    return "Yash has an M.Sc. in Computer Science from Saint Louis University, St. Louis, MO (August 2022 - May 2024). Previously, he earned a B.E. in Computer Engineering from University of Mumbai, India (2016-2019). His master's degree focused on advanced computer science concepts, algorithms, and software engineering principles.";
  }
  
  // Leadership / Team Lead
  if (lowerQuery.match(/\b(lead|leadership|team|manage|mentor|guide|senior|architect|architecture|design)\b/)) {
    return "Yash serves as a Team Lead at Saint Louis University, where he mentors junior contributors, reviews pull requests, writes technical documentation, and participates in Agile Scrum ceremonies. He owns front-end architecture, component patterns, and state management for scalable UI systems. He leads cross-functional teams and collaborates with designers and front-end engineers.";
  }
  
  // Front-end / Client-side specific
  if (lowerQuery.match(/\b(frontend|front-end|client-side|ui|user interface|ux)\b/)) {
    return "Yash is a full-stack developer with strong front-end expertise. He specializes in Front-End and Client-Side Engineering using TypeScript, React, Next.js, and React Native. He owns front-end architecture, component patterns, and state management. He focuses on component-based architecture, responsive design, accessibility, and performance optimization for scalable UI systems. He also works on back-end development with Node.js, Express, and RESTful APIs.";
  }
  
  // Full stack / Backend
  if (lowerQuery.match(/\b(fullstack|full-stack|backend|back-end|server|api|rest|node|express)\b/)) {
    return "Yash is a full-stack developer working on both front-end and back-end. He develops RESTful APIs using Node.js and Express, implements authentication and caching, and works with CI/CD pipelines. At UMSL (Jun-Sep 2025), he developed and documented RESTful APIs, implemented authentication, caching, and performance optimizations. He integrates client-side applications with REST APIs using documented API contracts and has experience with GraphQL (basic). He also uses SQL and database systems for back-end development.";
  }
  
  // Resume / CV
  if (lowerQuery.match(/\b(resume|cv|curriculum vitae|download)\b/)) {
    return "You can download Yash's resume from the portfolio website. Look for the 'View Resume' or 'Download Resume' button. The resume contains detailed information about his experience as a Software Development Engineer II, projects, technical skills, and education.";
  }
  
  // AI related
  if (lowerQuery.match(/\b(ai|artificial intelligence|chatgpt|openai|machine learning|ml)\b/)) {
    return "Yash has extensive AI experience. In International Information Assistant, he uses ChatGPT API with custom prompts to determine transit visa requirements. In Where's Religion, he uses AI for automatically generating tags for user content. He has research publications in Computer Vision & NLP for object detection (2024) and Machine Learning for predicting periodic table properties (2024). Skills include OpenAI ChatGPT API, Claude AI, Computer Vision, NLP, Deep Learning, TensorFlow, and prompt engineering.";
  }
  
  // Leadership / Ambassador
  if (lowerQuery.match(/\b(ambassador|leadership|youtube|content creator|streamer|public speaking|presentation)\b/)) {
    return "Yash served as International Ambassador at Saint Louis University (Jan 2023 - Jan 2024), delivering presentations and workshops for 200+ international students. He coordinated cross-cultural events and provided guidance on university resources. He's also a YouTube Content Creator & Streamer (bhatiagamingtm, 2018 - Present), creating gaming content and building an engaged community. He has strong public speaking, communication, and presentation skills.";
  }
  
  // Research / Publications
  if (lowerQuery.match(/\b(research|publication|paper|journal|published|semantic web|computer vision|nlp)\b/)) {
    return "Yash has 3 published research papers: 1) Leveraging Computer Vision and NLP for Object Detection (ResearchGate, 2024) - AI system with deep learning models for object localization. 2) Predict Unknown Properties of Elements with Machine Learning (OPAST Publishers, 2024) - ML models for chemical element properties. 3) Semantic Web Search Engine (IJSR, 2019) - improved search accuracy by 30% and response time by 15% using DBpedia and SPARQL.";
  }
  
  // Headstrait / Earlier experience
  if (lowerQuery.match(/\b(headstrait|tdd|test driven|2019|early experience)\b/)) {
    return "Yash worked as Full Stack Engineer at Headstrait Exceptional Software in Mumbai, India (Jun-Dec 2019). He engineered 5+ features using Test-Driven Development (TDD), reducing bugs by 30%. He implemented CI/CD pipelines, cutting deployment time from 1 hour to 10 minutes. He collaborated with QA teams and followed Scrum Principles for error-free software delivery.";
  }
  
  // Default response
  return "I'm Yash's AI assistant! I can help answer questions about his experience as a Full-Stack Software Developer (SLU, UMSL, Eezee, Headstrait), projects (International Information, Where's Religion, Playlist Tracker, Museum Platform), research publications (Computer Vision, ML for Chemistry, Semantic Web), leadership roles (International Ambassador, YouTube Creator), technical skills (React, Next.js, TypeScript, Node.js, AI/ML), education (M.Sc. CS, B.E. Computer Engineering), and contact information. What would you like to know?";
}
