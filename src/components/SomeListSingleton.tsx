import React from 'react'
import { compute } from '../workers/compute.worker.singleton'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from './ErrorBoundary'
import VirtualList from './VirtualList'

interface TabContentProps {
  base: number
  pow: number
  style: React.CSSProperties
}

const Loading = () => <span>loading</span>

const ErrorMessage = ({ message }: { message: string }) => (
  <span>{message}</span>
)

function TabContent({ base, pow, style }: TabContentProps) {
  const suspendableData = useSuspendableData(() => compute(base, pow), [
    base,
    pow,
  ])
  return (
    <p style={{ padding: 16, ...style }}>
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

export default function SomeListSingleton() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) => ({ key, style }) => (
        <TabContent key={key} base={base} pow={pow} style={style} />
      )}
    />
  )
}
