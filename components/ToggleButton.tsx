import React, { FunctionComponent, useCallback, useState } from 'react'

import useTheme from '../hooks/useTheme'

enum Option {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short break',
  LONG_BREAK = 'long break'
}

const ToggleButton: FunctionComponent = () => {
  const { color } = useTheme()
  const [selected, setSelected] = useState<Option>(Option.POMODORO)

  const handleClick = useCallback((option: Option) => {
    setSelected(option)
  }, [])

  return (
    <div className="rounded-full bg-theme_darkBlue2 flex flex-row p-1 mb-8 z-10">
      <button
        aria-label="pomodoro"
        onClick={() => handleClick(Option.POMODORO)}
        className={`${selected === Option.POMODORO ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} focus:outline-none cursor-pointer font-bold text-xs w-24 py-3`}
        aria-pressed={selected === Option.POMODORO}
      >
        pomodoro
      </button>
      <button
        aria-label="short break"
        onClick={() => handleClick(Option.SHORT_BREAK)}
        className={`${selected === Option.SHORT_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} focus:outline-none cursor-pointer font-bold text-xs w-24 py-3`}
        aria-pressed={selected === Option.SHORT_BREAK}
      >
        short break
      </button>
      <button
        aria-label="long break"
        onClick={() => handleClick(Option.LONG_BREAK)}
        className={`${selected === Option.LONG_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} focus:outline-none cursor-pointer font-bold text-xs w-24 py-3`}
        aria-pressed={selected === Option.LONG_BREAK}
      >
        long break
      </button>
    </div>
  )
}

export default ToggleButton
