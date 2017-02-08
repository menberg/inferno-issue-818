// This module is responsible for generating the HTML page response for
// the react application middleware.
//
// NOTE: If you are using a service worker to support offline mode for your
// application then please make sure that you keep the structure of the html
// within this module in sync with the module used to generate the offline
// HTML page.
// @see ./tools/webpack/offlinePage/generate.js

import serialize from 'serialize-javascript'
import getAssetsForClientChunks from './getAssetsForClientChunks'
import projConfig from '../../../../config/private/project'
import htmlPageConfig from '../../../../config/public/htmlPage'

function styleTags (styles) {
  return styles
    .map(style =>
      `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" />`,
    )
    .join('\n')
}

function scriptTag (jsFilePath) {
  return `<script type="text/javascript" src="${jsFilePath}"></script>`
}

function scriptTags (jsFilePaths) {
  return jsFilePaths.map(scriptTag).join('\n')
}

export default function generateHTML (args) {
  const { reactAppString, initialState, nonce } = args

  // The chunks that we need to fetch the assets (js/css) for and then include
  // said assets as script/style tags within our html.
  const chunksForRender = [
    // We always manually add the main entry chunk for our client bundle. It
    // must always be the first item in the collection.
    'index'
  ]

  // Now we get the assets (js/css) for the chunks.
  const assetsForRender = getAssetsForClientChunks(chunksForRender)

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body =>
    `<script nonce="${nonce}" type='text/javascript'>
       ${body}
     </script>`

  return `<!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        ${styleTags(assetsForRender.css)}
      </head>
      <body>
        <div id='app'>${reactAppString || ''}</div>
        ${
          // Bind the initial application state based on the server render
          // so the client can register the correct initial state for the view.
          initialState
            ? inlineScript(`window.APP_STATE=${serialize(initialState)};`)
            : ''
        }
        ${
          // Enable the polyfill io script?
          htmlPageConfig.polyfillIO.enabled
            ? scriptTag(htmlPageConfig.polyfillIO.url)
            : ''
        }
        ${
          // When we are in development mode our development server will generate a
          // vendor DLL in order to dramatically reduce our compilation times.  Therefore
          // we need to inject the path to the vendor dll bundle below.
          // @see /tools/development/ensureVendorDLLExists.js
          process.env.NODE_ENV === 'development'
            ? scriptTag(`${projConfig.bundles.client.webPath}${projConfig.bundles.client.devVendorDLL.name}.js?t=${Date.now()}`)
            : ''
        }
        ${scriptTags(assetsForRender.js)}
      </body>
    </html>`
}
