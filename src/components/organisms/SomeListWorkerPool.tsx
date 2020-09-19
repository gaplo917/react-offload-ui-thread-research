import React, { useMemo, useState } from 'react'
// @ts-ignore
import ComputeWorker from 'comlink-loader!../../workers/compute.worker'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from '../atom/ErrorBoundary'
import VirtualList from '../molecules/VirtualList'
import TextField from '@material-ui/core/TextField'
import Loading from '../atom/Loading'
import ComputeResult from '../atom/ComputeResult'
import ComputeErrorMessage from '../atom/ComputeErrorMessage'

interface TabContentProps {
  index: number
  base: number
  pow: number
  style: React.CSSProperties
  worker: ComputeWorker
}

function TabContent({ index, base, pow, style, worker }: TabContentProps) {
  const suspendableData = useSuspendableData<number>(
    () => worker.compute(base, pow),
    [base, pow],
  )
  return (
    <p style={{ padding: 8, ...style }}>
      <ErrorBoundary
        key={`${base}-${pow}`}
        fallback={<ComputeErrorMessage index={index} base={base} pow={pow} />}
      >
        <React.Suspense fallback={<Loading index={index} />}>
          <Suspendable data={suspendableData}>
            {(data) => (
              <ComputeResult
                index={index}
                base={base}
                pow={pow}
                result={data}
              />
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
            index={index}
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
