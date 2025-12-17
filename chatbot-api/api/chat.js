// Vercel Serverless Function for RAG Chatbot
// This file should be deployed separately to Vercel/Netlify

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Knowledge base chunks (simplified - in production, load from a file or database)
const knowledgeChunks = [
  {
    text: "Personal Information: Yash Bhatia is a Full-Stack Developer & Computer Science Graduate based in St. Louis, Missouri, United States. Contact: Email: ybhatia125@gmail.com, Phone: +1 (314) 814-6036. LinkedIn: linkedin.com/in/yashcoded, GitHub: github.com/yashcoded, Website: yashcoded.com",
    category: "personal"
  },
  {
    text: "Education: M.Sc. in Computer Science from Saint Louis University located in St. Louis, MO, completed Aug. 2022 – May 2024. Status: Completed. Relevant coursework includes: Advanced Algorithms and Data Structures, Machine Learning and AI, Database Systems, Software Engineering, Computer Networks, Research Methods in Computer Science",
    category: "education"
  },
  {
    text: "Education: B.E. in Computer Engineering from University of Mumbai located in Mumbai, India, completed 2016 – 2019. Status: Completed. Relevant coursework includes: Data Structures and Algorithms, Object-Oriented Programming, Computer Networks, Database Management Systems, Software Engineering, Operating Systems",
    category: "education"
  },
  {
    text: "Work Experience: Full-Stack Developer at Saint Louis University (St. Louis, MO), Current. Key achievements: Architecting scalable web solutions serving 3,000+ users. Leading cross-functional teams to deliver enterprise applications. Contributing to $2M MVP launch. Presenting technical strategies to stakeholders. Building solutions serving 3,000+ users",
    category: "experience"
  },
  {
    text: "Project: Playlist Tracker - Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music. Built with Next.js 15, TypeScript, and Tailwind CSS. Technologies used: Next.js 15, TypeScript, Tailwind CSS, PWA, YouTube API, Spotify API, Apple Music API. Status: Active. Project URL: https://github.com/yashcoded/playlist_tracker",
    category: "projects"
  },
  {
    text: "Project: Where's Religion - App for religious landmark search, reaching 1,000+ Monthly Active Users (MAUs). Technologies used: React Native, Next.js, AWS, Maps API, Media Delivery. Status: Active. Metrics: 1,000+ MAUs. Project URL: https://wheresreligion.org",
    category: "projects"
  },
  {
    text: "Project: Museum Web Platform - Museum web platform with AWS/Google Maps, used by 3,000+ monthly visitors. Cut data retrieval time by 35% with DynamoDB/S3 backend. Technologies used: React.js, Next.js, AWS, DynamoDB, S3, Google Maps. Status: Active. Metrics: 3,000+ monthly visitors, 35% data retrieval improvement",
    category: "projects"
  },
  {
    text: "Technical Skills: Programming Languages - Expert: JavaScript, HTML, CSS. Advanced: Python, Java, SQL. Intermediate: C/C++. Frameworks and Libraries - Expert: React.js, Next.js. Advanced: Node.js, MongoDB, PostgreSQL, React Native, Expo. Cloud Platforms: AWS (DynamoDB, S3, EC2), Google Cloud Platform, Netlify. Development Tools: VS Code, Android Studio, Anaconda, Docker, Git, CI/CD Pipelines",
    category: "skills"
  },
  {
    text: "Key Achievements: Built solutions serving 3,000+ users. Contributed to $2M MVP launch. Led cross-functional teams. Presented technical strategies to stakeholders. Delivered 15+ full-stack projects",
    category: "achievements"
  }
];

// Simple keyword-based retrieval (faster than vector embeddings for small knowledge base)
function retrieveRelevantChunks(query, topK = 3) {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  const scoredChunks = knowledgeChunks.map(chunk => {
    let score = 0;
    const lowerText = chunk.text.toLowerCase();
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    });
    
    // Bonus for category match
    if (lowerQuery.includes('project') && chunk.category === 'projects') score += 2;
    if (lowerQuery.includes('skill') && chunk.category === 'skills') score += 2;
    if (lowerQuery.includes('experience') && chunk.category === 'experience') score += 2;
    if (lowerQuery.includes('education') && chunk.category === 'education') score += 2;
    
    return { chunk, score };
  });
  
  return scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(item => item.chunk);
}

export default async function handler(req, res) {
  // Enable CORS for GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Retrieve relevant chunks using RAG
    const relevantChunks = retrieveRelevantChunks(message, 3);
    const context = relevantChunks.map(chunk => chunk.text).join('\n\n');

    // Build system prompt
    const systemPrompt = `You are a helpful AI assistant that answers questions about Yash Bhatia's portfolio and resume. 
Use only the provided context to answer questions. Be concise, professional, and friendly.
If the answer is not in the context, politely say "I don't have that specific information, but I can help you with questions about Yash's experience, projects, skills, or education."
Keep responses under 200 words unless more detail is specifically requested.`;

    // Build messages array
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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0].message.content;

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    
    // Return user-friendly error
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong. Please try again.'
    });
  }
}
