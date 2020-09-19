// noting special, just a compute task that could use CPU
export function compute(base: number, pow: number): number {
  let result = 0
  let i = 0
  const len = Math.pow(base, pow)
  while (i < len) {
    result += Math.sin(i) * Math.sin(i) + Math.cos(i) * Math.cos(i)
    i++
  }

  return result
}
