export const isExternal = (path: string): boolean => {
  return /http?/.test(path)
}
