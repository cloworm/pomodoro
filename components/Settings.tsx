import { FunctionComponent, useCallback, useState, useContext } from 'react'
import ColorOptions from './ColorOptions'
import FontOptions from './FontOptions'
import Select from './Select'

import { ThemeContext } from '../pages/_app'
import { ActionKind } from '../reducers/theme.reducer'

interface PomodoroState {
  [key: string]: number
}

interface Props {
  onClose: () => void
}

const Settings: FunctionComponent<Props> = ({ onClose }) => {
  const { state, dispatch } = useContext(ThemeContext)
  const { font, color } = state
  const [newFont, setNewFont] = useState<string>(font)
  const [newColor, setNewColor] = useState<string>(color)

  const [{
    pomodoro,
    shortBreak,
    longBreak
  }, setPomodoroState] = useState<PomodoroState>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  })

  const handleIncrease = useCallback((key: string) => {
    setPomodoroState((oldState) => {
      if (!(key in oldState)) return oldState
      return {
        ...oldState,
        [key]: oldState[key] += 5
      }
    })
  }, [])
  const handleDecrease = useCallback((key: string) => {
    setPomodoroState((oldState) => {
      if (!(key in oldState)) return oldState
      return {
        ...oldState,
        [key]: oldState[key] -= 5
      }
    })
  }, [])

  const handleFontChange = useCallback((font: string) => {
    setNewFont(font)
  }, [])
  const handleColorChange = useCallback((color: string) => {
    setNewColor(color)
  }, [])

  const handleApply = useCallback(() => {
    if (newFont !== font) {
      dispatch({ type: ActionKind.SET_FONT, payload: newFont })
    }
    if (newColor !== color) {
      dispatch({ type: ActionKind.SET_COLOR, payload: newColor })
    }
    onClose()
  }, [color, dispatch, font, newColor, newFont, onClose])

  return (
    <div className="relative bg-white rounded-3xl">
      <div className="flex justify-between items-end px-10 py-8">
        <h2 className="text-theme_darkBlue2 text-4xl">Settings</h2>
        <a className="cursor-pointer" onClick={onClose}>
          <svg className="align-bottom float-right" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#1E213F" fillRule="evenodd" d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z" opacity=".5"/></svg>
        </a>
      </div>

      <hr />

      <div className="px-10 py-8">
        <p className="text-theme_darkBlue2 font-xl tracking-wider pb-5">
          TIME (MINUTES)
        </p>
        <div className="flex space-x-6 pb-8">
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label="pomodoro" selected={pomodoro} />
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label="short break" selected={shortBreak} />
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label="long break" selected={longBreak} />
        </div>

        <hr />

        <div className="flex flex-row items-center justify-between py-6">
          <div>
            <p className="text-theme_darkBlue2 font-xl tracking-wider">
              FONT
            </p>
          </div>

          <FontOptions font={newFont} onChange={handleFontChange} />
        </div>

        <hr />

        <div className="flex flex-row items-center justify-between py-6">
          <div>
            <p className="text-theme_darkBlue2 font-xl tracking-wider">
              COLOR
            </p>
          </div>

          <ColorOptions color={newColor} onChange={handleColorChange} />
        </div>
      </div>

      <div className="absolute m-auto -bottom-2 left-0 right-0 text-center">
        <a onClick={handleApply} className="cursor-pointer inline bg-theme_red text-xl text-white px-12 py-5 rounded-full">
          Apply
        </a>
      </div>

    </div>
  )
}

export default Settings
