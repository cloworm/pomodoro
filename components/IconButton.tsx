import React, { FunctionComponent } from 'react'

interface Props {
  onClick: () => void
  label: string
}

const IconButton: FunctionComponent<Props> = ({ children, onClick, label }) => {
  return (
    <button aria-label={label} className="focus:outline-none" onClick={onClick}>{children}</button>
  )
}

export default IconButton
