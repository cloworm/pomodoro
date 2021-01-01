import { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../pages/_app'

const Timer: FunctionComponent = () => {
  const { state } = useContext(ThemeContext)
  const { color } = state
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!circleRef?.current) return
    const circumference = 2 * Math.PI * circleRef.current.r.baseVal.value
    const dashOffset = circumference * (1 - 0.5)
    circleRef.current.style.strokeDasharray = circumference.toString()
    circleRef.current.style.strokeDashoffset = dashOffset.toString()
  }, [])

  return (
    <div className="w-96 h-96 text-theme_lightPurpleGray rounded-full bg-gradient-to-br from-theme_darkBlue2 to-theme_darkBlue timer-shadow flex items-center justify-center">
      <div className="relative flex items-center justify-center bg-theme_darkBlue2 rounded-full w-90 h-90">
        <svg className={`absolute top-0 bottom-0 m-auto w-full h-full text-${color}`} viewBox="0 0 120 120">
          <circle ref={circleRef} className="transform -rotate-90 origin-center progress__value stroke-round" fill="none" stroke="currentColor" cx="60" cy="60" r="54" strokeWidth="4" />
        </svg>
        <p className="text-7xl font-bold">17:59</p>
        <a className="absolute bottom-20 tracking-widest text-sm">PAUSE</a>
      </div>
    </div>
  )
}

export default Timer
