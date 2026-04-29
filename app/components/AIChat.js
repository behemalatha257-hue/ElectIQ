'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';

const suggestedQuestions = [
  'How do I register to vote?',
  'What is the difference between primary and general elections?',
  'How does the Electoral College work?',
  'What ID do I need to bring to vote?',
  'What is gerrymandering?',
  'How are votes counted?',
  'What is early voting?',
  'Can I vote by mail?',
];

const quickTopics = [
  { icon: '📋', label: 'Registration', q: 'How do I register to vote and what are the requirements?' },
  { icon: '🗳️', label: 'Voting Day', q: 'What happens on election day and what should I bring?' },
  { icon: '📊', label: 'Vote Count', q: 'How are votes counted and verified after an election?' },
  { icon: '🏛️', label: 'Democracy', q: 'What makes a democracy legitimate and fair?' },
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm **ElectIQ AI**, your personal civic education guide powered by Gemini.\n\nI can help you understand:\n- 🗳️ How to register and vote\n- 📅 Election timelines & processes\n- 🏛️ How democracy works\n- ⚖️ Your voting rights\n- 🌍 Global election systems\n\nWhat would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingDots, setTypingDots] = useState(0);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setTypingDots(d => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, [loading]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  };

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setMessages(prev => [...prev, {
      role: 'user',
      content: userText,
      timestamp: new Date(),
    }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || "I'm sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Connection issue. Please check your API key configuration and try again.',
        timestamp: new Date(),
        isError: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <section id="ai-chat" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>🤖 AI-Powered</span>
          <h2 className={styles.sectionTitle}>
            Your Personal <span className={styles.accent}>Election Guide</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Ask anything about elections, voting rights, or the democratic process. Powered by Google Gemini.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.aiCard}>
              <div className={styles.aiAvatar}>
                <span className={styles.aiEmoji}>🤖</span>
                <div className={styles.aiOnline}></div>
              </div>
              <div>
                <div className={styles.aiName}>ElectIQ AI</div>
                <div className={styles.aiStatus}>Powered by Gemini</div>
              </div>
            </div>

            <div className={styles.sideSection}>
              <div className={styles.sideSectionTitle} id="quick-topics-label">Quick Topics</div>
              <div role="group" aria-labelledby="quick-topics-label">
                {quickTopics.map((t, i) => (
                  <button
                    key={i}
                    className={styles.quickTopic}
                    onClick={() => sendMessage(t.q)}
                    aria-label={`Learn more about ${t.label}`}
                  >
                    <span className={styles.topicIcon} aria-hidden="true">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sideSection}>
              <div className={styles.sideSectionTitle} id="suggested-questions-label">Suggested Questions</div>
              <div role="group" aria-labelledby="suggested-questions-label">
                {suggestedQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    className={styles.suggestBtn}
                    onClick={() => sendMessage(q)}
                    aria-label={`Ask: ${q}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.disclaimer} role="note">
              <span aria-hidden="true">ℹ️</span>
              <span>ElectIQ AI provides educational information. Always verify with official sources.</span>
            </div>
          </aside>

          {/* Chat window */}
          <div className={styles.chatWindow} role="log" aria-label="Chat messages" aria-live="polite">
            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${styles.messageRow} ${msg.role === 'user' ? styles.userRow : styles.assistantRow}`}
                >
                  {msg.role === 'assistant' && (
                    <div className={styles.msgAvatar}>🤖</div>
                  )}
                  <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble} ${msg.isError ? styles.errorBubble : ''}`}>
                    <div
                      className={styles.bubbleText}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    <div className={styles.timestamp}>{formatTime(msg.timestamp)}</div>
                  </div>
                  {msg.role === 'user' && (
                    <div className={styles.msgAvatar} style={{ background: 'rgba(99,102,241,0.2)' }}>👤</div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                  <div className={styles.msgAvatar}>🤖</div>
                  <div className={`${styles.bubble} ${styles.assistantBubble} ${styles.typingBubble}`}>
                    <div className={styles.typingDots}>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested quick messages */}
            <div className={styles.quickSuggests} role="group" aria-label="Suggested quick replies">
              {suggestedQuestions.slice(4).map((q, i) => (
                <button
                  key={i}
                  className={styles.quickSuggestBtn}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  aria-label={`Ask: ${q}`}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className={styles.inputArea}>
              <textarea
                ref={textareaRef}
                className={styles.input}
                placeholder="Ask about elections, voting rights, candidates..."
                value={input}
                onChange={e => { setInput(e.target.value); autoResize(); }}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
                aria-label="Your message to ElectIQ AI"
              />
              <button
                className={`${styles.sendBtn} ${loading ? styles.sending : ''}`}
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                {loading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  <span>↑</span>
                )}
              </button>
            </div>
            <div className={styles.inputHint}>Press Enter to send · Shift+Enter for new line</div>
          </div>
        </div>
      </div>
    </section>
  );
}
