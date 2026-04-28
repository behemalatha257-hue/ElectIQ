'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#home', icon: '🏛️' },
  { label: 'Timeline', href: '#timeline', icon: '📅' },
  { label: 'Flashcards', href: '#flashcards', icon: '🃏' },
  { label: 'AI Guide', href: '#ai-chat', icon: '🤖' },
  { label: 'Innovations', href: '#innovations', icon: '💡' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => scrollTo('#home')}>
          <span className={styles.logoIcon}>🗳️</span>
          <span className={styles.logoText}>Elect<span className={styles.logoAccent}>IQ</span></span>
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                className={`${styles.link} ${active === link.href.replace('#','') ? styles.activeLink : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.ctaBtn} onClick={() => scrollTo('#ai-chat')}>
            Ask AI <span>→</span>
          </button>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.barTop : ''}></span>
            <span className={menuOpen ? styles.barMid : ''}></span>
            <span className={menuOpen ? styles.barBot : ''}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
