import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Welcome to the Vertex Digital dashboard! I am your AI assistant. How can I help you build and deploy today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!isVoiceMode) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_]/g, ''));
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage.text,
        userEmail: user?.email,
        userName: user?.name,
      });
      
      const aiMessage = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: response.data.reply || "I couldn't generate a response." 
      };
      
      setMessages(prev => [...prev, aiMessage]);
      speakText(aiMessage.text);
    } catch (error) {
      console.error("Chat Error:", error);
      const errMsg = 'Sorry, I encountered an error connecting to the server. Did you start the backend and add your API key?';
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: errMsg 
      }]);
      speakText(errMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true; // Show words as you speak

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
         setInput(prev => prev ? prev + ' ' + finalTranscript : finalTranscript);
      }
    };
    recognition.onerror = (event) => {
      console.error("Speech error", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Bot size={28} color="#8b5cf6" />
        <div>
          <h1>Real-Time AI Assistant</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10b981' }}>
            <div className="status-indicator"></div>
            Online & Connected
          </div>
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            type="button"
            onClick={() => {
              setIsVoiceMode(!isVoiceMode);
              if (!isVoiceMode) {
                 const utterance = new SpeechSynthesisUtterance("Voice mode activated.");
                 window.speechSynthesis.speak(utterance);
              } else {
                 window.speechSynthesis.cancel();
              }
            }}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title={isVoiceMode ? "Disable Voice Output" : "Enable Voice Output"}
          >
            {isVoiceMode ? <Volume2 size={24} color="#10b981" /> : <VolumeX size={24} color="#a78bfa" />}
          </button>
          <Sparkles size={20} color="#a78bfa" />
        </div>
      </div>

      <div className="messages-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            <div className="message-bubble markdown-container">
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper ai">
            <div className="message-bubble typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <form onSubmit={handleSend} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isTyping}
          />
          <button 
            type="button" 
            onClick={toggleListening}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              padding: '0 5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isListening ? '#ef4444' : 'var(--text-muted)'
            }}
            title={isListening ? "Stop recording" : "Dictate message"}
          >
            {isListening ? (
              <div style={{ animation: 'pulse 1.5s infinite' }}>
                <Mic size={20} />
              </div>
            ) : (
              <Mic size={20} />
            )}
          </button>
          <button type="submit" className="send-button" disabled={!input.trim() || isTyping}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
