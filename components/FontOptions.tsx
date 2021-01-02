import React, { FunctionComponent } from 'react'

import { Fonts } from '../state/theme'

interface Props {
  font: Fonts
  onChange: (font: Fonts) => void
}

const FontOptions: FunctionComponent<Props> = ({ font, onChange }) => {
  return (
    <div>
      <div className="flex flex-row space-x-4">
        <button
          aria-label={Fonts.SANS}
          onClick={() => onChange(Fonts.SANS)}
          className={`${font === Fonts.SANS ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-sans`}
          aria-pressed={font === Fonts.SANS}
        >
          <p>Aa</p>
        </button>
        <button
          aria-label={Fonts.SERIF}
          onClick={() => onChange(Fonts.SERIF)}
          className={`${font === Fonts.SERIF ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-serif`}
          aria-pressed={font === Fonts.SERIF}
        >
          <p>Aa</p>
        </button>
        <button
          aria-label={Fonts.MONO}
          onClick={() => onChange(Fonts.MONO)}
          className={`${font === Fonts.MONO ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-mono`}
          aria-pressed={font === Fonts.MONO}
        >
          <p>Aa</p>
        </button>
      </div>
    </div>
  )
}

export default FontOptions
