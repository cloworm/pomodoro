import { useCallback, useContext, useEffect, useState } from 'react'
import { TimerContext, TimerAction, TimerType, Defaults } from '../state/timer'

interface UseTimer {
  timerDuration: number
  prettyTime: string
  timerType: TimerType
  defaults: Defaults
  isOn: boolean
  toggleIsOn: () => void
  restart: () => void
  progress: number
  setType: (type: TimerType) => void
  setDefaults: (defaults: Defaults) => void
}

const getPrettyTime = (secondsRemaining: number|null) => {
  if (!secondsRemaining || secondsRemaining < 0) return '00:00'

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = Math.floor(secondsRemaining % 60)

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const useTimer = (): UseTimer => {
  const { state: { timerDuration, secondsRemaining, endTime, isOn, timerType, defaults }, dispatch } = useContext(TimerContext)
  const [prettyTime, setPrettyTime] = useState<string>(getPrettyTime(secondsRemaining))
  const [progress, setProgress] = useState<number>(0)

  const toggleIsOn = useCallback(() => {
    dispatch({ type: TimerAction.TOGGLE, payload: new Date() })
  }, [dispatch])

  const restart = useCallback(() => {
    setProgress(0)
    dispatch({ type: TimerAction.RESTART, payload: null })
  }, [dispatch])

  const setType = useCallback((type: TimerType) => {
    dispatch({ type: TimerAction.SET_TYPE, payload: type })
  }, [dispatch])

  const setDefaults = useCallback((defaults: Defaults) => {
    dispatch({ type: TimerAction.SET_DEFAULTS, payload: defaults })
  }, [dispatch])

  const getSecondsLeft = (stopTime: Date|null, endTime: Date|null): number => {
    if (!stopTime || !endTime) return 0
    return (endTime.getTime() - stopTime.getTime()) / 1000
  }

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        const secondsLeft = getSecondsLeft(new Date(), endTime)
        setProgress(( timerDuration - secondsLeft ) / timerDuration)
        setPrettyTime(getPrettyTime(secondsLeft))
      }, 100)
      return () => clearInterval(interval)
    } else {
      setPrettyTime(getPrettyTime(secondsRemaining))
      setProgress(secondsRemaining !== null ? (timerDuration - secondsRemaining) / timerDuration : 0)
    }

  }, [isOn, secondsRemaining, endTime, timerDuration])

  useEffect(() => {
    if (progress >= 1) {
      dispatch({ type: TimerAction.FINISH, payload: null })
    }
  }, [dispatch, progress])

  return {
    timerDuration,
    prettyTime,
    timerType,
    setType,
    isOn,
    toggleIsOn,
    restart,
    progress,
    defaults,
    setDefaults
  }
}

export default useTimer
