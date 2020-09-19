import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'
import { AppCtx } from './AppCtx'
import { List, ListRowRenderer } from 'react-virtualized'
import { Box, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'left',
  },
}))

export default function VirtualList({
  rowRendererProvider,
}: {
  rowRendererProvider: (base: number, pow: number) => ListRowRenderer
}) {
  const classes = useStyles()
  const appCtx = useContext(AppCtx)

  if (appCtx === null) {
    return null
  }

  const { input } = appCtx

  const { base, pow } = input

  return (
    <div className={classes.root}>
      <h2>Virtual List with {input.rowCount} Items</h2>
      <p>Scroll fastly to see the UI blocking</p>
      <Grid container spacing={3}>
        <Grid item>
          <List
            style={{ border: '1px solid black' }}
            width={300}
            height={800}
            rowCount={input.rowCount}
            rowHeight={30}
            rowRenderer={rowRendererProvider(base, pow)}
          />
        </Grid>
        <Grid item>
          <CircularProgress size={'8rem'} />
        </Grid>
      </Grid>
    </div>
  )
}
