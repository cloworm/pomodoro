import React, { FunctionComponent } from 'react'

import { Fonts } from '../state/theme'

interface Props {
  font: Fonts
  onChange: (font: Fonts) => void
}

const FontOptions: FunctionComponent<Props> = ({ font, onChange }) => {
  return (
    <div>
      <div className="flex flex-row space-x-1.5">
        <button
          aria-label={Fonts.SANS}
          onClick={() => onChange(Fonts.SANS)}
          className={`${font === Fonts.SANS ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none active:outline-none cursor-pointer rounded-full flex items-center justify-center font-sans border-4 transition-all box-content border-white hover:option-outline`}
          aria-pressed={font === Fonts.SANS}
        >
          Aa
        </button>
        <button
          aria-label={Fonts.SERIF}
          onClick={() => onChange(Fonts.SERIF)}
          className={`${font === Fonts.SERIF ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none active:outline-none cursor-pointer rounded-full flex items-center justify-center font-serif border-4 transition-all box-content border-white hover:option-outline`}
          aria-pressed={font === Fonts.SERIF}
        >
          Aa
        </button>
        <button
          aria-label={Fonts.MONO}
          onClick={() => onChange(Fonts.MONO)}
          className={`${font === Fonts.MONO ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none active:outline-none cursor-pointer rounded-full flex items-center justify-center font-mono border-4 transition-all box-content border-white hover:option-outline`}
          aria-pressed={font === Fonts.MONO}
        >
          Aa
        </button>
      </div>
    </div>
  )
}

export default FontOptions
