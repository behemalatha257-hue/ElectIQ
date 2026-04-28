'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const stats = [
  { value: '4.2B', label: 'Global Voters', icon: '🌍' },
  { value: '195', label: 'Countries', icon: '🗺️' },
  { value: '99%', label: 'Learn Faster with AI', icon: '🚀' },
  { value: '50+', label: 'Election Topics', icon: '📚' },
];

const floatingBadges = [
  { text: '🗳️ Register to Vote', delay: 0 },
  { text: '📊 Election Timeline', delay: 0.5 },
  { text: '🤖 AI Powered', delay: 1 },
  { text: '🏛️ Civic Learning', delay: 1.5 },
];

export default function Hero({ onStartChat }) {
  const [count, setCount] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => (c < 4200000000 ? c + 42000000 : 4200000000));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      {/* Animated background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>
      <div className={styles.grid}></div>

      {/* Floating badges */}
      <div className={styles.floatingBadges}>
        {floatingBadges.map((b, i) => (
          <div
            key={i}
            className={styles.floatingBadge}
            style={{ animationDelay: `${b.delay}s` }}
          >
            {b.text}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span>
          AI-Powered Civic Education Platform
          <span className={styles.eyebrowBadge}>NEW</span>
        </div>

        <h1 className={styles.title}>
          Understand Elections
          <br />
          <span className={styles.titleAccent}>Like Never Before</span>
        </h1>

        <p className={styles.subtitle}>
          ElectIQ combines AI-powered guidance, interactive flashcards, and
          immersive timelines to make civic education <strong>engaging, accessible,
          and unforgettable</strong> for every citizen.
        </p>

        <div className={styles.ctas}>
          <button className={styles.primaryCta} onClick={onStartChat}>
            <span className={styles.ctaIcon}>🤖</span>
            Ask AI Guide
            <span className={styles.ctaArrow}>→</span>
          </button>
          <a href="#timeline" className={styles.secondaryCta}
            onClick={e => { e.preventDefault(); document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Explore Timeline</span>
            <span>📅</span>
          </a>
        </div>

        {/* Stats row */}
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
