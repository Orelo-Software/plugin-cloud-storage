import pinataClient from '@pinata/sdk'
import type { PinataClient } from '@pinata/sdk'
import type { Adapter, GeneratedAdapter } from '../../types'
// import { getGenerateURL } from './generateURL'
// import { getHandler } from './staticHandler'
// import { getHandleDelete } from './handleDelete'
import { getHandleUpload } from './handleUpload'
import { extendWebpackConfig } from './webpack'

export interface PinataConfig {
  pinataApiKey: string
  pinataSecretApiKey: string
}

export const pinataAdapter =
  ({ pinataApiKey, pinataSecretApiKey }: PinataConfig): Adapter =>
  ({ collection }): GeneratedAdapter => {
    let storageClient: PinataClient | null = null
    const getStorageClient = (): PinataClient => {
      if (storageClient) return storageClient
      storageClient = pinataClient(pinataApiKey, pinataSecretApiKey)
      return storageClient
    }

    return {
      handleUpload: getHandleUpload({ getStorageClient, collection }),
      handleDelete: () => console.log('handle delete'),
      generateURL: () => {
        console.log('Generate url')
        return 'generated url here'
      },
      staticHandler: () => console.log('static handler here'),
      webpack: extendWebpackConfig,
    }
  }
