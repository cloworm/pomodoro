import { FunctionComponent } from 'react'

interface Props {
  onClick: () => void
}

const IconButton: FunctionComponent<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default IconButton