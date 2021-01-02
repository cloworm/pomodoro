import React, { Dispatch, createContext, useReducer, FunctionComponent } from 'react'

export enum Fonts {
  SANS = 'sans',
  SERIF = 'serif',
  MONO = 'mono'
}

export enum Colors {
  THEME_RED = 'theme_red',
  THEME_GREEN = 'theme_green',
  THEME_PURPLE = 'theme_purple'
}

export const initialState = {
  font: Fonts.SANS,
  color: Colors.THEME_RED,
}
interface State {
  font: Fonts
  color: Colors
}

export enum ActionKind {
  SET_THEME = 'SET_THEME'
}

export type Action = {
  type: ActionKind,
  payload: State
}

export const themeReducer = (state: State, action: Action): State => {
  switch(action.type) {
  case ActionKind.SET_THEME: {
    return {
      ...state,
      font: action.payload.font ? action.payload.font : state.font,
      color: action.payload.color ? action.payload.color : state.color
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

export const ThemeContext = createContext<Store>({
  state: initialState,
  dispatch: () => null
})

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
