import React from 'react'

interface ComputeErrorMessageProps {
  index: number
  base: number
  pow: number
}

const ComputeErrorMessage = ({
  index,
  base,
  pow,
}: ComputeErrorMessageProps) => (
  <span>
    {index}. cannot load {base},{pow}
  </span>
)

export default ComputeErrorMessage
