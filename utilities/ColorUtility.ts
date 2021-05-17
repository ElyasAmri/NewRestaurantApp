export function invertColor(color: string) {
  const ret =  (Number(`0x1${color.replace("#", "")}`) ^ 0xFFF)
      .toString(16).substr(1).toUpperCase()
  return `#${ret}`
}
