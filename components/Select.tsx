import React, { FunctionComponent } from 'react'

interface Props {
  label: string
  selected: number
  onIncrease: (key: string) => void
  onDecrease: (key: string) => void
}

const Select: FunctionComponent<Props> = ({
  label,
  selected,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="w-full">
      <p className="text-theme_darkBlue opacity-40 font-bold pb-1">{label}</p>
      <div className="flex justify-between block bg-theme_gray rounded-xl w-full p-4">
        <div>{selected}</div>
        <div className="flex flex-col justify-between">
          <a className="cursor-pointer" onClick={() => onIncrease(label)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#1E213F" strokeOpacity=".25" strokeWidth="2" d="M1 6l6-4 6 4"/></svg>
          </a>
          <a className="cursor-pointer" onClick={() => onDecrease(label)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#1E213F" strokeOpacity=".25" strokeWidth="2" d="M1 1l6 4 6-4"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Select
