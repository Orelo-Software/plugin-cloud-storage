import fs from 'fs'
// import { Readable } from 'stream'
import type { PinataClient } from '@pinata/sdk'
import type { CollectionConfig } from 'payload/types'
import type { HandleUpload } from '../../types'

interface Args {
  collection: CollectionConfig
  getStorageClient: () => PinataClient
}

export const getHandleUpload = ({ getStorageClient }: Args): HandleUpload => {
  return async ({ data, file }) => {
    const path = `/tmp/imageUpload-${file.filename}`
    fs.writeFileSync(path, file.buffer, { encoding: 'utf-8' })
    const stream = fs.createReadStream(path)
    // const stream = Readable.from(file.buffer)

    const res = await getStorageClient().pinFileToIPFS(stream, {
      pinataMetadata: { name: file.filename },
    })
    console.log(res)
  }
}
