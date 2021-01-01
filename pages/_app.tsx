import { FunctionComponent, createContext, useReducer, Dispatch } from 'react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import { themeReducer, initialState, Action } from '../reducers/theme.reducer'

type Store = {
  state: typeof initialState
  dispatch: Dispatch<Action>
}
export const ThemeContext = createContext<Store>({
  state: initialState,
  dispatch: () => null
})

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}

export default MyApp
