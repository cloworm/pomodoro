import React, { Dispatch, createContext, useReducer, FunctionComponent, useMemo } from 'react'

export enum TimerType {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short break',
  LONG_BREAK = 'long break'
}

export type Defaults = {
  [key in TimerType]: number
}

interface State {
  timerDuration: number
  secondsRemaining: number|null
  endTime: Date|null,
  timerType: TimerType
  isOn: boolean
  defaults: Defaults
}

const initialState: State = {
  timerDuration: 1500,
  secondsRemaining: 1500,
  endTime: null,
  timerType: TimerType.POMODORO,
  isOn: false,
  defaults: {
    [TimerType.POMODORO]: 1500,
    [TimerType.SHORT_BREAK]: 300,
    [TimerType.LONG_BREAK]: 900
  }
}

export enum TimerAction {
  TOGGLE = 'TOGGLE',
  FINISH = 'FINISH',
  RESTART = 'RESTART',
  SET_TYPE = 'SET_TYPE',
  SET_DEFAULTS = 'SET_DEFAULTS'
}

interface ToggleAction {
  type: TimerAction.TOGGLE
  payload: Date|null
}

interface RestartAction {
  type: TimerAction.RESTART
  payload: null
}

interface FinishAction {
  type: TimerAction.FINISH,
  payload: null
}

interface SetTypeAction {
  type: TimerAction.SET_TYPE,
  payload: TimerType
}

interface SetDefaultAction {
  type: TimerAction.SET_DEFAULTS,
  payload: Defaults
}

export type Action =
  ToggleAction|
  RestartAction|
  FinishAction|
  SetTypeAction|
  SetDefaultAction

const getSecondsLeft = (stoppedTime: Date|null, endTime: Date|null): number => {
  if (!stoppedTime || !endTime) return 0
  return (endTime.getTime() - stoppedTime.getTime()) / 1000
}

const secondsFromNow = (seconds: number): Date => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + seconds)
  return date
}

export const timerReducer = (state: State, action: Action): State => {
  switch(action.type) {

  case TimerAction.TOGGLE: {
    const nextIsOn = !state.isOn
    return {
      ...state,
      isOn: nextIsOn,
      secondsRemaining: nextIsOn ? null : getSecondsLeft(action.payload, state.endTime),
      endTime: nextIsOn && state.secondsRemaining ? secondsFromNow(state.secondsRemaining) : null
    }
  }

  case TimerAction.FINISH: {
    return {
      ...state,
      isOn: false,
      secondsRemaining: 0,
      endTime: null
    }
  }

  case TimerAction.RESTART: {
    return {
      ...state,
      isOn: true,
      timerDuration: state.defaults[state.timerType],
      secondsRemaining: null,
      endTime: secondsFromNow(state.defaults[state.timerType])
    }
  }

  case TimerAction.SET_TYPE: {
    return {
      ...state,
      isOn: false,
      timerType: action.payload,
      timerDuration: state.defaults[action.payload],
      secondsRemaining: state.defaults[action.payload],
      endTime: null
    }
  }

  case TimerAction.SET_DEFAULTS: {
    const isChangingActiveTimerDuration =
      state.timerDuration !== action.payload[state.timerType]

    if (isChangingActiveTimerDuration) {
      return {
        ...state,
        defaults: action.payload,
        isOn: false,
        timerDuration: action.payload[state.timerType],
        secondsRemaining: action.payload[state.timerType],
        endTime: null
      }
    }

    return {
      ...state,
      defaults: action.payload,
    }
  }

  default:
    return initialState
  }
}

type Store = {
  state: State
  dispatch: Dispatch<Action>
}

export const TimerContext = createContext<Store>({
  state: initialState,
  dispatch: () => null
})

export const TimerProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState)

  return (
    <TimerContext.Provider value={useMemo(() => ({ state, dispatch }), [state, dispatch])}>
      {children}
    </TimerContext.Provider>
  )
}
