import type { PinataClient } from '@pinata/sdk'
import type { HandleDelete } from '../../types'

interface Args {
  getStorageClient: () => PinataClient
}

export const getHandleDelete = ({ getStorageClient }: Args): HandleDelete => {
  return async ({ filename }) => {
    try {
      const object = await getStorageClient().pinList({
        metadata: {
          name: filename,
          keyvalues: {},
        },
      })

      if (object.rows.length > 0) {
        await getStorageClient().unpin(object.rows[0].ipfs_pin_hash)
      }
    } catch (e: unknown) {
      console.error(`Error while unpinning in Pinata: ${e}`)
    }
  }
}
