import React, { Dispatch, SetStateAction } from 'react'

export interface InputModel {
  base: number
  pow: number
  rowCount: number
}

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
