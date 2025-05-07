import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '.'

describe('Header', () => {
  it('renders the Header with correct text', () => {
    render(<Header />)
    const homeLabel = screen.getAllByText('Home')
    const pointsTableLabel = screen.getAllByText('Points Table')
    const scheduleLabel = screen.getAllByText('Schedule')
    expect(homeLabel.length).toEqual(2)
    expect(pointsTableLabel.length).toEqual(2)
    expect(scheduleLabel.length).toEqual(2)
  })
})