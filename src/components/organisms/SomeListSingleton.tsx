import React from 'react'
import { compute } from '../../workers/compute.worker.singleton'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from '../atom/ErrorBoundary'
import VirtualList from '../molecules/VirtualList'
import Loading from '../atom/Loading'
import ComputeResult from '../atom/ComputeResult'
import ComputeErrorMessage from '../atom/ComputeErrorMessage'

interface TabContentProps {
  index: number
  base: number
  pow: number
  style: React.CSSProperties
}

function TabContent({ index, base, pow, style }: TabContentProps) {
  const suspendableData = useSuspendableData(() => compute(base, pow), [
    base,
    pow,
  ])
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

export default function SomeListSingleton() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) => ({ key, index, style }) => (
        <TabContent
          key={key}
          index={index}
          base={base}
          pow={pow}
          style={style}
        />
      )}
    />
  )
}
