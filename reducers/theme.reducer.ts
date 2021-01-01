export const initialState = {
  font: 'sans',
  color: 'theme_red',
}

interface State {
  font: string
  color: string
}

export enum ActionKind {
  SET_FONT = 'SET_FONT',
  SET_COLOR = 'SET_COLOR'
}

export type Action = {
  type: ActionKind,
  payload: string
}

export const themeReducer = (state: State, action: Action): State => {
  switch(action.type) {
  case 'SET_FONT': {
    return {
      ...state,
      font: action.payload
    }
  }

  case 'SET_COLOR': {
    return {
      ...state,
      color: action.payload
    }
  }

  default:
    return initialState
  }
}
