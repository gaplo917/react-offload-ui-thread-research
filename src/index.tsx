import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'

const rootEl = document.getElementById('root')

render(<App />, rootEl)

// TODO: adopt React concurrent mode when it become stable
