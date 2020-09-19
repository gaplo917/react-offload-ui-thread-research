import React, { useMemo, useState } from 'react'
// @ts-ignore
import ComputeWorker from 'comlink-loader!../workers/compute.worker'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from './ErrorBoundary'
import VirtualList from './VirtualList'
import TextField from '@material-ui/core/TextField'

interface TabContentProps {
  base: number
  pow: number
  style: React.CSSProperties
  worker: ComputeWorker
}

const Loading = () => <span>loading</span>

const ErrorMessage = ({ message }: { message: string }) => (
  <span>{message}</span>
)

function TabContent({ base, pow, style, worker }: TabContentProps) {
  const suspendableData = useSuspendableData(() => worker.compute(base, pow), [
    base,
    pow,
  ])
  return (
    <p style={{ padding: 8, ...style }}>
      <ErrorBoundary
        key={`${base}-${pow}`}
        fallback={<ErrorMessage message={`cannot load ${base},${pow}`} />}
      >
        <React.Suspense fallback={<Loading />}>
          <Suspendable data={suspendableData}>
            {(data) => (
              <span>
                compute({base}, {pow}) = {data}
              </span>
            )}
          </Suspendable>
        </React.Suspense>
      </ErrorBoundary>
    </p>
  )
}

export default function SomeListWorkerPool() {
  const [poolSize, setPoolSize] = useState(4)

  const workerPool = useMemo(
    () => new Array(poolSize).fill(null).map(() => new ComputeWorker()),
    [poolSize],
  )

  return (
    <>
      <VirtualList
        headerComp={() => (
          <TextField
            id="standard-basic"
            label="Worker Pool Size"
            required
            type="number"
            variant="outlined"
            defaultValue={poolSize}
            inputProps={{ step: 1 }}
            onChange={(event: React.ChangeEvent<{ value: string }>) => {
              setPoolSize(Number(event.target.value))
            }}
          />
        )}
        rowRendererProvider={(base, pow) => ({ key, index, style }) => (
          <TabContent
            key={key}
            base={base}
            pow={pow}
            style={style}
            worker={workerPool[index % poolSize]}
          />
        )}
      />
    </>
  )
}
