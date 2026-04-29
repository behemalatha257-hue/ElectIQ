'use client';
import { useState, useEffect } from 'react';
import styles from './Flashcards.module.css';

const categories = ['All', 'Basics', 'Process', 'History', 'Rights', 'Tech'];

const cards = [
  { id: 1, category: 'Basics', front: 'What is a Democracy?', back: 'A system of government where citizens exercise power by voting for their representatives. It derives authority from the consent of the governed.', emoji: '🏛️', difficulty: 'Easy' },
  { id: 2, category: 'Basics', front: 'What is the Electoral College (USA)?', back: 'A body of 538 electors who formally elect the President. A candidate needs 270+ electoral votes to win.', emoji: '🗺️', difficulty: 'Medium' },
  { id: 3, category: 'Process', front: 'What is Gerrymandering?', back: 'Manipulating electoral district boundaries to favor a particular political party. Named after Governor Elbridge Gerry whose 1812 redistricting created a salamander-shaped district.', emoji: '🗂️', difficulty: 'Hard' },
  { id: 4, category: 'Process', front: 'What is a Primary Election?', back: 'A preliminary election where voters of a party choose their candidate to run in the general election. Can be open, closed, or semi-closed.', emoji: '🔑', difficulty: 'Easy' },
  { id: 5, category: 'Rights', front: 'What is the 19th Amendment?', back: 'Ratified in 1920, it granted American women the constitutional right to vote — a major victory of the suffrage movement.', emoji: '⚖️', difficulty: 'Medium' },
  { id: 6, category: 'Rights', front: 'What is the Voting Rights Act of 1965?', back: 'Landmark U.S. legislation that prohibits racial discrimination in voting, eliminating literacy tests and providing federal oversight of elections in discriminatory states.', emoji: '✊', difficulty: 'Medium' },
  { id: 7, category: 'History', front: 'When did women first vote in a national election?', back: 'New Zealand was first (1893), Australia followed (1902). In the US it was 1920. The UK granted full women\'s suffrage in 1928.', emoji: '📜', difficulty: 'Hard' },
  { id: 8, category: 'History', front: 'What is the oldest democracy?', back: 'Ancient Athens (c. 508 BC) is considered the birthplace of democracy. Modern democracies evolved from Enlightenment ideas in the 17th–18th centuries.', emoji: '🏺', difficulty: 'Medium' },
  { id: 9, category: 'Process', front: 'What is Ranked Choice Voting (RCV)?', back: 'Voters rank candidates in order of preference (1st, 2nd, 3rd...). If no candidate gets a majority, the last-place candidate is eliminated and votes are redistributed.', emoji: '📊', difficulty: 'Hard' },
  { id: 10, category: 'Tech', front: 'What is a Blockchain Voting System?', back: 'An experimental voting method that uses blockchain technology to create transparent, tamper-proof, and auditable vote records while preserving voter anonymity.', emoji: '⛓️', difficulty: 'Hard' },
  { id: 11, category: 'Tech', front: 'What is a Voter Information Platform?', back: 'Digital tools (websites/apps) that provide personalized voter guides, polling locations, ballot previews, and registration information.', emoji: '💻', difficulty: 'Easy' },
  { id: 12, category: 'Basics', front: 'What is a Referendum?', back: 'A direct vote by the entire electorate on a specific political question or proposed law. Example: Brexit was a referendum on UK leaving the EU.', emoji: '🗳️', difficulty: 'Medium' },
];

const diffColors = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

export default function Flashcards() {
  const [category, setCategory] = useState('All');
  const [flipped, setFlipped] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mode, setMode] = useState('grid'); // 'grid' | 'quiz'
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const filtered = cards.filter(c => category === 'All' || c.category === category);

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markCard = (id, isKnown) => {
    if (isKnown) {
      setKnown(prev => new Set([...prev, id]));
      setUnknown(prev => { const s = new Set(prev); s.delete(id); return s; });
    } else {
      setUnknown(prev => new Set([...prev, id]));
      setKnown(prev => { const s = new Set(prev); s.delete(id); return s; });
    }
    if (currentIdx < filtered.length - 1) setCurrentIdx(i => i + 1);
    else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setKnown(new Set());
    setUnknown(new Set());
    setFlipped({});
    setShowConfetti(false);
  };

  const quizCard = filtered[currentIdx];
  const progress = filtered.length > 0 ? ((known.size + unknown.size) / filtered.length) * 100 : 0;

  return (
    <section id="flashcards" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>🃏 Interactive Learning</span>
          <h2 className={styles.sectionTitle}>
            Election <span className={styles.accent}>Flashcards</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Master key election concepts through interactive study cards. Flip to reveal, track your progress.
          </p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <nav className={styles.categoryPills} aria-label="Flashcard Categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catPill} ${category === cat ? styles.catActive : ''}`}
                onClick={() => { setCategory(cat); setCurrentIdx(0); resetQuiz(); }}
                aria-pressed={category === cat}
                aria-label={`Show ${cat} cards`}
              >
                {cat}
              </button>
            ))}
          </nav>
          <div className={styles.modeSwitcher} role="tablist" aria-label="Study Mode">
            <button
              className={`${styles.modeBtn} ${mode === 'grid' ? styles.modeActive : ''}`}
              onClick={() => setMode('grid')}
              role="tab"
              aria-selected={mode === 'grid'}
              aria-label="Grid View"
            >
              ⊞ Grid
            </button>
            <button
              className={`${styles.modeBtn} ${mode === 'quiz' ? styles.modeActive : ''}`}
              onClick={() => { setMode('quiz'); resetQuiz(); }}
              role="tab"
              aria-selected={mode === 'quiz'}
              aria-label="Quiz Mode"
            >
              🎯 Quiz Mode
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className={styles.statsBar} aria-live="polite" aria-label="Learning Progress">
          <span className={styles.stat}><span className={styles.statNum}>{filtered.length}</span> Cards</span>
          <span className={styles.stat}><span className={styles.statNum} style={{color:'#10b981'}}>{known.size}</span> Known ✓</span>
          <span className={styles.stat}><span className={styles.statNum} style={{color:'#ef4444'}}>{unknown.size}</span> Review ✗</span>
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.stat}><span className={styles.statNum}>{Math.round(progress)}%</span></span>
        </div>

        {/* Confetti celebration */}
        {showConfetti && (
          <div className={styles.celebration}>
            🎉 You've completed this deck! {known.size}/{filtered.length} known — Great work!
          </div>
        )}

        {/* GRID MODE */}
        {mode === 'grid' && (
          <div className={styles.grid}>
            {filtered.map(card => (
              <div
                key={card.id}
                className={`${styles.cardWrapper} ${flipped[card.id] ? styles.isFlipped : ''}`}
                onClick={() => toggleFlip(card.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(card.id); } }}
                role="button"
                tabIndex="0"
                aria-label={`Flashcard about ${card.front}. ${flipped[card.id] ? 'Showing answer.' : 'Click to flip.'}`}
                aria-expanded={flipped[card.id] || false}
              >
                <div className={styles.cardInner}>
                  {/* Front */}
                  <div className={styles.cardFront}>
                    <div className={styles.cardDifficulty} style={{ color: diffColors[card.difficulty], borderColor: `${diffColors[card.difficulty]}44`, background: `${diffColors[card.difficulty]}11` }}>
                      {card.difficulty}
                    </div>
                    <div className={styles.cardEmoji} aria-hidden="true">{card.emoji}</div>
                    <p className={styles.cardQuestion}>{card.front}</p>
                    <div className={styles.cardCat}>{card.category}</div>
                    <div className={styles.cardHint} aria-hidden="true">Click to reveal answer</div>
                  </div>
                  {/* Back */}
                  <div className={styles.cardBack}>
                    <div className={styles.cardEmoji}>{card.emoji}</div>
                    <p className={styles.cardAnswer}>{card.back}</p>
                    <div className={styles.cardMarkBtns}>
                      <button className={styles.markKnown} onClick={e => { e.stopPropagation(); markCard(card.id, true); }}>
                        ✓ Got it
                      </button>
                      <button className={styles.markUnknown} onClick={e => { e.stopPropagation(); markCard(card.id, false); }}>
                        ✗ Review
                      </button>
                    </div>
                  </div>
                </div>
                {known.has(card.id) && <div className={styles.knownBadge}>✓</div>}
                {unknown.has(card.id) && <div className={styles.reviewBadge}>↻</div>}
              </div>
            ))}
          </div>
        )}

        {/* QUIZ MODE */}
        {mode === 'quiz' && quizCard && (
          <div className={styles.quizMode}>
            <div className={styles.quizNav}>
              <span className={styles.quizCount}>{currentIdx + 1} / {filtered.length}</span>
              <button className={styles.resetBtn} onClick={resetQuiz}>↺ Reset</button>
            </div>

            <div
              className={`${styles.quizCard} ${flipped[quizCard.id] ? styles.quizFlipped : ''}`}
              onClick={() => toggleFlip(quizCard.id)}
            >
              <div className={styles.quizCardInner}>
                <div className={styles.quizFront}>
                  <div className={styles.quizEmoji}>{quizCard.emoji}</div>
                  <p className={styles.quizQuestion}>{quizCard.front}</p>
                  <p className={styles.quizTap}>Tap to flip</p>
                </div>
                <div className={styles.quizBack}>
                  <div className={styles.quizEmoji}>{quizCard.emoji}</div>
                  <p className={styles.quizAnswer}>{quizCard.back}</p>
                  <div className={styles.quizActions}>
                    <button className={styles.quizUnknown} onClick={e => { e.stopPropagation(); markCard(quizCard.id, false); }}>
                      ✗ Need Review
                    </button>
                    <button className={styles.quizKnown} onClick={e => { e.stopPropagation(); markCard(quizCard.id, true); }}>
                      ✓ Got It!
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev/Next */}
            <div className={styles.quizNavBtns}>
              <button
                className={styles.navBtn}
                onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
              >
                ← Prev
              </button>
              <div className={styles.dotRow}>
                {filtered.map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ''} ${known.has(filtered[i].id) ? styles.dotKnown : ''} ${unknown.has(filtered[i].id) ? styles.dotUnknown : ''}`}
                    onClick={() => { setCurrentIdx(i); setFlipped({}); }}
                  />
                ))}
              </div>
              <button
                className={styles.navBtn}
                onClick={() => { setCurrentIdx(i => Math.min(filtered.length - 1, i + 1)); setFlipped({}); }}
                disabled={currentIdx === filtered.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Complete state */}
        {mode === 'quiz' && !quizCard && (
          <div className={styles.complete}>
            <div className={styles.completeIcon}>🏆</div>
            <h3>Deck Complete!</h3>
            <p>You reviewed all {filtered.length} cards.</p>
            <p style={{ color: '#10b981' }}>✓ Known: {known.size} &nbsp; <span style={{ color: '#ef4444' }}>✗ Review: {unknown.size}</span></p>
            <button className={styles.resetBtn2} onClick={resetQuiz}>Start Again</button>
          </div>
        )}
      </div>
    </section>
  );
}
