import * as http from 'http';
import * as querystring from 'querystring';
import * as fs from 'fs';
import { Stream } from 'stream';

import {
  FAIL_EXCEPTION_CODE,
  Handler,
  Toolkit,
} from '../daisugi/daisugi';
import { compress } from './compress';
import { setCache, setInfiniteCache } from './cache';
import {
  get,
  post,
  put,
  patch,
  routeDelete,
  all,
  notFound,
} from './router';
import { validate } from './validate';
import { isStream } from './utils';
import { Context } from './types';
import { streamToBuffer } from './streamToBuffer';

export { Context as Context };

function getQuerystring(
  querystringStartPosition: number,
  rawRequest: http.IncomingMessage,
) {
  if (querystringStartPosition > -1) {
    return querystring.parse(
      rawRequest.url.slice(querystringStartPosition + 1),
    );
  }

  return {};
}

function getUrl(
  querystringStartPosition: number,
  rawRequest: http.IncomingMessage,
) {
  if (querystringStartPosition > -1) {
    return rawRequest.url.slice(
      0,
      querystringStartPosition,
    );
  }

  return rawRequest.url;
}

function deferredPromise() {
  let resolve;
  let reject;

  const promise = new Promise(
    (privateResolve, privateReject) => {
      resolve = privateResolve;
      reject = privateReject;
    },
  );

  return {
    resolve,
    reject,
    promise,
  };
}

function createContext(
  rawRequest: http.IncomingMessage,
  rawResponse: http.ServerResponse,
): Context {
  const querystringStartPosition =
    rawRequest.url.indexOf('?');

  return {
    rawRequest,
    rawResponse,
    request: {
      url: getUrl(querystringStartPosition, rawRequest),
      matchedRoutePath: null,
      params: {},
      headers: rawRequest.headers,
      querystring: getQuerystring(
        querystringStartPosition,
        rawRequest,
      ),
      body: {},
      method: rawRequest.method,
    },
    response: {
      statusCode: 200,
      body: null,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'text/html; charset=UTF-8',
        'last-modified': new Date().toUTCString(),
      },
    },
    sendFile(url) {
      const fileStream = fs.createReadStream(url);

      this.response.body = fileStream;
    },
  };
}

function createWebServer(port = 3000) {
  // TODO: test timeout error.
  const connectionTimeout = 30000; // 30s
  const keepAliveTimeout = 5000; // 5s default NodeJS
  // const bodyLimit = 1024 * 1024; // 1 MB
  // TODO: limit body.

  function handler(toolkit: Toolkit) {
    const isStarted = deferredPromise();

    const server = http.createServer(
      async (rawRequest, rawResponse) => {
        const context = createContext(
          rawRequest,
          rawResponse,
        );

        await toolkit.nextWith(context);

        let body = context.response.body;

        if (body) {
          if (isStream(body)) {
            // TODO: Use then here.
            body = await streamToBuffer(body as Stream);

            context.response.headers['content-length'] =
              body.length;
          }

          if (typeof body === 'string') {
            context.response.headers['content-length'] =
              Buffer.byteLength(body);
          }
        }

        rawResponse.statusCode =
          context.response.statusCode;

        Object.entries(context.response.headers).forEach(
          ([key, value]) => {
            rawResponse.setHeader(key, value);
          },
        );

        // Maybe introduce short circuit when method is HEAD.
        if (!body) {
          rawResponse.end();
          return;
        }

        rawResponse.end(body);
      },
    );

    server.setTimeout(connectionTimeout, () => {
      // TODO: Log timeout.
      console.log('Request timeout');
    });
    server.keepAliveTimeout = keepAliveTimeout;

    server.listen(port, () => {
      isStarted.resolve();
    });

    return isStarted.promise;
  }

  handler.meta = {
    injectToolkit: true,
  };

  return handler;
}

function captureError(userHandler: Handler) {
  function handler(context: Context, toolkit: Toolkit) {
    try {
      const result = toolkit.next;

      if (
        result.isFailure &&
        result.error.code === FAIL_EXCEPTION_CODE
      ) {
        return userHandler(result.error.value);
      }

      if (context.response.statusCode >= 500) {
        return userHandler(result.error.value);
      }

      return context;
    } catch (error) {
      console.log(error);

      return userHandler(context);
    }
  }

  handler.meta = {
    injectToolkit: true,
  };

  return handler;
}

export function oza() {
  return {
    createWebServer,
    get,
    post,
    put,
    patch,
    routeDelete,
    all,
    notFound,
    validate,
    captureError,
    compress,
    setCache,
    setInfiniteCache,
  };
}
