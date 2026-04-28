'use client';
import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Flashcards from './components/Flashcards';
import AIChat from './components/AIChat';
import Innovations from './components/Innovations';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function Home() {
  const chatRef = useRef(null);

  const scrollToChat = () => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <Hero onStartChat={scrollToChat} />

      {/* Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerBadge}>📅 Start Learning</span>
        <div className={styles.dividerLine}></div>
      </div>

      <Timeline />

      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerBadge}>🃏 Test Yourself</span>
        <div className={styles.dividerLine}></div>
      </div>

      <Flashcards />

      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerBadge}>🤖 AI Guide</span>
        <div className={styles.dividerLine}></div>
      </div>

      <AIChat ref={chatRef} />

      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerBadge}>💡 Future of Voting</span>
        <div className={styles.dividerLine}></div>
      </div>

      <Innovations />

      <Footer />
    </div>
  );
}
