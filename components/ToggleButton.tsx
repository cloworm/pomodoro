import React, { FunctionComponent, useCallback } from 'react'

import useTheme from '../hooks/useTheme'
import useTimer from '../hooks/useTimer'
import { TimerType } from '../state/timer'

const ToggleButton: FunctionComponent = () => {
  const { color } = useTheme()
  const { timerType, setType } = useTimer()

  const handleClick = useCallback((option: TimerType) => {
    setType(option)
  }, [setType])

  return (
    <div className="rounded-full bg-theme_darkBlue2 flex flex-row p-1.5 mb-14 md:mb-28 lg:mb-14 z-10">
      <button
        aria-label="pomodoro"
        onClick={() => handleClick(TimerType.POMODORO)}
        className={`${timerType === TimerType.POMODORO ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40 hover:opacity-100'} transition-all focus:outline-none active:outline-none cursor-pointer font-bold text-xs md:text-sm w-105px md:w-30 py-4 md:py-3.5`}
        aria-pressed={timerType === TimerType.POMODORO}
      >
        pomodoro
      </button>
      <button
        aria-label="short break"
        onClick={() => handleClick(TimerType.SHORT_BREAK)}
        className={`${timerType === TimerType.SHORT_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40 hover:opacity-100'} transition-all focus:outline-none active:outline-none cursor-pointer font-bold text-xs md:text-sm w-105px md:w-30 py-4 md:py-3.5`}
        aria-pressed={timerType === TimerType.SHORT_BREAK}
      >
        short break
      </button>
      <button
        aria-label="long break"
        onClick={() => handleClick(TimerType.LONG_BREAK)}
        className={`${timerType === TimerType.LONG_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40 hover:opacity-100'} transition-all focus:outline-none active:outline-none cursor-pointer font-bold text-xs md:text-sm w-105px md:w-30 py-4 md:py-3.5`}
        aria-pressed={timerType === TimerType.LONG_BREAK}
      >
        long break
      </button>
    </div>
  )
}

export default ToggleButton
