import React, { FunctionComponent, useCallback, useState } from 'react'
import Head from 'next/head'
import Modal from 'react-modal'

import Timer from '../components/Timer'
import IconButton from '../components/IconButton'
import ToggleButton from '../components/ToggleButton'
import Settings from '../components/Settings'
import useTheme from '../hooks/useTheme'
import useTimer from '../hooks/useTimer'

const hideApp = process.env.NODE_ENV !== 'test'

if (hideApp) {
  Modal.setAppElement('#main')
}

const Home: FunctionComponent = () => {
  const { font } = useTheme()
  const { timerType, timerDuration } = useTimer()
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openModal = useCallback(() => {
    setIsOpen(true)
  },[])

  return (
    <div className={`font-${font} relative`}>
      <Head>
        <title>pomodoro</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@700&family=Roboto+Slab:wght@700&family=Space+Mono:wght@700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@700&family=Roboto+Slab:wght@700&family=Space+Mono:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <main id="main" className="min-h-screen flex flex-col items-center text-center bg-theme_darkBlue2">
        <img className="pt-10 md:pt-20 lg:pt-10 pb-10 md:pb-16" src="/images/logo.svg" alt="Logo" />

        <ToggleButton />

        <Timer key={`${timerType}-${timerDuration}`} />

        <div className="mt-auto pt-4 pb-10 md:pb-24 lg:pb-14">
          <IconButton label="settings" onClick={() => openModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path fill="#D7E0FF" d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z" opacity=".5"/></svg>
          </IconButton>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Settings Modal"
          className="absolute top-1/2 left-1/2 m-auto transform -translate-x-1/2 -translate-y-1/2 w-90 md:w-4/5 lg:w-3/6 focus:outline-none z-20"
          overlayClassName="bg-transparent"
          ariaHideApp={hideApp}
        >
          <Settings onClose={closeModal} />
        </Modal>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
