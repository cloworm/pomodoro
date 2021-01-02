import { useCallback, useContext } from 'react'
import { ThemeContext, Colors, Fonts, ActionKind } from '../state/theme'

interface UseTheme {
  font: Fonts
  color: Colors
  setTheme: ({ color, font }: { color: Colors, font: Fonts }) => void
}

const useTheme = (): UseTheme => {
  const { state: { font, color }, dispatch } = useContext(ThemeContext)

  const setTheme = useCallback(({ color, font }) => {
    dispatch({ type: ActionKind.SET_THEME, payload: { color, font } })
  }, [dispatch])

  return {
    font,
    color,
    setTheme,
  }
}

export default useTheme
