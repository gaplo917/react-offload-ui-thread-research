import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import SomeListSingleton from './SomeListSingleton'
import SomeListBlocking from './SomeListBlocking'
import SomeInput from './SomeInput'
import { AppCtx, AppMode } from './AppCtx'
import { InputModel } from './models'
import CircularProgress from '@material-ui/core/CircularProgress'
import SomeListDedicatedWorker from './SomeListDedicatedWorker'
import SomeListWorkerPool from './SomeListWorkerPool'
import { compute } from '../workers/compute'
import { Box } from '@material-ui/core'

function App() {
  const [input, setInput] = useState<InputModel>({
    base: 200,
    pow: 2.5,
    rowCount: 100,
  })
  const [mode, setMode] = useState<AppMode>(AppMode.blocking)

  return (
    <AppCtx.Provider value={{ input, setInput, mode, setMode }}>
      <div className="App">
        <h1>React Offload UI Thread Research</h1>
        <Box>
          <p>
            GitHub Repository:{' '}
            <a
              href="https://github.com/gaplo917/react-offload-ui-thread-research"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/gaplo917/react-offload-ui-thread-research
            </a>
          </p>
          <p>
            For detail explanations and more technical R&D, you can visit{' '}
            <a
              href="https://www.patreon.com/gaplotech"
              target="_blank"
              rel="noreferrer"
            >
              https://www.patreon.com/gaplotech
            </a>
          </p>
          <p>
            <i>
              * The progress loading dialog is to track UI blocking occurrence
              visually
            </i>
          </p>
        </Box>
        <h1>
          Parameters <CircularProgress />
        </h1>
        <p>
          Start <b>tuning</b> the parameters to see the UI blocking!{' '}
        </p>
        <SomeInput />
        <Box px={2}>
          <pre>
            <p>
              {'//'} each compute run with {input.base}^{input.pow}(
              {Math.ceil(Math.pow(input.base, input.pow))}) iterations.
            </p>
            {String(compute)}
          </pre>
        </Box>
        {mode === AppMode.blocking && <SomeListBlocking />}
        {mode === AppMode.webWorkerSingleton && <SomeListSingleton />}
        {mode === AppMode.webWorkerDedicated && <SomeListDedicatedWorker />}
        {mode === AppMode.webWorkerPool && <SomeListWorkerPool />}
      </div>
    </AppCtx.Provider>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
