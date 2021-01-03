import React, { FunctionComponent, useEffect, useRef } from 'react'

import useTheme from '../hooks/useTheme'
import useTimer from '../hooks/useTimer'

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
  }, [progress])

  return (
    <div className="w-96 h-96 text-theme_lightPurpleGray rounded-full bg-gradient-to-br from-theme_darkBlue2 to-theme_darkBlue timer-shadow flex items-center justify-center">
      <div className="relative flex items-center justify-center bg-theme_darkBlue2 rounded-full w-90 h-90">
        <svg data-testid="svg" className={`absolute top-0 bottom-0 m-auto w-full h-full text-${color}`} viewBox="0 0 120 120">
          <circle ref={circleRef} className="transition-all transform -rotate-90 origin-center progress__value stroke-round" fill="none" stroke="currentColor" cx="60" cy="60" r="54" strokeWidth="4" />
        </svg>
        <p data-testid="time" className="text-7xl font-bold">{prettyTime}</p>
        {
          progress >= 1
            ? <button aria-label="restart" onClick={restart} className="absolute focus:outline-none bottom-20 tracking-widest text-sm">RESTART</button>
            : <button aria-label="toggle" onClick={toggleIsOn} className="absolute focus:outline-none bottom-20 tracking-widest text-sm">{isOn ? 'PAUSE' : 'START'}</button>
        }

      </div>
    </div>
  )
}

export default Timer
