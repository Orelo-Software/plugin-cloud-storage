import type { PinataClient } from '@pinata/sdk'
import { Readable } from 'stream'
import type { StaticHandler } from '../../types'

interface Args {
  getStorageClient: () => PinataClient
}

export const getHandler = ({ getStorageClient }: Args): StaticHandler => {
  return async (req, res, next) => {
    try {
      const object = await getStorageClient().pinList({
        metadata: {
          name: req.params.filename,
          keyvalues: {},
        },
      })

      if (object.rows.length > 0) {
        const pinData = await fetch(
          `https://gateway.pinata.cloud/ipfs/${object.rows[0].ipfs_pin_hash}`,
        )

        res.set({
          'Content-Length': pinData.headers.get('content-type'),
          'Content-Type': pinData.headers.get('content-length'),
          ETag: pinData.headers.get('etag'),
        })

        const arrBuffer = await pinData.arrayBuffer()
        const buffer = Buffer.from(arrBuffer)
        const stream = Readable.from(buffer)

        return stream.pipe(res)
      }

      return next()
    } catch (err: unknown) {
      req.payload.logger.error(err)
      return next()
    }
  }
}
