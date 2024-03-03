import http from 'http';
import events from 'events';
import httpProxy from 'http-proxy';

import compress from './compress.js';

interface RequestDataStore {
  request: http.IncomingMessage;
  method: string;
  url: URL;
  headers: http.IncomingHttpHeaders;
  body: Buffer | null;
  timing: Date;
}

export interface RequestData {
  method: string;
  url: URL;
  headers: http.IncomingHttpHeaders;
  body: Buffer | null;
  timing: Date;
}

export interface ResponseData {
  method: string;
  url: URL;
  headers: http.IncomingHttpHeaders;
  body: Buffer | null;
  timing: Date;
}

export interface CommunicationData {
  method: string;
  url: URL;
  request: {
    headers: http.IncomingHttpHeaders;
    body: Buffer | null;
    timing: Date;
  }
  response: {
    headers: http.IncomingHttpHeaders;
    body: Buffer | null;
    timing: Date;
  }
}

/** proxy server */
class ProxyServer {

  /** proxy */
  private proxy: httpProxy;

  /** proxy server */
  private server: http.Server;

  /** event emitter */
  private event: events.EventEmitter;

  /** list of request data */
  private requests: RequestDataStore[];

  /** promise chain for delete response */
  private delReqListChain: Promise<void>;

  public constructor() {
    this.proxy = httpProxy.createProxyServer();
    this.server = http.createServer();
    this.event = new events.EventEmitter;
    this.requests = [];
    this.delReqListChain = (async()=>{})();
    this.initServer();
  }

  public on(name: 'request', listener: (data: RequestData) => void): void;
  public on(name: 'response', listener: (data: ResponseData) => void): void;
  public on(name: 'communication', listener: (data: CommunicationData) => void): void;
  public on(name: 'request' | 'response' | 'communication', listener: (arg_1: any) => void): void {
    this.event.on(name, listener);
  }

  public async listen(port: number = 8000, callback?: () => void): Promise<void> {
    this.server.listen(port, () => { console.log(`proxyServer listening on localhost:${ port }`); if(callback) callback();});
  }

  private async deleteRequest(request: http.IncomingMessage): Promise<void> {
    const func = async () => {
      // remove corresponding request from request list
      this.requests = this.requests.filter(value => value.request !== request);
    };
    this.delReqListChain = this.delReqListChain.then(func);
  }

  private getRequestData(reqSymbol: http.IncomingMessage): RequestData {
    let request: RequestData | null = null;
    // get the request corresponding to the response
    for(let value of this.requests) {
      if(reqSymbol === value.request) {
        request = (({ request: _r, ...others }) => others)(value);
      }
    }
    // if corresponding request does not exist
    if(!request) {
      throw `request(${ reqSymbol.url ?? '' }) has no corresponding request`;
    }
    this.deleteRequest(reqSymbol);
    return request;
  }

  private onProxyRequest(request: http.IncomingMessage, body: Buffer, timing: Date): void {
    const data: RequestData = {
      method: request.method ?? '',
      url: new URL(request.url ?? ''),
      headers: request.headers,
      body: body.length ? body : null,
      timing,
    };
    // emit onRequest
    this.event.emit('request', data);
    // store request data
    this.requests.push({ ...data, request });
  }

  private onProxyResponse(request: http.IncomingMessage, headers: http.IncomingHttpHeaders, body: Buffer, timing: Date): void {
    const response: ResponseData = {
      method: request.method ?? '',
      url: new URL(request.url ?? ''),
      headers,
      body: body.length ? body : null,
      timing,
    };
    // emit onResponse
    this.event.emit('response', response);

    // get the request corresponding to the response
    const reqdat: RequestData = this.getRequestData(request);
    const communication: CommunicationData = {
      method: response.method,
      url: response.url,
      request: {
        headers: reqdat.headers,
        body: reqdat.body,
        timing: reqdat.timing,
      },
      response: {
        headers: response.headers,
        body: response.body,
        timing: response.timing,
      }
    };
    // emit onCommunication
    this.event.emit('communication', communication);
  }

  private initServer(): void {
    this.server.on('request', (request, response) => {
      this.proxy.web(request, response, {
        target: `http://${ request.headers.host }`
      });
    });
    this.proxy.on('proxyReq', (_proxyReq, request, _response, _options) => {
      const timing = new Date();
      const buffer: Buffer[] = [];
      request.on('data', (chunk: Buffer) => buffer.push(chunk));
      request.once('end', () => {
        const body = compress.decode(buffer, request.headers['content-encoding'] ?? '');
        this.onProxyRequest(request, body, timing);
      });
    });
    this.proxy.on('proxyRes', (proxyRes, request, _response) => {
      const timing = new Date();
      const buffer: Buffer[] = [];
      proxyRes.on('data', (chunk: Buffer) => buffer.push(chunk));
      proxyRes.once('end', () => {
        const body = compress.decode(buffer, proxyRes.headers['content-encoding'] ?? '');
        this.onProxyResponse(request, proxyRes.headers, body, timing);
      });
    });
  }
}

/**
 * メモ
 * `body += chunk.toString('utf-8')`をgunzipしようとしてもうまくいかないので、必ず`Buffer.concat`を使って正しくBufferをつないでからgunzipすべし
 */
//

export default ProxyServer;