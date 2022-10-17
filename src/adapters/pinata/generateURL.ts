// import path from 'path'
import type { GenerateURL } from '../../types'

export const getGenerateURL =
  (): GenerateURL =>
  ({ filename, prefix = '' }) => {
    return `${'endpoint'}/pinning/`
  }
