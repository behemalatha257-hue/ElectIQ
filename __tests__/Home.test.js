import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock components that might use window.matchMedia or other browser APIs
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Basic Application Test', () => {
  it('checks if the environment is set up correctly', () => {
    expect(true).toBe(true)
  })
})
