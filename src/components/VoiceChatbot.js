import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './styles/VoiceChatbot.module.css';
import { sendMessageStream, getFallbackResponse } from '../services/chatbotService';

const WITTY_PROMPTS = [
  "Talk to me about Yash! 🎤",
  "Ask me anything! 🗣️",
  "I'm listening! 👂",
  "Ready to chat! 💬",
  "Speak to learn about Yash! 🎯"
];

const VoiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Yash's voice assistant. Click the microphone to ask me anything about his portfolio, experience, projects, skills, or education!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `voice-session-${Date.now()}`);
  
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const messagesEndRef = useRef(null);
  const conversationHistoryRef = useRef([]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('');
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          handleVoiceInput(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'no-speech') {
            speak("I didn't catch that. Please try again.");
          } else if (event.error === 'not-allowed') {
            speak("Microphone access denied. Please enable microphone permissions.");
          } else {
            speak("Sorry, there was an error with speech recognition. Please try again.");
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech Recognition not supported in this browser');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only: init speech recognition once; handlers are stable
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle body scroll when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Stop listening and speaking when closed
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isListening]);

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleVoiceInput = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    conversationHistoryRef.current.push(userMessage);
    setIsLoading(true);

    let fullResponse = '';

    try {
      // Use streaming for real-time feel
      fullResponse = await sendMessageStream(
        text.trim(),
        sessionId,
        conversationHistoryRef.current,
        (chunk, accumulated) => {
          // Update message in real-time as chunks arrive
          fullResponse = accumulated;
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant' && lastMessage.isStreaming) {
              lastMessage.content = accumulated;
              return newMessages;
            } else {
              return [...newMessages, {
                role: 'assistant',
                content: accumulated,
                isStreaming: true
              }];
            }
          });
        }
      );

      // Finalize message
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = fullResponse;
          lastMessage.isStreaming = false;
        } else {
          newMessages.push({
            role: 'assistant',
            content: fullResponse,
            isStreaming: false
          });
        }
        return newMessages;
      });

      // Update conversation history
      conversationHistoryRef.current.push({
        role: 'assistant',
        content: fullResponse
      });

      // Speak the response
      if (!isMuted) {
        speak(fullResponse);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const fallbackResponse = getFallbackResponse(text.trim());
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse
      }]);
      conversationHistoryRef.current.push({
        role: 'assistant',
        content: fallbackResponse
      });
      
      if (!isMuted) {
        speak(fallbackResponse);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isLoading) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        speak("Sorry, I couldn't start listening. Please try again.");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text) => {
    if (isMuted || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to use a more natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      (voice.lang.startsWith('en-US') && voice.name.includes('Natural'))
    ) || voices.find(voice => voice.lang.startsWith('en-US'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    synthesisRef.current = utterance;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Mute: stop current speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const [hoverPrompt, setHoverPrompt] = useState(WITTY_PROMPTS[0]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const randomPrompt = WITTY_PROMPTS[Math.floor(Math.random() * WITTY_PROMPTS.length)];
      setHoverPrompt(randomPrompt);
    } else {
      setShowPrompt(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Voice Chatbot Toggle Button */}
      <motion.div
        className={`${styles.chatbotToggleContainer} ${isOpen ? styles.hideOnMobile : ''}`}
        onMouseEnter={() => !isOpen && setShowPrompt(true)}
        onMouseLeave={() => setShowPrompt(false)}
        style={isOpen ? { zIndex: 1002 } : {}}
      >
        <AnimatePresence>
          {!isOpen && showPrompt && (
            <motion.div
              className={styles.hoverPrompt}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {hoverPrompt}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={styles.chatbotToggle}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle voice chatbot"
        >
          {isOpen ? <FaTimes /> : <FaMicrophone />}
        </motion.button>
      </motion.div>

      {/* Voice Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatbotWindow}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.chatbotHeader}>
              <div className={styles.chatbotHeaderContent}>
                <FaMicrophone className={styles.chatbotIcon} />
                <div>
                  <h3>Yash's Voice Assistant</h3>
                  <p>Ask me anything about the portfolio</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  className={styles.muteButton}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className={styles.chatbotMessages}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`${styles.message} ${styles[message.role]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.messageContent}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.voiceControls}>
              <div className={styles.microphoneContainer}>
                <motion.button
                  className={`${styles.microphoneButton} ${isListening ? styles.listening : ''} ${isSpeaking ? styles.speaking : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                  {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </motion.button>
                {transcript && (
                  <div className={styles.transcript}>
                    <strong>You said:</strong> {transcript}
                  </div>
                )}
                {isListening && (
                  <div className={styles.listeningIndicator}>
                    <span>Listening...</span>
                    <div className={styles.waveform}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                {isSpeaking && (
                  <div className={styles.speakingIndicator}>
                    <span>Speaking...</span>
                  </div>
                )}
              </div>
              <p className={styles.instruction}>
                {isListening 
                  ? "Speak now... Click again to stop" 
                  : isSpeaking 
                  ? "I'm speaking..." 
                  : "Click the microphone to ask a question"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceChatbot;
