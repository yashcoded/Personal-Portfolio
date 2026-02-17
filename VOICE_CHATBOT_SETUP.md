# Voice Chatbot Setup Guide

This guide explains how to set up and deploy the LangChain-based voice chatbot for your portfolio.

## Features

- 🎤 **Voice Input**: Speech-to-text using Web Speech API
- 🔊 **Voice Output**: Text-to-speech using browser's built-in TTS
- 🧠 **LangChain Integration**: Advanced conversation memory and context
- ⚡ **Streaming Responses**: Real-time response streaming for better UX
- 💰 **Cost Optimized**: Uses GPT-3.5 Turbo + caching to minimize costs
- 🎯 **First-Person Responses**: Responds as if you (Yash) are speaking

## Architecture

```
Frontend (React)
  ├── VoiceChatbot Component
  │   ├── Speech Recognition (Web Speech API)
  │   ├── Speech Synthesis (Browser TTS)
  │   └── Streaming API Client
  │
Backend (Vercel Serverless)
  ├── /api/chat-langchain.js (Non-streaming LangChain endpoint)
  ├── /api/chat-stream.js (Streaming LangChain endpoint)
  └── /api/chat.js (Original fallback endpoint)
```

## Setup Instructions

### 1. Install Backend Dependencies

Navigate to the `chatbot-api` directory and install dependencies:

```bash
cd chatbot-api
npm install
```

This will install:
- `@langchain/openai` - LangChain OpenAI integration
- `@langchain/core` - Core LangChain functionality
- `@langchain/community` - Community integrations
- `langchain` - Main LangChain library

### 2. Configure Environment Variables

In your Vercel project settings, add the following environment variable:

```
OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: Never commit your API key to the repository. Always use environment variables.

### 3. Update Frontend Environment Variables

In your React app's `.env` file (or Vercel environment variables), add:

```env
REACT_APP_CHATBOT_API_URL=https://your-vercel-app.vercel.app/api/chat
REACT_APP_CHATBOT_LANGCHAIN_URL=https://your-vercel-app.vercel.app/api/chat-langchain
REACT_APP_CHATBOT_STREAM_URL=https://your-vercel-app.vercel.app/api/chat-stream
```

Replace `your-vercel-app.vercel.app` with your actual Vercel deployment URL.

### 4. Deploy Backend to Vercel

```bash
cd chatbot-api
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 5. Test the Voice Chatbot

1. Start your React development server:
   ```bash
   npm start
   ```

2. Open your portfolio in the browser
3. Look for the microphone button in the bottom-right corner
4. Click it to open the voice chatbot
5. Click the microphone button inside the chatbot to start speaking
6. The chatbot will:
   - Convert your speech to text
   - Send it to the LangChain backend
   - Stream the response back
   - Speak the response using TTS

## Browser Compatibility

### Speech Recognition (Input)
- ✅ Chrome/Edge: Full support
- ✅ Safari: Partial support (may need prefixes)
- ⚠️ Firefox: Limited support

### Speech Synthesis (Output)
- ✅ All modern browsers support TTS

**Note**: Speech Recognition requires HTTPS (or localhost) and microphone permissions.

## Cost Estimation

Using GPT-3.5 Turbo with caching:

- **Per conversation**: ~$0.001 - $0.005
- **Monthly (100 conversations)**: ~$0.10 - $0.50
- **Monthly (500 conversations)**: ~$0.50 - $2.50

The implementation includes:
- Response caching (1 hour TTL)
- GPT-3.5 Turbo (cost-effective model)
- Fallback to keyword matching for simple queries

## API Endpoints

### `/api/chat-langchain` (Non-streaming)
- **Method**: POST
- **Body**: 
  ```json
  {
    "message": "What is your experience?",
    "sessionId": "unique-session-id",
    "conversationHistory": []
  }
  ```
- **Response**: 
  ```json
  {
    "response": "I was a Technical Lead...",
    "sessionId": "unique-session-id",
    "cached": false
  }
  ```

### `/api/chat-stream` (Streaming)
- **Method**: POST
- **Body**: Same as above
- **Response**: Server-Sent Events (SSE) stream
  ```
  data: {"chunk": "I was", "done": false}
  data: {"chunk": " a Technical", "done": false}
  data: {"chunk": "", "done": true, "fullResponse": "I was a Technical Lead..."}
  ```

## Customization

### Change Voice (TTS)
Edit `src/components/VoiceChatbot.js`:

```javascript
const preferredVoice = voices.find(voice => 
  voice.name.includes('YourPreferredVoice') || 
  voice.lang.startsWith('en-US')
);
```

### Adjust Response Style
Edit the `systemPromptTemplate` in `chatbot-api/api/chat-langchain.js`:

```javascript
const systemPromptTemplate = `You are Yash Bhatia's AI voice assistant...
// Modify the prompt here
`;
```

### Add Voice Cloning (Optional)
To use your actual voice instead of browser TTS:

1. Sign up for ElevenLabs or similar service
2. Create a voice clone
3. Update `VoiceChatbot.js` to use their API instead of browser TTS

## Troubleshooting

### "Speech Recognition not supported"
- Use Chrome or Edge browser
- Ensure you're on HTTPS or localhost
- Check microphone permissions

### "API endpoint not configured"
- Verify environment variables are set
- Check that backend is deployed to Vercel
- Ensure CORS is properly configured

### "Streaming not working"
- Check browser console for errors
- Verify `REACT_APP_CHATBOT_STREAM_URL` is set
- Fallback to non-streaming will occur automatically

### High API costs
- Enable response caching (already implemented)
- Consider using GPT-3.5 instead of GPT-4
- Add rate limiting for production

## Next Steps

1. **Deploy**: Push your changes and deploy to Vercel
2. **Test**: Test the voice chatbot on different browsers
3. **Monitor**: Check Vercel logs and OpenAI usage
4. **Optimize**: Adjust caching and rate limits based on usage

## Support

For issues or questions:
- Check the browser console for errors
- Review Vercel function logs
- Verify environment variables are set correctly

---

**Note**: The voice chatbot uses browser-based speech recognition and synthesis. For production use with high traffic, consider using dedicated STT/TTS services like AssemblyAI, Google Cloud Speech, or ElevenLabs.
