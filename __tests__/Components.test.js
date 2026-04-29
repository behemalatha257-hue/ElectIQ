import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Flashcards from '../app/components/Flashcards'
import Timeline from '../app/components/Timeline'
import Innovations from '../app/components/Innovations'

// Mocking framer-motion as it often causes issues in JSDOM
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Interactive Components Tests', () => {
  test('Flashcards component filters correctly', () => {
    render(<Flashcards />)
    const basicsBtn = screen.getByLabelText('Show Basics cards')
    fireEvent.click(basicsBtn)
    expect(basicsBtn).toHaveAttribute('aria-pressed', 'true')
  })

  test('Timeline component toggles phases', () => {
    render(<Timeline />)
    const phaseBtn = screen.getByLabelText('Show Voter Registration')
    fireEvent.click(phaseBtn)
    expect(phaseBtn).toHaveAttribute('aria-pressed', 'true')
  })

  test('Innovations component expands on click', () => {
    render(<Innovations />)
    const innovationCard = screen.getByLabelText(/Innovation: Blockchain-Verified Voting/)
    fireEvent.click(innovationCard)
    expect(innovationCard).toHaveAttribute('aria-expanded', 'true')
  })

  test('Snapshots match (Regression Testing)', () => {
    const { asFragment: flashFragment } = render(<Flashcards />)
    expect(flashFragment()).toMatchSnapshot()
    
    const { asFragment: timelineFragment } = render(<Timeline />)
    expect(timelineFragment()).toMatchSnapshot()
  })
})
