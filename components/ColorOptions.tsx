import { FunctionComponent, useCallback, useState } from 'react'

const ColorOptions: FunctionComponent = () => {
  const [color, setColor] = useState('theme_red')

  const handleClick = useCallback((themeColor: string) => {
    setColor(themeColor)
  }, [])

  return (
    <div>
      <div className="flex flex-row space-x-4">
        <a onClick={() => handleClick('theme_red')} className="bg-theme_red h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center">
          { color === 'theme_red'
            ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
            </svg>
            : null
          }
        </a>
        <a onClick={() => handleClick('theme_green')} className="bg-theme_green h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center">
          { color === 'theme_green'
            ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
            </svg>
            : null
          }

        </a>
        <a onClick={() => handleClick('theme_purple')} className="bg-theme_purple h-10 w-10 focus:outline-none cursor-pointer rounded-full flex items-center justify-center">
          {color === 'theme_purple'
            ? <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
            </svg>
            : null
          }
        </a>
      </div>
    </div>
  )
}

export default ColorOptions
