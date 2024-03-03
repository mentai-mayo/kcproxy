
import fs from "node:fs";

import { CommunicationData } from "./proxy/main.js";

/** /records/kcsapis (absolute / no_last_slash) */
const kcsapi_dist = new URL(import.meta.resolve("../../records/kcsapis")).pathname.substring(process.platform === "win32" ? 1 : 0); // from /dist/sources/filelog.js

export function writeKcsApiLog(comm: CommunicationData): void {
  const jsonc =
  "{\n" +
  `  "method": "${ comm.method }",\n` +
  `  "url": "${ comm.url.toString() }",\n` +
  `  "req": {\n` +
  `    "headers": ${ JSON.stringify(comm.request.headers, void 0, 2).replace(/(\r?\n)/g, "\n    ") },\n` +
  `    "body": ${ comm.request.body === null ? "null" : `${ JSON.stringify(Object.fromEntries(new URLSearchParams(comm.request.body.toString("utf-8")).entries()), void 0, 2).replace(/(\r?\n)/g, "\n    ") }` },\n` +
  `    "timing": ${ comm.request.timing.getTime() }\n` +
  "  },\n" +
  `  "res": {\n` +
  `    "headers": ${ JSON.stringify(comm.response.headers, void 0, 2).replace(/(\r?\n)/g, "\n    ") },\n` +
  `    "body": ${ comm.response.body === null ? "null" : body2jsonc(comm.response.body).replace(/(\r?\n)/g, "\n    ") },\n` +
  `    "timing": ${ comm.response.timing.getTime() }\n` +
  "  }\n" +
  "}";

  const filename = `${ comm.request.timing.getTime() }-${ comm.response.timing.getTime() }`;
  let trycnt = 0;
  while (fs.existsSync(`${ kcsapi_dist }/${ filename }${ trycnt ? "." + trycnt : "" }.jsonc`)) trycnt++;
  const path = `${ kcsapi_dist }/${ filename }${ trycnt ? "." + trycnt : "" }.jsonc`;
  fs.writeFileSync(path, jsonc, { encoding: "utf-8" });
}

const body2jsonc = (body: Buffer) => "/* svdata = */" + JSON.stringify(JSON.parse(body.toString("utf-8").substring("svdata=".length)), void 0, 2);
