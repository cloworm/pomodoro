import React, { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import { ThemeProvider } from '../state/theme'
import { TimerProvider } from '../state/timer'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <TimerProvider>
        <Component {...pageProps} />
      </TimerProvider>
    </ThemeProvider>
  )
}

export default MyApp
