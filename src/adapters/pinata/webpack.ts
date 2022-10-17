import path from 'path'
import type { Configuration as WebpackConfig } from 'webpack'

export const extendWebpackConfig = (existingWebpackConfig: WebpackConfig): WebpackConfig => {
  const newConfig: WebpackConfig = {
    ...existingWebpackConfig,
    resolve: {
      ...(existingWebpackConfig.resolve || {}),
      alias: {
        ...(existingWebpackConfig.resolve?.alias ? existingWebpackConfig.resolve.alias : {}),
        '@pinata/sdk': path.resolve(__dirname, './mock.js'),
      },
    },
  }

  return newConfig
}
