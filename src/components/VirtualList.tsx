import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'
import { AppCtx } from './AppCtx'
import { List, ListRowRenderer } from 'react-virtualized'

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
      <List
        autoWidth
        width={800}
        height={800}
        rowCount={input.rowCount}
        rowHeight={30}
        rowRenderer={rowRendererProvider(base, pow)}
      />
    </div>
  )
}
