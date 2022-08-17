export default function useUtils() {
  function round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }
  return { round }
}
