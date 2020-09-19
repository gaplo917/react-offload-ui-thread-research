import React from 'react'

interface ComputeResultProps {
  index: number
  base: number
  pow: number
  result: number
}

const ComputeResult = ({ index, base, pow, result }: ComputeResultProps) => (
  <span>
    {index}. compute({base}, {pow}) = {result}
  </span>
)

export default ComputeResult
