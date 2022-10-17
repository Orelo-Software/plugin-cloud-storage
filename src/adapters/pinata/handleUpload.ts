import fs from 'fs'
import type { PinataClient } from '@pinata/sdk'
import type { CollectionConfig } from 'payload/types'
import type { HandleUpload } from '../../types'

interface Args {
  collection: CollectionConfig
  getStorageClient: () => PinataClient
}

export const getHandleUpload = ({ getStorageClient }: Args): HandleUpload => {
  return async ({ data, file }) => {
    const path = `/tmp/imageUpload-${'test'}`
    fs.writeFileSync(path, file.buffer, { encoding: 'utf-8' })
    const stream = fs.createReadStream(path)

    const res = await getStorageClient().pinFileToIPFS(stream, {
      pinataMetadata: { name: 'from_adapter' },
    })
    console.log(res)
  }
}
