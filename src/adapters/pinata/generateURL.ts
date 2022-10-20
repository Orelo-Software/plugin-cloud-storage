import type { PinataClient } from '@pinata/sdk'
import type { GenerateURL } from '../../types'

const defaultGateway = 'https://gateway.pinata.cloud'

interface Args {
  gateway?: string
  getStorageClient: () => PinataClient
}

export const getGenerateURL =
  ({ getStorageClient, gateway }: Args): GenerateURL =>
  async ({ filename }) => {
    const object = await getStorageClient().pinList({
      metadata: {
        name: filename,
        keyvalues: {},
      },
    })

    return `${gateway || defaultGateway}/ipfs/${object.rows[0].ipfs_pin_hash}`
  }
