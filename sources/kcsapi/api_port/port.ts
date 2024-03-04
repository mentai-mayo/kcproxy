
export interface RequestBody {
  /** hex */
  api_token: string;
  /**  */
  api_verno: `${ number }`;
  /** */
  api_sort_key: `${ number }`;
  /** */
  api_sort_order: `${ number }`;
  /** */
  api_port: `${ number }`;
}

export interface ResponseBody {
  /** */
  api_result: number;
  /** */
  api_result_msg: string;
  /** main content */
  api_data: {
    /** */
    api_event_object: {
      api_c_num: number;
      api_m_flag: number;
    };
    /** 資材量 */
    api_material: {
      /** User ID */
      api_member_id: number;
      /**
       * 資材 ID
       * 1: 燃料
       * 2: 弾薬
       * 3: 鋼材
       * 4: ボーキ
       * 5: 高速建造材
       * 6: 高速修復材
       * 7: 開発資材
       * 8: 改修資材
       */
      api_id: number;
      /** 資材量 */
      api_value: number;
    }[];
    /** 艦隊情報 */
    api_deck_port: {
      /** User ID */
      api_member_id: number;
      /** ID */
      api_id: number;
      /** 艦隊名 */
      api_name: string;
      /** */
      api_name_id: string;
      /** */
      api_mission: [ number, number, number, number ];
      /** */
      api_flagship: `${ number }`;
      /** 艦娘IDのリスト (-1: unset / 多分第3艦隊は7隻) */
      api_ship: [ number, number, number, number, number, number ] | [ number, number, number, number, number, number, number ];
    }[];
    /** 入渠ドック状況 (api_ndock.length = 4) */
    api_ndock: {
      /** User ID */
      api_member_id: number;
      /** ID (1, 2, 3, 4) */
      api_id: number;
      /** 状態 (-1: 未開放, 0: 空) */
      api_state: number;
      /** 入渠中艦娘ID */
      api_ship_id: number;
      /** 完了までの時間 ? */
      api_complete_time: number;
      /** `api_complete_time`の文字表示 */
      api_complete_time_str: string;
      /** */
      api_item1: number;
      /** */
      api_item2: number;
      /** */
      api_item3: number;
      /** */
      api_item4: number;
    }[];
    /** 所持艦娘一覧 */
    api_ship: {
      /** 艦娘ID */
      api_id: number;
      /** */
      api_sortno: number;
      /** マスタID */
      api_ship_id: number;
      /** レベル */
      api_lv: number;
      /** 経験値 [ 総経験値, 次のレベルまで, ? ] */
      api_exp: [ number, number, number ];
      /** 残りHP */
      api_nowhp: number;
      /** 最大HP */
      api_maxhp: number;
      /** 艦速 (5: 低速, 10: 高速) */
      api_soku: number;
      /** 射程 (1: 短) */
      api_leng: number;
      /** 装備 (-1: unset) */
      api_slot: [ number, number, number, number, number ];
      /** 搭載数 ? */
      api_onslot: [ number, number, number, number, number ];
      /** 増設スロット ? */
      api_slot_ex: number;
      /** 改修値 [ 火力, 雷装, 対空, 装甲, (対潜, 耐久, 運 / 順番不明) ] */
      api_kyouka: [ number, number, number, number, number, number, number ];
      /** レアリティ */
      api_backs: number;
      /** 搭載燃料量 */
      api_fuel: number;
      /** 搭載弾薬量 */
      api_bull: number;
      /** 装備スロット開放数 ? */
      api_slot_num: number;
      /** 入渠時必要時間 */
      api_ndock_time: number;
      /** 入渠時消費資材量 */
      api_ndock_item: [ number, number ];
      /** レベルの下に表示される星とかかなぁ ? */
      api_srate: number;
      /** cond値 */
      api_cond: number;
      /** 火力 [ 現在, 最大値 ] */
      api_karyoku: [ number, number ];
      /** 雷装 [ 現在, 最大値 ] */
      api_raisou: [ number, number ];
      /** 対空 [ 現在, 最大値 ] */
      api_taiku: [ number, number ];
      /** 装甲 [ 現在, 最大値 ] */
      api_soukou: [ number, number ];
      /** 回避 [ 現在, Lv.99値 ] */
      api_kaihi: [ number, number ];
      /** 対潜 [ 現在, Lv.99値 ] */
      api_taisen: [ number, number ];
      /** 索敵 [ 現在, Lv.99値 ] */
      api_sakuteki: [ number, number ];
      /** 運 [ 現在, Lv.99値 ] */
      api_lucky: [ number, number ];
      /** ロック状態 (0 or 1 ?) */
      api_locked: number;
      /** ロック装備保持 */
      api_locked_equip: number;
      /** 出撃中マップ ? (0: 未出撃) */
      api_sally_area: number;
    }[];
    /** ユーザデータ */
    api_basic: {
      /** User ID */
      api_member_id: number;
      /** 提督名 */
      api_nickname: string;
      /** */
      api_nickname_id: `${ string }`;
      /** (0 or 1 ?) */
      api_active_flag: number;
      /** (unix-time ?) */
      api_starttime: number;
      /** 提督レベル */
      api_level: number;
      /**
       * 10: 新米少佐 ?
      **/
      api_rank: number;
      /** 総提督経験値量 */
      api_experience: number;
      /** */
      api_fleetname: string | null;
      /** 提督コメント */
      api_comment: string;
      /** */
      api_comment_id: `${ string }`;
      /** 保有可能艦娘数 */
      api_max_chara: number;
      /** 保有可能装備数 */
      api_max_slotitem: number;
      /** 保有可能家具数 */
      api_max_kagu: number;
      /** */
      api_playtime: number;
      /** チュートリアル進行中 ? (0: 完了, 1: 進行中 ?) */
      api_tutorial: number;
      /** 設定されている家具 */
      api_furniture: [ number, number, number, number, number, number ];
      /** 艦隊数 */
      api_count_deck: number;
      /** 建造ドック利用可能数 */
      api_count_kdock: number;
      /** 入渠ドック利用可能数 */
      api_count_ndock: number;
      /** 家具コイン保有数 ? */
      api_fcoin: number;
      /** 出撃勝数 */
      api_st_win: number;
      /** 出撃敗数 */
      api_st_lose: number;
      /** 遠征回数 */
      api_ms_count: number;
      /** 遠征成功回数 */
      api_ms_success: number;
      /** 演習勝数 */
      api_pt_win: number;
      /** 演習敗数 */
      api_pt_lose: number;
      /** 演習受け回数 */
      api_pt_challenged: number;
      /** 演習受け勝数 */
      api_pt_challenged_win: number;
      /** (0 or 1) */
      api_firstflag: number;
      /** チュートリアル進行状況 (100: 完了) */
      api_tutorial_progress: number;
      /** */
      api_pvp: [ number, number ];
      /** */
      api_medals: number;
      /** 大型建造ドック開放状況 (0: 未開放, 1: 開放 ?) */
      api_large_dock: number;
    };
    /** ログ (母港の下から出てくるやつ) */
    api_log: {
      api_no: number;
      api_type: `${ number }`;
      api_state: `${ number }`;
      /** メッセージ */
      api_message: string;
    }[];
    /** 連合艦隊 (0: 通常, 1: 連合 ?) */
    api_combined_flag: number;
    /** 母港BGM ID */
    api_p_bgm_id: number;
    /** 最大受領可能任務数 */
    api_parallel_quest_count: number;
    /** */
    api_dest_ship_slot: number;
  };
}
