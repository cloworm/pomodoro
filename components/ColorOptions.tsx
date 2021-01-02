import React, { FunctionComponent } from 'react'

import { Colors } from '../state/theme'

interface Props {
  color: Colors
  onChange: (color: Colors) => void
}

const ColorOptions: FunctionComponent<Props> = ({ color, onChange }) => {
  return (
    <div>
      <div className="flex flex-row space-x-4">
        <button
          aria-label={Colors.THEME_RED}
          onClick={() => onChange(Colors.THEME_RED)}
          className="bg-theme_red h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
          aria-pressed={color === Colors.THEME_RED}
        >
          {
            color === Colors.THEME_RED
              ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
              </svg>
              : null
          }
        </button>
        <button
          aria-label={Colors.THEME_GREEN}
          onClick={() => onChange(Colors.THEME_GREEN)}
          className="bg-theme_green h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
          aria-pressed={color === Colors.THEME_GREEN}
        >
          {
            color === Colors.THEME_GREEN
              ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
              </svg>
              : null
          }

        </button>
        <button
          aria-label={Colors.THEME_PURPLE}
          onClick={() => onChange(Colors.THEME_PURPLE)}
          className="bg-theme_purple h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
          aria-pressed={color === Colors.THEME_PURPLE}
        >
          {
            color === Colors.THEME_PURPLE
              ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
              </svg>
              : null
          }
        </button>
      </div>
    </div>
  )
}

export default ColorOptions
