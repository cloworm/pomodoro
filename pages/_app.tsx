import React, { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import { ThemeProvider } from '../state/theme'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
