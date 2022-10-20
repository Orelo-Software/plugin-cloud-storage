import fs from 'fs'
import type { PinataClient } from '@pinata/sdk'
import type { CollectionConfig } from 'payload/types'
import type { HandleUpload } from '../../types'

interface Args {
  collection: CollectionConfig
  getStorageClient: () => PinataClient
}

export const getHandleUpload = ({ getStorageClient }: Args): HandleUpload => {
  return async ({ file, req }) => {
    try {
      const path = `/tmp/imageUpload-${file.filename}`
      fs.writeFileSync(path, file.buffer)
      const stream = fs.createReadStream(path)

      await getStorageClient().pinFileToIPFS(stream, {
        pinataMetadata: { name: file.filename },
      })
    } catch (err: unknown) {
      req.payload.logger.error(err)
    }
  }
}
