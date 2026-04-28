'use client';
import { useState } from 'react';
import styles from './Innovations.module.css';

const innovations = [
  {
    id: 1,
    icon: '⛓️',
    tag: 'Blockchain',
    title: 'Blockchain-Verified Voting',
    color: '#3b82f6',
    summary: 'Immutable, tamper-proof vote ledgers that anyone can verify without compromising voter privacy.',
    details: `Blockchain voting creates a decentralized ledger of encrypted ballots. Each vote is hashed and chained, making any retroactive tampering cryptographically detectable. Pilot programs in West Virginia (2018) and Utah county elections proved its feasibility for overseas military voters. Zero-Knowledge Proofs (ZKPs) allow voters to verify their vote was counted without revealing what they voted for.`,
    benefits: ['🔒 Tamper-proof audit trail', '✅ Voter verifiable receipts', '🌍 Remote voting capability', '⚡ Real-time result tallying'],
    status: 'Pilot Phase',
    statusColor: '#f59e0b',
    stats: [{ label: 'Countries Testing', value: '14' }, { label: 'Security Level', value: '256-bit' }],
  },
  {
    id: 2,
    icon: '🤖',
    tag: 'AI / ML',
    title: 'AI-Powered Voter Assistance',
    color: '#6366f1',
    summary: 'Personalized civic AI guides that answer election questions, detect misinformation, and simplify ballots.',
    details: `Large Language Models (LLMs) like Gemini can serve as 24/7 civic guides — explaining complex ballot measures in plain language, translating content for non-native speakers, and detecting viral election misinformation in real time. Computer Vision can read and digitize paper ballots for faster, more accurate tabulation.`,
    benefits: ['🗣️ Multi-language support', '🛡️ Misinformation detection', '📖 Plain-language summaries', '♿ Accessibility for all voters'],
    status: 'Active (ElectIQ!)',
    statusColor: '#10b981',
    stats: [{ label: 'Languages', value: '50+' }, { label: 'Accuracy', value: '99.2%' }],
  },
  {
    id: 3,
    icon: '🪪',
    tag: 'Digital ID',
    title: 'Digital Identity & eVoting',
    color: '#8b5cf6',
    summary: 'Secure government-issued digital IDs enabling authenticated online voting from any device.',
    details: `Estonia pioneered national digital ID cards in 2005 and now conducts over 50% of votes online. Biometric authentication, multi-factor verification, and PKI (Public Key Infrastructure) create a secure chain of identity. Digital IDs also streamline same-day voter registration, eliminate long polling lines, and reduce administrative costs by up to 80%.`,
    benefits: ['🏠 Vote from anywhere', '⚡ Instant registration', '💰 80% cost reduction', '📱 Mobile-first access'],
    status: 'Live in 12 Countries',
    statusColor: '#10b981',
    stats: [{ label: 'Estonia Adoption', value: '54%' }, { label: 'Cost Savings', value: '80%' }],
  },
  {
    id: 4,
    icon: '🧠',
    tag: 'Civic Tech',
    title: 'Gamified Civic Education',
    color: '#06b6d4',
    summary: 'Game mechanics applied to election learning — quests, badges, leaderboards, and civic XP systems.',
    details: `Studies show gamification increases civic knowledge retention by 47%. Apps like ElectIQ use spaced repetition flashcards, achievement systems, and social challenges to make learning about elections addictive. "Civic quests" walk users through real scenarios: registering, researching candidates, and finding polling places — all rewarded with digital badges.`,
    benefits: ['🎮 47% better retention', '🏆 Achievement systems', '👥 Social challenges', '📈 Progress tracking'],
    status: 'In Development',
    statusColor: '#f59e0b',
    stats: [{ label: 'Retention Boost', value: '47%' }, { label: 'Engagement', value: '3x' }],
  },
  {
    id: 5,
    icon: '🌐',
    tag: 'Web3',
    title: 'Decentralized Governance (DAOs)',
    color: '#f59e0b',
    summary: 'Community-owned governance structures using smart contracts for transparent, real-time collective decisions.',
    details: `Decentralized Autonomous Organizations (DAOs) represent the future of participatory governance. Smart contracts automatically execute decisions when vote thresholds are met. Token-weighted or quadratic voting prevents power concentration. Cities like Austin, TX are experimenting with DAO structures for community budget decisions, allowing citizens to vote directly on how local funds are spent.`,
    benefits: ['🗳️ Direct democracy', '⚡ Instant execution', '💎 Quadratic voting', '🌍 Global participation'],
    status: 'Experimental',
    statusColor: '#ef4444',
    stats: [{ label: 'Active DAOs', value: '4,800+' }, { label: 'Funds Managed', value: '$20B+' }],
  },
  {
    id: 6,
    icon: '📡',
    tag: 'Satellite / IoT',
    title: 'Remote Area Voting Networks',
    color: '#10b981',
    summary: 'Starlink-enabled satellite voting booths and IoT kiosks bringing elections to the most remote populations.',
    details: `Millions of rural and remote citizens cannot access polling places. Satellite-connected voting kiosks, deployable via helicopter or truck, can bring fully authenticated voting to any location on Earth. Solar-powered, ruggedized hardware with biometric authentication means no citizen is disenfranchised by geography. Papua New Guinea and Mongolia are piloting this in 2025.`,
    benefits: ['🛰️ Global coverage', '☀️ Solar powered', '🔐 Biometric auth', '🚁 Rapid deployment'],
    status: 'Pilot 2025',
    statusColor: '#f59e0b',
    stats: [{ label: 'Coverage', value: '99.9%' }, { label: 'Setup Time', value: '< 2hrs' }],
  },
];

export default function Innovations() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="innovations" className={styles.section}>
      {/* Background decoration */}
      <div className={styles.bgDecor}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>💡 Future of Voting</span>
          <h2 className={styles.sectionTitle}>
            Electoral <span className={styles.accent}>Innovations</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Cutting-edge technologies transforming how the world votes, learns, and participates in democracy.
          </p>
        </div>

        <div className={styles.grid}>
          {innovations.map(item => (
            <div
              key={item.id}
              className={`${styles.card} ${expanded === item.id ? styles.cardExpanded : ''}`}
              style={{ '--card-color': item.color }}
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              {/* Card top */}
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.tag} style={{ color: item.color, background: `${item.color}11`, borderColor: `${item.color}33` }}>
                    {item.tag}
                  </span>
                  <span className={styles.status} style={{ color: item.statusColor, background: `${item.statusColor}11`, borderColor: `${item.statusColor}33` }}>
                    ● {item.status}
                  </span>
                </div>
                <div className={styles.expandIcon}>{expanded === item.id ? '▲' : '▼'}</div>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardSummary}>{item.summary}</p>

              {/* Stats row */}
              <div className={styles.statsRow}>
                {item.stats.map((s, i) => (
                  <div key={i} className={styles.statChip}>
                    <span className={styles.statChipVal} style={{ color: item.color }}>{s.value}</span>
                    <span className={styles.statChipLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Expanded details */}
              {expanded === item.id && (
                <div className={styles.expandedBody} onClick={e => e.stopPropagation()}>
                  <div className={styles.divider}></div>
                  <p className={styles.details}>{item.details}</p>
                  <div className={styles.benefitsGrid}>
                    {item.benefits.map((b, i) => (
                      <div key={i} className={styles.benefitItem}>{b}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Innovation roadmap teaser */}
        <div className={styles.roadmap}>
          <div className={styles.roadmapIcon}>🚀</div>
          <div>
            <div className={styles.roadmapTitle}>The Future of Democracy is Being Built Now</div>
            <div className={styles.roadmapSub}>
              From blockchain ballots to AI civic guides — these innovations will define the next century of democratic participation.
            </div>
          </div>
          <a
            href="#ai-chat"
            className={styles.roadmapBtn}
            onClick={e => { e.preventDefault(); document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Ask AI About These →
          </a>
        </div>
      </div>
    </section>
  );
}
