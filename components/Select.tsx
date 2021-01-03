import React, { FunctionComponent } from 'react'

import { TimerType } from '../state/timer'

interface Props {
  label: TimerType
  selected: number
  onIncrease: (key: TimerType) => void
  onDecrease: (key: TimerType) => void
}

const Select: FunctionComponent<Props> = ({
  label,
  selected,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="w-full flex items-center md:items-start justify-between md:flex-col">
      <p className="text-theme_darkBlue opacity-40 font-bold pb-1">{label}</p>
      <div className="flex justify-between block w-1/2 md:w-full bg-theme_gray rounded-xl p-4">
        <div data-testid={`${label}-value`}>{selected / 60}</div>
        <div className="flex flex-col justify-between">
          <a data-testid={`${label}-increment`} className="cursor-pointer" onClick={() => onIncrease(label)}>
            <svg className="transition-all opacity-25 hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 6l6-4 6 4"/></svg>
          </a>
          <a data-testid={`${label}-decrement`} className="cursor-pointer" onClick={() => onDecrease(label)}>
            <svg className="transition-all opacity-25 hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 1l6 4 6-4"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Select
