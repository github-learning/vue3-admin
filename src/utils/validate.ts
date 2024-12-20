export const isExternal = (path: string): boolean => {
  return /^(https?):/.test(path)
}
