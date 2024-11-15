export interface Api<T = unknown> {
  code: number
  data: T
  message?: string
}
