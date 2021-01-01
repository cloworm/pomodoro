import { FunctionComponent, useCallback, useState, useContext } from 'react'

import { ThemeContext } from '../pages/_app'

enum Option {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short break',
  LONG_BREAK = 'long break'
}

const ToggleButton: FunctionComponent = () => {
  const { state } = useContext(ThemeContext)
  const { color } = state
  const [selected, setSelected] = useState<Option>(Option.POMODORO)

  const handleClick = useCallback((option: Option) => {
    setSelected(option)
  }, [])

  return (
    <div className="rounded-full bg-theme_darkBlue2 flex flex-row p-1 mb-8 z-10">
      <a onClick={() => handleClick(Option.POMODORO)} className={`${selected === Option.POMODORO ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} cursor-pointer font-bold text-xs w-24 py-3`}>
        pomodoro
      </a>
      <a onClick={() => handleClick(Option.SHORT_BREAK)} className={`${selected === Option.SHORT_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} cursor-pointer font-bold text-xs w-24 py-3`}>
        short break
      </a>
      <a onClick={() => handleClick(Option.LONG_BREAK)} className={`${selected === Option.LONG_BREAK ? `text-theme_darkBlue2 bg-${color} rounded-full` : 'text-theme_lightPurpleGray opacity-40'} cursor-pointer font-bold text-xs w-24 py-3`}>
        long break
      </a>
    </div>
  )
}

export default ToggleButton
