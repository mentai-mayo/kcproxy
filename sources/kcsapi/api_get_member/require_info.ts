
export interface RequestBody {
  /** hex */
  api_token: string;
  /**  */
  api_verno: `${ number }`;
}

export interface ResponseBody {
  /** */
  api_result: number;
  /** */
  api_result_msg: string;
  /** main content */
  api_data: {
    /** */
    api_basic: {
      /** User ID ? */
      api_member_id: number;
      /** */
      api_firstflag: number;
    };
    /** 所持装備一覧 */
    api_slot_item: {
      /** ID */
      api_id: number;
      /** マスタID */
      api_slotitem_id: number;
      /** ロック状況 (0 or 1 ?) */
      api_locked: number;
      /** 改修状況 */
      api_level: number;
    }[];
    /** */
    api_unsetslot: {
      api_slottype23: [ number, number ];
    };
    /** 建造ドック状態 (api_kdock.length = 4) */
    api_kdock: {
      /** ID (1, 2, 3, 4) */
      api_id: number;
      /** 状態 (-1: 未開放, 0: 空) */
      api_state: number;
      /** 建造された艦娘のID */
      api_created_ship_id: number;
      /** 建造完了まで ? */
      api_complete_time: number;
      /** `api_complete_time`の文字表示 ? */
      api_complete_time_str: string;
      /** */
      api_item1: number;
      /** */
      api_item2: number;
      /** */
      api_item3: number;
      /** */
      api_item4: number;
      /** */
      api_item5: number;
    }[];
    /** 家具 */
    api_furniture: {
      /** ID */
      api_id: number;
      /** */
      api_furniture_type: number;
      /** */
      api_furniture_no: number;
      /** */
      api_furniture_id: number;
    }[];
    /** */
    api_extra_supply: [ number, number ];
    /** */
    api_oss_setting: {
      api_language_type: number;
      api_oss_items: number[];
    };
    /** */
    api_skin_id: number;
    /** */
    api_position_id: number;
  };
}
