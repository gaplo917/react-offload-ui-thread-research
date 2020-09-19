import React, { Dispatch, SetStateAction } from 'react'
import { InputModel } from './models'

export enum AppMode {
  blocking,
  webWorkerSingleton,
  webWorkerDedicated,
  webWorkerPool,
}

export const AppCtx = React.createContext<{
  input: InputModel
  setInput: Dispatch<SetStateAction<InputModel>>
  mode: AppMode
  setMode: Dispatch<SetStateAction<AppMode>>
} | null>(null)
