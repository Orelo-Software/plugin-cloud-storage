// import path from 'path'
import type { HandleDelete } from '../../types'

export const getHandleDelete = (): HandleDelete => {
  return async ({ filename, doc: { prefix = '' } }) => {
    console.log('Delete pin here')
  }
}
