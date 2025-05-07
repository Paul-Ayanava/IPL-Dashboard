import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ScheduleTable } from '.'
import { mockSchedule } from '@/test/schedule.fixture'

describe('Button', () => {
  it('renders the button with correct text', () => {
    render(<ScheduleTable matches={mockSchedule.schedules}/>)
    expect(screen.getAllByText('Royal Challengers Bengaluru').length).toEqual(2)
  })
})
