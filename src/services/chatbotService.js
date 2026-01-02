// Chatbot Service for RAG API calls
// SECURITY NOTE: OpenAI API key is stored securely in backend API, never in frontend
// This service calls an external API endpoint (must be hosted separately - GitHub Pages cannot run backend code)

const API_ENDPOINT = process.env.REACT_APP_CHATBOT_API_URL || 'https://your-api-endpoint.com/api/chat';

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

// Direct OpenAI API calls removed for security - API key must be stored in backend only

export async function sendMessage(message, conversationHistory = []) {
  try {
    // Check if backend API endpoint is configured
    if (!API_ENDPOINT || API_ENDPOINT.includes('your-api-endpoint')) {
      throw new Error('Backend API endpoint not configured. Please set REACT_APP_CHATBOT_API_URL in your environment variables. The API key must be stored securely in the backend, not in the frontend.');
    }
    
    // Only use backend API (secure method)
    return await callBackendAPI(message, conversationHistory);
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
