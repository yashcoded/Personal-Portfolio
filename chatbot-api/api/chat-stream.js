// LangChain-based Streaming Chatbot API
// Real-time streaming responses for voice chatbot

import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai/embeddings";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Initialize OpenAI models with streaming enabled
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  streaming: true,
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: 300,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Same knowledge base as chat-langchain.js
const knowledgeBase = [
  "Personal Information: Yash Bhatia is a Full-Stack Developer & Computer Science Graduate based in St. Louis, Missouri, United States. Contact: Email: ybhatia125@gmail.com, Phone: +1 (314) 814-6036. LinkedIn: linkedin.com/in/yashcoded, GitHub: github.com/yashcoded, Website: yashcoded.com",
  "Education: M.Sc. in Computer Science from Saint Louis University located in St. Louis, MO, completed Aug. 2022 – May 2024. Status: Completed. Relevant coursework includes: Advanced Algorithms and Data Structures, Machine Learning and AI, Database Systems, Software Engineering, Computer Networks, Research Methods in Computer Science",
  "Education: B.E. in Computer Engineering from University of Mumbai located in Mumbai, India, completed 2016 – 2019. Status: Completed. Relevant coursework includes: Data Structures and Algorithms, Object-Oriented Programming, Computer Networks, Database Management Systems, Software Engineering, Operating Systems",
  "Work Experience: Technical Lead / Software Development Engineer at Saint Louis University (Feb 2023 - Dec 2025). Led a team of 15 developers, shipping the 'Where's Religion' platform to 2,000+ active users across web and mobile. Designed LLM-based content classification pipeline, reducing manual moderation by 70%. Built scalable systems with TypeScript, React, Next.js, React Native (Expo), and Firebase.",
  "Work Experience: Software Development Engineer at UMSL (May 2025 - Oct 2025). Designed and implemented backend APIs using Node.js and Express with authentication and caching. Coordinated frontend and backend integration and worked within CI/CD pipelines to deliver reliable releases.",
  "Work Experience: Software Engineer at Eezee Business Machines (2021-2022). Built client-facing dashboards and API integrations for IoT platforms. Defined API contracts and supported production systems with monitoring and CI pipelines.",
  "Work Experience: Full Stack Developer at Headstrait Exceptional Software (2019). Implemented Test-Driven Development (TDD) on a cricket analytics platform using Jest. Developed full-stack features using React and MongoDB, integrating data scraping pipelines. Maintained code quality using SonarQube and managed agile workflows via Jira.",
  "Project: Where's Religion - Production web and mobile platform serving 2,000+ active users across iOS, Android, and web. Built with TypeScript, React, Next.js, React Native (Expo), and Firebase. Technologies: TypeScript, React, Next.js, React Native, Firebase, AWS. Status: Active. URL: https://wheresreligion.org",
  "Project: Playlist Tracker - Progressive Web App (PWA) for bidirectional playlist transfer between YouTube, Spotify, Apple Music, and Amazon Music. Built with Next.js 15, TypeScript, and Tailwind CSS. Technologies: Next.js 15, TypeScript, Tailwind CSS, PWA, YouTube API, Spotify API, Apple Music API. Status: Active. URL: https://github.com/yashcoded/playlist_tracker",
  "Project: Museum Web Platform - Museum web platform with AWS/Google Maps, used by 3,000+ monthly visitors. Cut data retrieval time by 35% with DynamoDB/S3 backend. Technologies: React.js, Next.js, AWS, DynamoDB, S3, Google Maps. Status: Active.",
  "Project: International Travel Information - AI-powered travel information platform for visa requirements and transit information. Integrated intelligent chatbot using OpenAI. Technologies: Next.js, React, OpenAI API, AI Integration, Vercel. Status: Active. URL: https://internationalinformation.vercel.app/",
  "Project: Crypto Tracker - Dashboard for top 100 assets with 60s updates for 500+ users. Reduced load 25% using React hooks/lazy load. Technologies: React.js, Netlify, CoinGecko API. Status: Completed. URL: https://btcvalestracker.netlify.app",
  "Technical Skills: Programming Languages - Expert: JavaScript, TypeScript, HTML, CSS. Advanced: Python, Java, SQL. Intermediate: C/C++. Frameworks and Libraries - Expert: React.js, Next.js, React Native. Advanced: Node.js, MongoDB, PostgreSQL, Expo. Cloud Platforms: AWS (DynamoDB, S3, EC2, CloudFront), Google Cloud Platform, Netlify, Vercel. Development Tools: VS Code, Android Studio, Anaconda, Docker, Git, CI/CD Pipelines, Jest, Playwright.",
  "Research: Published 3 research papers: 1) Leveraging Computer Vision and NLP for Object Detection and Localization (ResearchGate, 2024) - AI system with deep learning models for object localization. 2) Predict Unknown Properties of Elements with Machine Learning (OPAST Publishers, 2024) - ML models for chemical element properties. 3) Semantic Web Search Engine (IJSR, 2019) - improved search accuracy by 30% using DBpedia and SPARQL.",
  "Current Status: Yash is currently looking for full-time opportunities as a Full Stack Engineer, Software Engineer, or Technical Lead. He specializes in React.js, Node.js, and cloud technologies, with experience leading teams and shipping production systems used by thousands."
];

// Initialize vector store
let vectorStore = null;

async function initializeVectorStore() {
  if (vectorStore) return vectorStore;

  const documents = knowledgeBase.map(
    (text, idx) => new Document({ pageContent: text, metadata: { id: idx } })
  );

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(documents);
  vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings);
  return vectorStore;
}

const systemPromptTemplate = `You are Yash Bhatia's AI voice assistant. You speak in first person as if you ARE Yash explaining about yourself.

IMPORTANT GUIDELINES:
- Use "I" and "me" - you ARE Yash
- Be conversational, natural, and friendly
- Be concise (2-3 sentences typically, longer only if asked for details)
- Sound enthusiastic and professional
- If asked something not in the context, politely redirect: "I don't have that specific information, but I'd be happy to tell you about my experience, projects, skills, or education."

Context about Yash:
{context}

Previous conversation:
{history}

Current question: {input}

Respond as Yash would, naturally and conversationally:`;

// Store conversation chains per session
const conversationChains = new Map();

function getOrCreateChain(sessionId) {
  if (!conversationChains.has(sessionId)) {
    const memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
      inputKey: "input",
      outputKey: "output",
    });

    const prompt = PromptTemplate.fromTemplate(systemPromptTemplate);

    const chain = new ConversationChain({
      llm,
      memory,
      prompt,
      verbose: false,
    });

    conversationChains.set(sessionId, { chain, memory });
  }
  return conversationChains.get(sessionId);
}

export default async function handler(req, res) {
  // CORS headers for streaming
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId = 'default', conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize vector store
    const store = await initializeVectorStore();

    // Retrieve relevant context using RAG
    const relevantDocs = await store.similaritySearch(message, 3);
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n');

    // Get or create conversation chain
    const { chain, memory } = getOrCreateChain(sessionId);

    // Load conversation history into memory
    if (conversationHistory.length > 0) {
      for (const msg of conversationHistory.slice(-4)) {
        if (msg.role === 'user') {
          await memory.saveContext(
            { input: msg.content },
            { output: '' }
          );
        } else if (msg.role === 'assistant') {
          const lastUserMsg = conversationHistory
            .slice(0, conversationHistory.indexOf(msg))
            .reverse()
            .find(m => m.role === 'user');
          if (lastUserMsg) {
            await memory.saveContext(
              { input: lastUserMsg.content },
              { output: msg.content }
            );
          }
        }
      }
    }

    // Stream response
    let fullResponse = '';
    
    const stream = await chain.stream({
      input: message,
      context: context,
    });

    // Send streaming chunks
    for await (const chunk of stream) {
      if (chunk.response) {
        const chunkText = chunk.response;
        fullResponse += chunkText;
        res.write(`data: ${JSON.stringify({ chunk: chunkText, done: false })}\n\n`);
      }
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({ chunk: '', done: true, fullResponse })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Streaming API error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message, done: true })}\n\n`);
    res.end();
  }
}
