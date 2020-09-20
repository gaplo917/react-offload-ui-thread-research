import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import SomeListSingleton from './organisms/SomeListSingleton'
import SomeListBlocking from './organisms/SomeListBlocking'
import SomeInput from './molecules/SomeInput'
import { AppCtx, AppMode, InputModel } from '../contexts/AppCtx'
import CircularProgress from '@material-ui/core/CircularProgress'
import SomeListDedicatedWorker from './organisms/SomeListDedicatedWorker'
import SomeListWorkerPool from './organisms/SomeListWorkerPool'
import { compute } from '../workers/compute'
import { Box } from '@material-ui/core'
import './app.css'

const ModeSwitcher = ({ mode }: { mode: AppMode }) => (
  <>
    {mode === AppMode.blocking && <SomeListBlocking />}
    {mode === AppMode.webWorkerSingleton && <SomeListSingleton />}
    {mode === AppMode.webWorkerDedicated && <SomeListDedicatedWorker />}
    {mode === AppMode.webWorkerPool && <SomeListWorkerPool />}
  </>
)

const Header = () => (
  <>
    <h1>React Offload UI Thread Research</h1>
    <Box>
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
  </>
)

const FunctionPreview = ({ input }: { input: InputModel }) => (
  <Box px={2}>
    <pre>
      <p>
        {'//'} each compute run with {input.base}^{input.pow}(
        {Math.ceil(Math.pow(input.base, input.pow))}) iterations.
      </p>
      {String(compute)}
    </pre>
  </Box>
)

const Footer = () => (
  <>
    <h1>More</h1>
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
  </>
)
function App() {
  const [input, setInput] = useState<InputModel>({
    base: 150,
    pow: 2.7,
    rowCount: 300,
  })
  const [mode, setMode] = useState<AppMode>(AppMode.blocking)

  return (
    <AppCtx.Provider value={{ input, setInput, mode, setMode }}>
      <div className="App">
        <Header />
        <FunctionPreview input={input} />
        <ModeSwitcher mode={mode} />
        <Footer />
      </div>
    </AppCtx.Provider>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
