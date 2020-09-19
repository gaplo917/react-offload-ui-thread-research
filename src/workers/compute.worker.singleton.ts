import { compute as computeBlocking } from './compute'

export async function compute(a: number, b: number): Promise<number> {
  return computeBlocking(a, b)
}
