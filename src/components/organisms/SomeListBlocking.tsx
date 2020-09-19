import React, { useMemo } from 'react'
import { compute } from '../../workers/compute'
import VirtualList from '../molecules/VirtualList'
import Loading from '../atom/Loading'
import ComputeResult from '../atom/ComputeResult'

interface TabContentProps {
  index: number
  base: number
  pow: number
  style: React.CSSProperties
  isScrolling: boolean
}

function TabContent({ index, base, pow, style, isScrolling }: TabContentProps) {
  const result = isScrolling ? (
    <Loading index={index} />
  ) : (
    useMemo(() => {
      const result = compute(base, pow)
      return (
        <ComputeResult index={index} base={base} pow={pow} result={result} />
      )
    }, [base, pow])
  )
  return <p style={{ padding: 8, ...style }}>{result}</p>
}

export default function SomeListBlocking() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) => ({
        key,
        index,
        style,
        isScrolling,
      }) => (
        <TabContent
          key={key}
          index={index}
          base={base}
          pow={pow}
          style={style}
          isScrolling={isScrolling}
        />
      )}
    />
  )
}
