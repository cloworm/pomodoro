import { FunctionComponent } from 'react'

interface Props {
  font: string
  onChange: (font: string) => void
}

const FontOptions: FunctionComponent<Props> = ({ font, onChange }) => {
  return (
    <div>
      <div className="flex flex-row space-x-4">
        <a onClick={() => onChange('sans')} className={`${font === 'sans' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-sans`}>
          <p>Aa</p>
        </a>
        <a onClick={() => onChange('serif')} className={`${font === 'serif' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-serif`}>
          <p>Aa</p>
        </a>
        <a onClick={() => onChange('mono')} className={`${font === 'mono' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-mono`}>
          <p>Aa</p>
        </a>
      </div>
    </div>
  )
}

export default FontOptions
