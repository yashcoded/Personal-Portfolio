import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-scroll';
import styles from './styles/Chatbot.module.css';
import { sendMessage, getFallbackResponse } from '../services/chatbotService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Yash's AI assistant. I can answer questions about his portfolio, experience, projects, skills, and education. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure the input is rendered on mobile
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
    
    // Prevent body scroll when chatbot is open on mobile
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      // Get conversation history for context
      const conversationHistory = [...messages, userMessage];
      
      // Try to get response from API
      const response = await sendMessage(currentInput, conversationHistory);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      // Fallback to simple keyword matching if API fails
      const fallbackResponse = getFallbackResponse(currentInput);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Handle mobile keyboard events
  const handleInputFocus = () => {
    // On mobile, scroll to input when focused
    if (window.innerWidth <= 768 && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  };

  // Function to parse message and create clickable section links
  const parseMessageWithLinks = (text) => {
    if (!text || typeof text !== 'string') return text;

    // Section mapping: keywords -> section IDs
    const sectionMap = {
      'projects?': 'projects',
      'project': 'projects',
      'portfolio': 'projects',
      'experience': 'experience',
      'work': 'experience',
      'job': 'experience',
      'employment': 'experience',
      'career': 'experience',
      'education': 'education',
      'degree': 'education',
      'university': 'education',
      'college': 'education',
      'skills?': 'skills',
      'skill': 'skills',
      'technology': 'skills',
      'technologies': 'skills',
      'tech': 'skills',
      'about': 'about',
      'background': 'about',
      'research': 'research',
      'publications?': 'research',
      'publication': 'research',
      'paper': 'research',
      'leadership': 'participation',
      'involvement': 'participation',
      'ambassador': 'participation',
      'youtube': 'participation',
      'content creator': 'participation',
      'contact': 'contact',
      'email': 'contact',
      'phone': 'contact',
      'linkedin': 'contact',
      'github': 'contact',
      'home': 'home'
    };

    let lastIndex = 0;

    // Create regex pattern for all section keywords
    const patterns = Object.keys(sectionMap).map(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      return { regex, sectionId: sectionMap[keyword] };
    });

    // Find all matches
    const matches = [];
    patterns.forEach(({ regex, sectionId }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          sectionId,
          text: match[0]
        });
      }
    });

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches (keep the first one)
    const filteredMatches = [];
    matches.forEach(match => {
      const overlaps = filteredMatches.some(existing => 
        (match.index >= existing.index && match.index < existing.index + existing.length) ||
        (existing.index >= match.index && existing.index < match.index + match.length)
      );
      if (!overlaps) {
        filteredMatches.push(match);
      }
    });

    // Build the JSX with clickable links
    if (filteredMatches.length === 0) {
      return text;
    }

    const result = [];
    filteredMatches.forEach((match, idx) => {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(text.substring(lastIndex, match.index));
      }
      
      // Add the clickable link
      result.push(
        <Link
          key={`link-${idx}`}
          to={match.sectionId}
          smooth={true}
          duration={500}
          className={styles.sectionLink}
          onClick={() => setIsOpen(false)} // Close chatbot when clicking a link
          spy={true}
        >
          {match.text}
        </Link>
      );
      
      lastIndex = match.index + match.length;
    });

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return <>{result}</>;
  };

  const wittyPrompts = [
    "Want to know about Yash? 🚀",
    "Ask me anything about Yash! 🤖",
    "I know everything about Yash! 💡",
    "Curious about Yash's work? Ask me! 💬",
    "Got questions about Yash? I've got answers! 🎯",
    "Want to know Yash's secrets? 😎",
    "Ask me about Yash's projects! ✨",
    "I can tell you about Yash's experience! 🚀",
    "Want to learn about Yash? Just ask! 💡",
    "Ask me about Yash's skills & projects! 🔍",
    "I'm Yash's AI - ask me anything! 🤖",
    "Want to know what Yash does? Let's chat! 💬",
    "I know all about Yash's portfolio! 🎯",
    "Curious about Yash? I'm here to help! ✨",
    "Ask me about Yash's background! 🚀",
    "Want details about Yash? Just ask! 💡"
  ];

  const [hoverPrompt, setHoverPrompt] = useState(wittyPrompts[0]);
  const [showPrompt, setShowPrompt] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const autoShowTimeoutRef = useRef(null);

  // Auto-show prompt when page loads (after 3 seconds)
  useEffect(() => {
    if (!isOpen) {
      autoShowTimeoutRef.current = setTimeout(() => {
        if (!isOpen) {
          const randomPrompt = wittyPrompts[Math.floor(Math.random() * wittyPrompts.length)];
          setHoverPrompt(randomPrompt);
          setShowPrompt(true);
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            setShowPrompt(false);
          }, 5000);
        }
      }, 3000); // Show after 3 seconds on page load
    }

    return () => {
      if (autoShowTimeoutRef.current) {
        clearTimeout(autoShowTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const randomPrompt = wittyPrompts[Math.floor(Math.random() * wittyPrompts.length)];
      setHoverPrompt(randomPrompt);
    } else {
      setShowPrompt(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!isOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowPrompt(true);
        setHoverPrompt(wittyPrompts[Math.floor(Math.random() * wittyPrompts.length)]);
      }, 300); // Faster delay on hover
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Keep prompt visible for a moment after mouse leaves
    setTimeout(() => {
      setShowPrompt(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (autoShowTimeoutRef.current) {
        clearTimeout(autoShowTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Chatbot Toggle Button - Hide on mobile when chatbot is open */}
      <motion.div
        className={`${styles.chatbotToggleContainer} ${isOpen ? styles.hideOnMobile : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={isOpen ? { zIndex: 1002 } : {}}
      >
        <AnimatePresence>
          {!isOpen && showPrompt && (
            <motion.div
              className={styles.hoverPrompt}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
          aria-label="Toggle chatbot"
        >
          {isOpen ? <FaTimes /> : <FaRobot />}
        </motion.button>
      </motion.div>

      {/* Chatbot Window */}
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
                <FaRobot className={styles.chatbotIcon} />
                <div>
                  <h3>Yash's AI Assistant</h3>
                  <p>Ask me anything about the portfolio</p>
                </div>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <FaTimes />
              </button>
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
                    {message.role === 'assistant' 
                      ? parseMessageWithLinks(message.content)
                      : message.content
                    }
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

            <div className={styles.chatbotInput}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={handleInputFocus}
                placeholder="Ask about Yash's experience, projects, or skills..."
                disabled={isLoading}
                aria-label="Chat input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={styles.sendButton}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
