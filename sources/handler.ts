
import fs from "node:fs";

import { CommunicationData } from "./proxy/main.js";
import { writeKcsApiLog } from "./filelog.js";

/** /records/kcsapis (absolute / no_last_slash) */
const log_dist = new URL(import.meta.resolve("../../records/kcsapis")).pathname.substring(process.platform === "win32" ? 1 : 0); // from /dist/sources/handler.js

const kcips = [
  "203.104.209.7",
  "203.104.209.71",
  "203.104.209.87",
  "125.6.184.215",
  "203.104.209.183",
  "203.104.209.150",
  "203.104.209.134", // truk server
  "203.104.209.167",
  "203.104.209.199",
  "125.6.189.7",
  "125.6.189.39",
  "125.6.189.71",
  "125.6.189.103",
  "125.6.189.135",
  "125.6.189.167",
  "125.6.189.215",
  "125.6.189.247",
  "203.104.209.23",
  "203.104.209.39",
  "203.104.209.55",
  "203.104.209.102",
] as const;

export function handler(data: CommunicationData): void {
  if ((kcips as readonly string[]).includes(data.url.hostname)) {
    // maybe kc communication
    console.log("");
    console.log("\x1b[32mKanColle\x1b[0m", data.method, data.url.toString());
    console.log("req:", enc(data.request.headers["content-type"] ?? "", data.request.body));
    console.log("res:", enc(data.response.headers["content-type"] ?? "", data.response.body));

    // kcsapi data => write to /records/kcsapis/[timing].json
    if (data.url.pathname.includes("/kcsapi/")) {
      // kcsapi communication
      writeKcsApiLog(data);
    }
  }
}

const enc = (ctype: string, body: Buffer | null): string | Buffer | null => ( body !== null ? (ctype.includes("text/") || ctype === "application/x-www-form-urlencoded") ? body.toString("utf-8") : body : null);
