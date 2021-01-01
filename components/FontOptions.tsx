import { FunctionComponent, useCallback, useState } from 'react'

const FontOptions: FunctionComponent = () => {
  const [font, setFont] = useState('sans')

  const handleClick = useCallback((type: string) => {
    setFont(type)
  }, [])

  return (
    <div>
      <div className="flex flex-row space-x-4">
        <a onClick={() => handleClick('sans')} className={`${font === 'sans' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-sans`}>
          <p>Aa</p>
        </a>
        <a onClick={() => handleClick('serif')} className={`${font === 'serif' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-serif`}>
          <p>Aa</p>
        </a>
        <a onClick={() => handleClick('mono')} className={`${font === 'mono' ? 'bg-theme_darkBlue2 text-theme_gray' : 'bg-theme_gray text-theme_darkBlue2'} h-10 w-10 text-sm focus:outline-none cursor-pointer rounded-full flex items-center justify-center font-mono`}>
          <p>Aa</p>
        </a>
      </div>
    </div>
  )
}

export default FontOptions
