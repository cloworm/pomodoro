import React, { FunctionComponent, useEffect, useRef } from 'react'

import useTheme from '../hooks/useTheme'
import useTimer from '../hooks/useTimer'
import { Colors } from '../state/theme'

const Timer: FunctionComponent = () => {
  const { prettyTime, isOn, progress, restart, toggleIsOn } = useTimer()
  const { color } = useTheme()
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!circleRef?.current) return
    const circumference = 2 * Math.PI * circleRef.current?.r?.baseVal?.value
    const dashOffset = circumference * (1 - progress)
    circleRef.current.style.strokeDasharray = circumference.toString()
    circleRef.current.style.strokeDashoffset = dashOffset.toString()
    circleRef.current.style.display = 'block'
  }, [progress])

  return (
    <div className="w-300px h-300px md:w-410px md:h-410px text-theme_lightPurpleGray rounded-full bg-gradient-to-br from-theme_darkBlue2 to-theme_darkBlue timer-shadow flex items-center justify-center">
      <div className="relative flex items-center justify-center bg-theme_darkBlue2 rounded-full w-90 h-90">
        <svg data-testid="svg" className={`absolute top-0 bottom-0 m-auto w-full h-full ${color === Colors.THEME_RED ? 'text-theme_red' : (color === Colors.THEME_GREEN ? 'text-theme_green' : 'text-theme_purple')}`} viewBox="0 0 120 120">
          <circle ref={circleRef} className="hidden transition-all transform -rotate-90 origin-center progress__value stroke-round" fill="none" stroke="currentColor" cx="60" cy="60" r="54" strokeWidth="4" />
        </svg>
        <p data-testid="time" className="text-80px md:text-8xl font-bold">{prettyTime}</p>
        {
          progress >= 1
            ? <button aria-label="restart" onClick={restart} className={`absolute focus:outline-none bottom-14 md:bottom-20 tracking-widest text-sm md:text-base transition-all ${color === Colors.THEME_RED ? 'hover:text-theme_red' : (color === Colors.THEME_GREEN ? 'hover:text-theme_green' : 'hover:text-theme_purple')}`}>RESTART</button>
            : <button aria-label="toggle" onClick={toggleIsOn} className={`absolute focus:outline-none bottom-14 md:bottom-20 tracking-widest text-sm md:text-base transition-all ${color === Colors.THEME_RED ? 'hover:text-theme_red' : (color === Colors.THEME_GREEN ? 'hover:text-theme_green' : 'hover:text-theme_purple')}`}>{isOn ? 'PAUSE' : 'START'}</button>
        }

      </div>
    </div>
  )
}

export default Timer
