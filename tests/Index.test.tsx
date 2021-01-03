import React, { FunctionComponent } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'

import Index from '../pages/index'
import { ThemeProvider } from '../state/theme'
import { TimerProvider } from '../state/timer'

jest.useFakeTimers('modern')

const TestComponent: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <TimerProvider>
        <Index />
      </TimerProvider>
    </ThemeProvider>
  )
}

describe('Index', () => {
  test('Initial State', () => {
    render(<TestComponent />)
    const button = screen.getByRole('button', { pressed: true })
    expect(button).toHaveTextContent('pomodoro')
  })

  test('Toggle Function', () => {
    render(<TestComponent />)
    fireEvent.click(screen.getByRole('button', { name: 'short break' }))
    const button = screen.getByRole('button', { pressed: true })
    expect(button).toHaveTextContent('short break')

    fireEvent.click(screen.getByRole('button', { name: 'long break' }))
    const button2 = screen.getByRole('button', { pressed: true })
    expect(button2).toHaveTextContent('long break')

    fireEvent.click(screen.getByRole('button', { name: 'pomodoro' }))
    const button3 = screen.getByRole('button', { pressed: true })
    expect(button3).toHaveTextContent('pomodoro')
  })

  test('Theme Color Change', () => {
    render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'theme_green' }))
    expect(screen.getByTestId('svg')).toHaveClass('text-theme_red')
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(screen.getByRole('button', { pressed: true })).toHaveClass('bg-theme_green')
    expect(screen.getByTestId('svg')).toHaveClass('text-theme_green')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'theme_purple' }))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(screen.getByRole('button', { pressed: true })).toHaveClass('bg-theme_purple')
    expect(screen.getByTestId('svg')).toHaveClass('text-theme_purple')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'theme_red' }))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(screen.getByRole('button', { pressed: true })).toHaveClass('bg-theme_red')
    expect(screen.getByTestId('svg')).toHaveClass('text-theme_red')
  })

  test('Theme Font Change', () => {
    const { container } = render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'mono' }))
    expect(container.children[0]).toHaveClass('font-sans')
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(container.children[0]).toHaveClass('font-mono')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'serif' }))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(container.children[0]).toHaveClass('font-serif')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'sans' }))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    expect(container.children[0]).toHaveClass('font-sans')
  })

  test('Timer has initial time 25:00', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('time')).toHaveTextContent('25:00')
  })

  test('Timer time decreases after clicking start', () => {
    render(<TestComponent />)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('24:59')

    act(() => {
      jest.advanceTimersByTime(120000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('22:59')
  })

  test('When timer ends it has text 00:00 and the button says Restart', () => {
    render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'short break' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    act(() => {
      jest.advanceTimersByTime(300000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('00:00')
    expect(screen.getByRole('button', { name: 'restart' })).toHaveTextContent('RESTART')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('00:00')
    expect(screen.getByRole('button', { name: 'restart' })).toHaveTextContent('RESTART')
  })

  test('The Toggle button says START when timer is paused and PAUSE when timer is Going', () => {
    render(<TestComponent />)

    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('PAUSE')

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')
  })

  test('Resetting the timer starts the time at 05:00', () => {
    render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'short break' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    act(() => {
      jest.advanceTimersByTime(300000)
    })

    fireEvent.click(screen.getByRole('button', { name: 'restart' }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('04:59')
  })

  test('Changing the timer type sets the time to the default for that type and stops the timer', () => {
    render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'short break' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')
    expect(screen.getByTestId('time')).toHaveTextContent('05:00')

    fireEvent.click(screen.getByRole('button', { name: 'long break' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')
    expect(screen.getByTestId('time')).toHaveTextContent('15:00')
  })

  test('Changing settings timer duration of current timer resets the active clock', () => {
    render(<TestComponent />)

    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('PAUSE')

    expect(screen.getByTestId('time')).toHaveTextContent('25:00')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('24:59')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByTestId('pomodoro-increment'))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    // Resets timer
    expect(screen.getByTestId('time')).toHaveTextContent('30:00')

    // Timer is not started
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('30:00')
  })

  test('Changing settings timer duration of a different timer does not reset the active clock', () => {
    render(<TestComponent />)

    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('START')

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('PAUSE')

    expect(screen.getByTestId('time')).toHaveTextContent('25:00')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('24:59')

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    fireEvent.click(screen.getByTestId('short break-increment'))
    fireEvent.click(screen.getByRole('button', { name: 'apply' }))

    // Does not reset timer
    expect(screen.getByTestId('time')).toHaveTextContent('24:59')

    // Timer is still running
    expect(screen.getByRole('button', { name: 'toggle' })).toHaveTextContent('PAUSE')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('time')).toHaveTextContent('24:58')
  })

  test('Changing settings timer duration has minimum of 5 minutes', () => {
    render(<TestComponent />)

    fireEvent.click(screen.getByRole('button', { name: 'settings' }))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('25')
    fireEvent.click(screen.getByTestId('pomodoro-decrement'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('20')
    fireEvent.click(screen.getByTestId('pomodoro-decrement'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('15')
    fireEvent.click(screen.getByTestId('pomodoro-decrement'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('10')
    fireEvent.click(screen.getByTestId('pomodoro-decrement'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('5')
    fireEvent.click(screen.getByTestId('pomodoro-decrement'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('5')
    fireEvent.click(screen.getByTestId('pomodoro-increment'))
    expect(screen.getByTestId('pomodoro-value')).toHaveTextContent('10')
  })
})
