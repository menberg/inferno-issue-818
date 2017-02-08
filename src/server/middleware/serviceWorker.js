import { resolve as pathResolve } from 'path'
import appRootDir from 'app-root-dir'

import projConfig from '../../../config/private/project'

// Middleware to server our service worker.
function serviceWorkerMiddleware (
  req, res, next) {
  res.sendFile(
    pathResolve(
      appRootDir.get(),
      projConfig.bundles.client.outputPath,
      projConfig.serviceWorker.fileName,
    ),
  )
}

export default serviceWorkerMiddleware
