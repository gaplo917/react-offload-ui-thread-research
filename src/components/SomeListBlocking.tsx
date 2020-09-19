import React, { useMemo } from 'react'
import { compute } from '../workers/compute'
import VirtualList from './VirtualList'

interface TabContentProps {
  base: number
  pow: number
  style: React.CSSProperties
  isScrolling: boolean
}

function TabContent({ base, pow, style, isScrolling }: TabContentProps) {
  const result = isScrolling
    ? 'loading'
    : useMemo(() => {
        const result = compute(base, pow)
        return `compute(${base}, ${pow}) = ${result}`
      }, [base, pow])
  return (
    <p style={{ padding: 16, ...style }}>
      <span>{result}</span>
    </p>
  )
}

export default function SomeListBlocking() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) => ({ key, style, isScrolling }) => (
        <TabContent
          key={key}
          base={base}
          pow={pow}
          style={style}
          isScrolling={isScrolling}
        />
      )}
    />
  )
}
