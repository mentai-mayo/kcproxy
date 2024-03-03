
export interface RequestBody {
  /** hex */
  api_token: string;
  /**  */
  api_verno: `${ number }`;
}

export interface ResponseBody {
  /**  */
  api_result: number;
  /**  */
  api_result_msg: string;
  /** main content */
  api_data: {
    /** 艦娘マスタデータ */
    api_mst_ship: {
      /** ID */
      api_id: number;
      /** 図鑑番号 */
      api_sortno: number;
      /** 艦名 */
      api_name: string;
      /** 艦名の読み */
      api_yomi: string;
      /**
       * 艦種
       * - 02: 駆逐艦
       * - 03: 軽巡洋艦
       * - 04: 重雷装巡洋艦
       * - 05: 重巡洋艦
       * - 06: 航空巡洋艦
       * - 07: 軽空母
       * - 08: 高速(巡洋)戦艦
       * - 09: 低速戦艦
       */
      api_stype: number;
      /**
       * 艦級
       * - 01: 綾波型
       * - 02: 伊勢型
       * - 04: 球磨型
       * - 05: 暁型
       * - 06: 金剛型
       * - 07: 古鷹型
       * - 08: 高雄型
       * - 09: 最上型
       * - 10: 初春型
       * - 11: 祥鳳型
       * - 12: 吹雪型
       * - 13: 青葉型
       * - 18: 朝潮型
       * - 19: 長門型
       * - 20: 長良型
       * - 21: 天龍型
       * - 22: 島風型
       * - 23: 白露型
       * - 24: 飛鷹型
       * - 26: 扶桑型
       * - 28: 睦月型
       * - 29: 妙高型
       * - 30: 陽炎型
       * - 31: 利根型
       * - 32: 龍驤型
       */
      api_ctype: number;
      /** 改造レベル */
      api_afterlv: number;
      /** 改造後 ID */
      api_aftershipid: `${ number }`;
      /** 耐久(HP) [ 初期値, 最大値(lv.99) ] */
      api_taik: [ number, number ];
      /** 装甲 [ 初期値, 最大値(lv.99) ] */
      api_souk: [ number, number ];
      /** 火力 [ 初期値, 最大値(lv.99) ] */
      api_houg: [ number, number ];
      /** 雷装 [ 初期値, 最大値(lv.99) ] */
      api_raig: [ number, number ];
      /** 対空 [ 初期値, 最大値(lv.99) ] */
      api_tyku: [ number, number ];
      /** 運 [ 初期値, 最大値(lv.99) ] */
      api_luck: [ number, number ];
      /**
       * 艦速
       * - 05: 低速
       * - 10: 高速
       */
      api_soku: number;
      /**
       * 射程
       * - 1: 短
       * - 2: 中
       * - 3: 長
       * - 4: 超長
       */
      api_leng: number;
      /** 使用可能スロット数 */
      api_slot_num: number;
      /** 搭載数 */
      api_maxeq: [ number, number, number, number, number ];
      /** 建造時間 (min) */
      api_buildtime: number;
      /** 解体時入手資材量 [ 燃料, 弾薬, 鋼材, ボーキ ] */
      api_broken: [ number, number, number, number ];
      /** 改修上昇量 [ 火力, 雷装, 対空, 装甲 ] */
      api_powup: [ number, number, number, number ];
      /**
       * レアリティ?
       * - 1: 藍 #7893d5
       * - 2: 青 #8ab9da
       * - 3: 水 #8fd2da
       * - 4: 銀 #8b919b
       * - 5: 金 #bc9c36
       * - 6: 虹
       * - 7: 輝虹
       * - 8: 桜虹
       */
      api_backs: number;
      /** 入手時メッセージ */
      api_getmes: string;
      /** 改造時消費燃料量 (? -> 七四式だと鋼材になってる？) */
      api_afterfuel: number;
      /** 改造時消費弾薬量 */
      api_afterbull: number;
      /** 燃料搭載量 */
      api_fuel_max: number;
      /** 弾薬搭載量 */
      api_bull_max: number;
      /** ボイス関連の何かだとは思う */
      api_voicef: number;
    }[];
    /** 装備アイテムタイプマスタデータ */
    api_mst_slotitem_equiptype: {
      /** ID */
      api_id: number;
      /** 装備種別名 */
      api_name: string;
      /** */
      api_show_flg: number;
    }[];
    /** */
    api_mst_equip_exslot: number[];
    /** */
    api_mst_equip_exslot_ship: {
      [key: `${ number }`]: {
        api_ship_ids: {
          [key: `${ number }`]: number; // 1 かも
        } | null;
        api_stypes: {
          [key: `${ number }`]: number; // 1 かも
        } | null;
        api_ctypes: {
          [key: `${ number }`]: number; // 1 かも
        } | null;
        api_req_level: number;
      };
    };
    /** 艦種 */
    api_mst_stype: {
      /** ID */
      api_id: number;
      /** */
      api_sortno: number;
      /** 艦種名 (eg. 海防艦) */
      api_name: string;
      /** */
      api_scnt: number;
      /** */
      api_kcnt: number;
      /** */
      api_equip_type: {
        [key: `${ number }`]: number; // 0 | 1 かも
      };
    }[];
    /** 装備アイテム */
    api_mst_slotitem: {
      /** ID */
      api_id: number;
      /** 図鑑番号 */
      api_sortno: number;
      /** 装備名 */
      api_name: string;
      /** ? */
      api_type: [ number, number, number, number, number ];
      // 九七式艦攻:   type = 3, 5, 8, 8,  1
      // 天山:         type = 3, 5, 8, 8,  1
      // 流星:         type = 3, 5, 8, 8, 33
      // 九六式艦戦:   type = 3, 5, 6, 6, 11
      // 零式艦戦21型: type = 3, 5, 6, 6, 11
      // 零式艦戦52型: type = 3, 5, 6, 6, 12
      /** */
      api_taik: number;
      /** 装甲 */
      api_souk: number;
      /** 火力 */
      api_houg: number;
      /** 雷装 */
      api_raig: number;
      /** */
      api_soku: number;
      /** 爆装 */
      api_baku: number;
      /** 対空 */
      api_tyku: number;
      /** 対潜 */
      api_tais: number;
      /** */
      api_atap: number;
      /** 命中 */
      api_houm: number;
      /** ? */
      api_raim: number;
      // 九七式艦攻: raim = 16
      // 天山:       raim = 24
      // 流星:       raim = 56
      // 九六式艦戦: raim =  0 (艦戦系は0っぽい)
      /** 回避 */
      api_houk: number;
      /** */
      api_raik: number;
      /** */
      api_bakk: number;
      /** 索敵 */
      api_saku: number;
      /** */
      api_sakb: number;
      /** */
      api_luck: number;
      /**
       * 射程
       * - 1: 短
       * - 4: 超長
       */
      api_leng: number;
      /** 配備コスト (航空機系のみキーが存在) */
      api_cost?: number;
      /** 戦闘行動半径 (航空機系のみキーが存在) */
      api_distance?: number;
      /**
       * レアリティ
       * - 0: コモン
       * - 1: レア
       * - 2: ホロ
       */
      api_rare: number;
      /** 廃棄 [ 燃料, 弾薬, 鋼材, ボーキ ] */
      api_broken: [ number, number, number, number ];
      /** */
      api_usebull: `${ number }`;
      /** */
      api_version: number;
    }[];
    /** 家具 */
    api_mst_furnituregraph: {
      /** */
      api_id: number;
      /** */
      api_type: number;
      /** */
      api_no: number;
      /** */
      api_filename: string; // printf("%03d", number)
      /** */
      api_version: `${ number }`;
    }[];
    /** 消費アイテム */
    api_mst_useitem: {
      /** */
      api_id: number;
      /** */
      api_usetype: number;
      /** */
      api_category: number;
      /** */
      api_name: string;
      /** */
      api_description: [ string, string ];
      /** */
      api_price: number;
    }[];
    /** 課金アイテム */
    api_mst_payitem: {
      /** */
      api_id: number;
      /** */
      api_type: number;
      /** */
      api_name: string;
      /** */
      api_description: string;
      /** */
      api_shop_description: string;
      /** */
      api_item: [ number, number, number, number, number, number, number, number ];
      /** */
      api_price: number;
    }[];
    /** */
    api_mst_item_shop: {
      /** */
      api_cabinet_1: number[];
      /** */
      api_cabinet_2: number[];
    };
    /** 海域データ */
    api_mst_maparea: {
      /** */
      api_id: number;
      /** */
      api_name: string;
      /** */
      api_type: number;
    }[];
    /** */
    api_mst_mapinfo: {
      api_id: number;
      api_maparea_id: number;
      api_no: number;
      api_name: string;
      api_level: number;
      api_opetext: string;
      api_infotext: string;
      api_item: [ number, number, number, number ];
      /** ゲージHP */
      api_max_maphp: number | null;
      /** ゲージ撃破回数 */
      api_required_defeat_count: number | null;
      api_sally_flag: [ number, number, number ];
    }[];
    /** */
    api_mst_mapbgm: {
      api_id: number;
      api_maparea_id: number;
      api_no: number;
      api_moving_bgm: number;
      api_map_bgm: [ number, number ];
      api_boss_bgm: [ number, number ];
    }[];
    /** 遠征 */
    api_mst_mission: {
      api_id: number;
      api_disp_no: string; // printf("%02d", number)
      api_maparea_id: number;
      api_name: string;
      api_details: string;
      api_reset_type: number;
      api_damage_type: number;
      api_time: 15;
      api_deck_num: number;
      api_difficulty: number;
      api_use_fuel: number;
      api_use_bull: number;
      api_win_item1: [ number, number ];
      api_win_item2: [ number, number ];
      api_win_mat_level: [ number, number, number, number ];
      api_return_flag: number;
      api_sample_fleet: [ number, number, number, number, number, number ];
    }[];
    /** */
    api_mst_const: {
      api_parallel_quest_max: {
        api_string_value: string;
        api_int_value: number;
      };
      api_dpflag_quest: {
        api_string_value: string;
        api_int_value: number;
      };
      api_boko_max_ships: {
        api_string_value: string;
        api_int_value: number;
      };
    };
    /** */
    api_mst_shipupgrade: {
      api_id: number;
      api_current_ship_id: number;
      api_original_ship_id: number;
      api_upgrade_type: number;
      api_upgrade_level: number;
      api_drawing_count: number;
      api_catapult_count: number;
      api_report_count: number;
      api_aviation_mat_count: number;
      api_arms_mat_count: number;
      api_sortno: number;
    }[];
    /** BGM */
    api_mst_bgm: {
      api_id: number;
      api_name: string;
    }[];
    /** */
    api_mst_equip_ship: {
      api_ship_id: number;
      api_equip_type: number[];
    }[];
    /** */
    api_mst_furniture: {
      api_id: number;
      api_type: number;
      api_no: number;
      api_title: string;
      api_description: string;
      api_rarity: number;
      api_price: number;
      api_saleflg: number;
      api_season: number;
      api_version: number;
      api_outside_id: number;
      api_active: number;
    }[];
    /** */
    api_mst_shipgraph: ({
      api_id: number;
      api_filename: string;
      api_version: [ `${ number }`, `${ number }`, `${ number }` ];
      api_battle_n: [ number, number ];
      api_battle_d: [ number, number ];
      api_sortno: number;
      api_boko_n: [ number, number ];
      api_boko_d: [ number, number ];
      api_kaisyu_n: [ number, number ];
      api_kaisyu_d: [ number, number ];
      api_kaizo_n: [ number, number ];
      api_kaizo_d: [ number, number ];
      api_map_n: [ number, number ];
      api_map_d: [ number, number ];
      api_ensyuf_n: [ number, number ];
      api_ensyuf_d: [ number, number ];
      api_enryue_n: [ number, number ];
      api_weda: [ number, number ];
      api_webd: [ number, number ];
      api_pa: [ number, number ];
      api_pab: [ number, number ];
    } | {
      api_id: number;
      api_filename: string;
      api_version: [ `${ number }`, `${ number }`, `${ number }` ];
    })[];
  }
}
