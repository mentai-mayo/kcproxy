
export interface RequestBody {
  /** hex */
  api_token: string;
  /**  */
  api_verno: `${ number }`;
}

export interface ResponseBody {
  /** 1: success */
  api_result: number;
  /**  */
  api_result_msg: string;
  /** main content */
  api_data: {
    /**  */
    api_count: number;
  }
}
