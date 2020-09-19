import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { AppCtx, AppMode } from './AppCtx'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function SomeInput() {
  const classes = useStyles()
  const appCtx = useContext(AppCtx)
  if (appCtx === null) {
    return null
  }
  const { input, setInput, mode, setMode } = appCtx

  return (
    <form className={classes.root}>
      <TextField
        id="standard-basic"
        label="Base"
        required
        type="number"
        variant="outlined"
        defaultValue={input.base}
        inputProps={{ step: 10 }}
        onChange={(event: React.ChangeEvent<{ value: string }>) => {
          setInput({
            ...input,
            base: Number(event.target.value),
          })
        }}
      />
      <TextField
        id="filled-basic"
        label="Power"
        required
        type="number"
        variant="outlined"
        inputProps={{ step: 0.1 }}
        defaultValue={input.pow}
        onChange={(event: React.ChangeEvent<{ value: string }>) => {
          setInput({
            ...input,
            pow: Number(event.target.value),
          })
        }}
      />
      <TextField
        id="filled-basic"
        label="Row Count"
        required
        type="number"
        variant="outlined"
        inputProps={{ step: 100 }}
        defaultValue={input.rowCount}
        onChange={(event: React.ChangeEvent<{ value: string }>) => {
          setInput({
            ...input,
            rowCount: Number(event.target.value),
          })
        }}
      />
      <FormControl variant="outlined" required style={{ width: 300 }}>
        <InputLabel htmlFor="demo-simple-select-label">Mode</InputLabel>
        <Select
          native
          label="Age"
          id="demo-simple-select"
          value={mode}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: string }>,
          ) => {
            setMode(Number(event.target.value) as AppMode)
          }}
        >
          <option value={AppMode.blocking}>UI Thread</option>
          <option value={AppMode.webWorkerSingleton}>
            Web Worker(Singleton)
          </option>
          <option value={AppMode.webWorkerDedicated}>
            Web Worker(Dedicated)
          </option>
          <option value={AppMode.webWorkerPool}>
            Web Worker(Pool, size=20)
          </option>
        </Select>
      </FormControl>
    </form>
  )
}
