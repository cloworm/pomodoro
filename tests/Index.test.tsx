import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Index from '../pages/index'
import { ThemeProvider } from '../state/theme'

describe('Index', () => {
  test('Initial State', () => {
    render(<ThemeProvider><Index /></ThemeProvider>)
    const button = screen.getByRole('button', { pressed: true })
    expect(button).toHaveTextContent('pomodoro')
  })

  test('Toggle Function', () => {
    render(<ThemeProvider><Index /></ThemeProvider>)
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
    render(<ThemeProvider><Index /></ThemeProvider>)

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
    const { container } = render(<ThemeProvider><Index /></ThemeProvider>)

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
})
