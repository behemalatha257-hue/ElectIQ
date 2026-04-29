'use client';
import { useState } from 'react';
import styles from './Timeline.module.css';

const phases = [
  {
    id: 1,
    phase: 'Phase 1',
    title: 'Voter Registration',
    period: '6–12 Months Before Election',
    icon: '📋',
    color: '#3b82f6',
    steps: [
      { title: 'Check Eligibility', desc: `Must be a citizen, 18+ years old, and meet state requirements.`, tip: `💡 Requirements vary by country/state — always verify locally.` },
      { title: 'Register Online or In-Person', desc: `Use official government portals or visit your local election office.`, tip: `💡 Deadline is usually 15–30 days before election day.` },
      { title: 'Verify Registration', desc: `Confirm your registration status and polling place via official sites.`, tip: `💡 Check your mail for voter registration confirmation.` },
    ],
  },
  {
    id: 2,
    phase: 'Phase 2',
    title: 'Candidate & Issue Research',
    period: '1–3 Months Before Election',
    icon: '🔍',
    color: '#6366f1',
    steps: [
      { title: 'Study the Ballot', desc: `Review all candidates, propositions, and local measures on your ballot.`, tip: `💡 Sample ballots are usually available on your county election site.` },
      { title: 'Research Candidates', desc: `Watch debates, read platforms, and check independent fact-checkers.`, tip: `💡 Look for nonpartisan voter guides for unbiased info.` },
      { title: 'Understand Key Issues', desc: `Learn about policies that affect your community, economy, and rights.`, tip: `💡 Focus on primary sources, not just social media posts.` },
    ],
  },
  {
    id: 3,
    phase: 'Phase 3',
    title: 'Pre-Election Preparation',
    period: '1–2 Weeks Before Election',
    icon: '📅',
    color: '#8b5cf6',
    steps: [
      { title: 'Confirm Polling Location', desc: `Find your assigned polling place — it can change between elections.`, tip: `💡 Enter your address on the official state voter portal.` },
      { title: 'Plan Your Vote', desc: `Decide on early voting, mail-in ballot, or election day voting.`, tip: `💡 Early voting reduces day-of rush and guarantees your vote.` },
      { title: 'Prepare Required ID', desc: `Gather accepted photo ID as required by your jurisdiction.`, tip: `💡 ID requirements vary widely — some states need no ID at all.` },
    ],
  },
  {
    id: 4,
    phase: 'Phase 4',
    title: 'Election Day',
    period: 'The Big Day',
    icon: '🗳️',
    color: '#06b6d4',
    steps: [
      { title: 'Go to Your Polling Place', desc: `Arrive before closing time — lines form early in popular precincts.`, tip: `💡 If you're in line before closing time, you have the right to vote!` },
      { title: 'Cast Your Ballot', desc: `Follow instructions carefully, vote for all races, and submit.`, tip: `💡 Ask a poll worker if you're confused — they are there to help.` },
      { title: 'Get Your "I Voted" Sticker', desc: `Wear it proudly! You've exercised a fundamental democratic right.`, tip: `💡 Some businesses offer free food/drinks to voters. Check locally!` },
    ],
  },
  {
    id: 5,
    phase: 'Phase 5',
    title: 'Post-Election',
    period: 'After Election Day',
    icon: '📊',
    color: '#10b981',
    steps: [
      { title: 'Follow Results', desc: `Watch results come in live on news channels and official sites.`, tip: `💡 Full results may take days — especially mail-in ballots.` },
      { title: 'Understand the Count', desc: `Learn how votes are tallied, certified, and audited.`, tip: `💡 All states have canvassing and certification processes.` },
      { title: 'Transition of Power', desc: `Winners are certified and the peaceful transfer of power begins.`, tip: `💡 Inauguration marks the formal beginning of new governance.` },
    ],
  },
];

export default function Timeline() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="timeline" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>📅 Election Journey</span>
          <h2 className={styles.sectionTitle}>
            The Complete Election <span className={styles.accent}>Timeline</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            From voter registration to counting ballots — every step explained simply.
          </p>
        </div>

        {/* Phase pills navigation */}
        <nav className={styles.phasePills} aria-label="Election Phases">
          {phases.map(p => (
            <button
              key={p.id}
              className={`${styles.pill} ${activePhase === p.id ? styles.pillActive : ''}`}
              style={activePhase === p.id ? { borderColor: p.color, color: p.color } : {}}
              onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              aria-pressed={activePhase === p.id}
              aria-label={`Show ${p.title}`}
            >
              <span aria-hidden="true">{p.icon}</span>
              <span>{p.phase}</span>
            </button>
          ))}
          <button
            className={`${styles.pill} ${activePhase === null ? styles.pillActive : ''}`}
            onClick={() => setActivePhase(null)}
            aria-pressed={activePhase === null}
            aria-label="Show all phases"
          >
            All Phases
          </button>
        </nav>

        {/* Timeline */}
        <div className={styles.timeline}>
          {phases
            .filter(p => activePhase === null || p.id === activePhase)
            .map((phase, index) => (
            <div key={phase.id} className={styles.phaseRow}>
              {/* Phase marker */}
              <div className={styles.phaseMarker}>
                <div
                  className={styles.markerCircle}
                  style={{ background: phase.color, boxShadow: `0 0 20px ${phase.color}66` }}
                >
                  {phase.icon}
                </div>
                {index < phases.filter(p => activePhase === null || p.id === activePhase).length - 1 && (
                  <div className={styles.markerLine} style={{ background: `linear-gradient(${phase.color}, ${phases[index+1]?.color || phase.color})` }}></div>
                )}
              </div>

              {/* Phase content */}
              <div className={styles.phaseContent}>
                <div className={styles.phaseHeader}>
                  <span className={styles.phaseTag} style={{ color: phase.color, borderColor: `${phase.color}44`, background: `${phase.color}11` }}>
                    {phase.phase}
                  </span>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <span className={styles.phasePeriod}>⏱ {phase.period}</span>
                </div>

                <div className={styles.steps}>
                  {phase.steps.map((step, si) => (
                    <div
                      key={si}
                      className={`${styles.stepCard} ${activeStep === `${phase.id}-${si}` ? styles.stepActive : ''}`}
                      onClick={() => setActiveStep(activeStep === `${phase.id}-${si}` ? null : `${phase.id}-${si}`)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveStep(activeStep === `${phase.id}-${si}` ? null : `${phase.id}-${si}`); } }}
                      role="button"
                      tabIndex="0"
                      aria-expanded={activeStep === `${phase.id}-${si}`}
                      aria-label={`${step.title}. Click to ${activeStep === `${phase.id}-${si}` ? 'hide' : 'show'} details.`}
                    >
                      <div className={styles.stepHeader}>
                        <div className={styles.stepNumber} style={{ background: `${phase.color}22`, color: phase.color }}>
                          {si + 1}
                        </div>
                        <span className={styles.stepTitle}>{step.title}</span>
                        <span className={styles.stepChevron}>
                          {activeStep === `${phase.id}-${si}` ? '▲' : '▼'}
                        </span>
                      </div>
                      {activeStep === `${phase.id}-${si}` && (
                        <div className={styles.stepBody}>
                          <p className={styles.stepDesc}>{step.desc}</p>
                          <div className={styles.stepTip}>{step.tip}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className={styles.progressBar}>
          <div className={styles.progressLabel} id="readiness-label">Election Readiness</div>
          <div className={styles.progressTrack} role="progressbar" aria-labelledby="readiness-label" aria-valuenow={activePhase ? (activePhase / 5) * 100 : 100} aria-valuemin="0" aria-valuemax="100">
            <div
              className={styles.progressFill}
              style={{ width: activePhase ? `${(activePhase / 5) * 100}%` : '100%' }}
            ></div>
          </div>
          <div className={styles.progressPct}>{activePhase ? `Phase ${activePhase}/5` : 'Complete Journey'}</div>
        </div>
      </div>
    </section>
  );
}
