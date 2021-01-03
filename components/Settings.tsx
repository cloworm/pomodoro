import React, { FunctionComponent, useCallback, useState } from 'react'
import ColorOptions from './ColorOptions'
import FontOptions from './FontOptions'
import Select from './Select'

import useTheme from '../hooks/useTheme'
import useTimer from '../hooks/useTimer'
import { Fonts, Colors } from '../state/theme'
import { Defaults, TimerType } from '../state/timer'

interface Props {
  onClose: () => void
}

const Settings: FunctionComponent<Props> = ({ onClose }) => {
  const {
    font,
    color,
    setTheme
  } = useTheme()
  const [newFont, setNewFont] = useState<Fonts>(font)
  const [newColor, setNewColor] = useState<Colors>(color)
  const { defaults, setDefaults } = useTimer()
  const [newDefaults, setNewDefaults] = useState<Defaults>(defaults)

  const handleIncrease = useCallback((key: TimerType) => {
    setNewDefaults((oldDefaults) => {
      return {
        ...oldDefaults,
        [key]: oldDefaults[key] + 5 * 60
      }
    })
  }, [])
  const handleDecrease = useCallback((key: TimerType) => {
    setNewDefaults((oldDefaults) => {
      return {
        ...oldDefaults,
        [key]: Math.max(5 * 60, oldDefaults[key] - 5 * 60)
      }
    })
  }, [])

  const handleFontChange = useCallback((font: Fonts) => {
    setNewFont(font)
  }, [])
  const handleColorChange = useCallback((color: Colors) => {
    setNewColor(color)
  }, [])

  const handleApply = useCallback(() => {
    setTheme({ color: newColor, font: newFont })
    setDefaults(newDefaults)
    onClose()
  }, [newColor, newFont, setTheme, onClose, newDefaults, setDefaults])

  return (
    <div className="relative bg-white rounded-3xl">
      <div className="flex justify-between items-end px-10 py-8">
        <h2 className="text-theme_darkBlue2 text-xl md:text-4xl">Settings</h2>
        <a className="cursor-pointer" onClick={onClose}>
          <svg className="align-bottom float-right" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#1E213F" fillRule="evenodd" d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z" opacity=".5"/></svg>
        </a>
      </div>

      <hr />

      <div className="px-6 py-6 md:px-10 md:py-8">
        <p className="text-theme_darkBlue2 text-center text-xs md:text-left md:text-base tracking-wider pb-5">
          TIME (MINUTES)
        </p>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 pb-8">
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label={TimerType.POMODORO} selected={newDefaults[TimerType.POMODORO]} />
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label={TimerType.SHORT_BREAK} selected={newDefaults[TimerType.SHORT_BREAK]} />
          <Select onIncrease={handleIncrease} onDecrease={handleDecrease} label={TimerType.LONG_BREAK} selected={newDefaults[TimerType.LONG_BREAK]} />
        </div>

        <hr />

        <div className="flex flex-col md:flex-row items-center justify-between py-6">
          <div>
            <p className="text-theme_darkBlue2 font-xl tracking-wider pb-4 md:pb-0">
              FONT
            </p>
          </div>

          <FontOptions font={newFont} onChange={handleFontChange} />
        </div>

        <hr />

        <div className="flex flex-col md:flex-row items-center justify-between py-6">
          <div>
            <p className="text-theme_darkBlue2 font-xl tracking-wider pb-4 md:pb-0">
              COLOR
            </p>
          </div>

          <ColorOptions color={newColor} onChange={handleColorChange} />
        </div>
      </div>

      <div className="absolute m-auto -bottom-8 left-0 right-0 text-center">
        <button aria-label="apply" onClick={handleApply} className="cursor-pointer inline bg-theme_red text-white px-12 py-4 rounded-full">
          Apply
        </button>
      </div>

    </div>
  )
}

export default Settings
