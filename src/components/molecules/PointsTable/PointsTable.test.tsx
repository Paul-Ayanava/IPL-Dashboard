import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PointsTable } from '.'
import { mockPointsTable } from '@/test/pointsTable.fixture'

describe('Button', () => {
  it('renders the button with correct text', () => {
    render(<PointsTable standings={mockPointsTable.standings}/>)
    expect(screen.getByText('Pos')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
  })
})