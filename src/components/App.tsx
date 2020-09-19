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
    base: 500,
    pow: 2,
    rowCount: 100,
  })
  const [mode, setMode] = useState<AppMode>(AppMode.blocking)

  return (
    <AppCtx.Provider value={{ input, setInput, mode, setMode }}>
      <div className="App">
        <h1>React Offload UI Thread Research</h1>
        <h3>Animation to track UI blocking workload</h3>
        <Box textAlign="center" alignContent="center">
          <CircularProgress />
        </Box>
        <p>
          Start <b>tuning</b> the parameters to see the performance!
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
        <Box pt={4}>
          For detail explanations and more technical R&D, you could visit{' '}
          <a href="https://www.patreon.com/gaplotech">
            https://www.patreon.com/gaplotech
          </a>
        </Box>
      </div>
    </AppCtx.Provider>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
