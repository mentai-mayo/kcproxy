export * as api_start2 from "./kcsapi/api_start2.js";

export namespace _tools {
  export interface RequestBody {
    /** hex */
    api_token: string;
    api_verno: `${ number }`;
    /** other-values */
    [key: string]: any;
  }
  export function isRequestBody(target: any): target is RequestBody {
    if (typeof target !== "object") return false;
    if (Number.isNaN(Number("0x" + target.api_token))) return false;
    if (Number.isNaN(Number(target.api_verno))) return false;
    return true;
  }
  export interface ResponseBody {
    api_result: number;
    api_result_msg: string;
    /** main content */
    api_data: { [key: string]: any };
  }
  export function isResponseBody(target: any): target is ResponseBody {
    if (typeof target !== "object") return false;
    const root_keys = [ "api_result", "api_result_msg", "api_data" ];
    if (Object.keys(target).filter(key => !root_keys.includes(key)).length) return false;
    if (typeof target.api_result !== "number") return false;
    if (typeof target.api_result_msg !== "string") return false;
    if (typeof target.api_data !== "object") return false;
    return true;
  }
}
