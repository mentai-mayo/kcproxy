import zlib from 'zlib';

namespace Compress {
  /** list of encoders */
  const encoders = {
    'gzip': { enc: zlib.gzipSync, dec: zlib.gunzipSync },
    'deflate': { enc: zlib.deflateSync, dec: zlib.inflateSync },
    'br': { enc: zlib.brotliCompressSync, dec: zlib.brotliDecompressSync },
  } as const;
  /** it exists in encoders */
  function isInEncoders(encoder: string): encoder is keyof typeof encoders {
    return Object.keys(encoders).includes(encoder);
  }
  /** encode uncompressed data */
  export function encode(data: Buffer | Buffer[], encoder: keyof typeof encoders | string): Buffer {
    if(data instanceof Array) {
      // if data is Array<Buffer>
      data = Buffer.concat(data);
    }
    if(!isInEncoders(encoder)) {
      // if an unsupported encoder is specified, return the data as is.
      return data;
    }
    return encoders[encoder].enc(data);
  }
  /** decode compressed data */
  export function decode(data: Buffer | Buffer[], decoder: keyof typeof encoders | string): Buffer {
    if(data instanceof Array) {
      // if data is Array<Buffer>
      data = Buffer.concat(data);
    }
    if(!isInEncoders(decoder)) {
      // if an unsupported encoder is specified, return the data as is.
      return data;
    }
    return encoders[decoder].dec(data);
  }
}

export default Compress;