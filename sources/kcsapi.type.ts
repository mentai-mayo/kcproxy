
namespace kcsapi {
  export namespace api_start2 {
    export namespace getData {
      export interface Request extends defaults.Request { }
      export interface Response extends defaults.Response {
        /** main content */
        api_data: {
          /** 艦船マスタデータ */
          api_mst_ship: (ResFriendShipMaster | ResEnemyShipMaster)[];
          /** 装備アイテム種 */
          api_mst_slotitem_equiptype: ResEquipItemType[];
          /** 増設スロットに装備可能な装備種 ? */
          api_mst_equip_exslot: number[];
          /** 増設スロットへの特殊装備 ? */
          api_mst_equip_exslot_ship: {
            [key: `${ number }`]: {
              /** 艦船ID ? */
              api_ship_ids: {
                [key: `${ number }`]: 1 | 0 /* number */;
              } | null;
              /** 艦種ID ? */
              api_stypes: {
                [key: `${ number }`]: 1 | 0 /* number */;
              } | null;
              /** 艦級ID ? */
              api_ctypes: {
                [key: `${ number }`]: 1 | 0 /* number */;
              } | null;
              /** ? */
              api_req_level: number;
            }
          }
          /** 艦種マスタ */
          api_mst_stype: ResShipType[];
          /** 装備アイテム */
          api_mst_slotitem: ResEquipItemMaster[];
          /** 家具グラフィック */
          api_mst_furnituregraph: ResFurnitureGraph[];
          /** 消費アイテム */
          api_mst_useitem: ResItem[];
          /** 課金アイテム */
          api_mst_payitem: ResPayItem[];
          /** アイテム屋さん 品揃え */
          api_mst_item_shop: {
            /** アイテム屋さん レギュラーコーナー (12個) */
            api_cabinet_1: number[];
            /** アイテム屋さん 特選コーナー (16個 / -1 は unset) */
            api_cabinet_2: number[];
          };
          /** 海域 */
          api_mst_maparea: ResMapArea[];
          /** マップ情報 */
          api_mst_mapinfo: ResMapInfo[];
          /** 出撃bgm */
          api_mst_mapbgm: ResMapBGM[];
          /** 遠征 */
          api_mst_mission: ResMission[];
          /** 定数群 */
          api_mst_const: {
            /** 最大受領可能任務数の最大値 ? */
            api_parallel_quest_max: {
              api_string_value: string;
              api_int_value: number;
            }
            api_dpflag_quest: {
              api_string_value: string;
              api_int_value: number; // 0 or 1 ?
            }
            /** 最大保有艦娘数の最大値 ? */
            api_boko_max_ships: {
              api_string_value: string;
              api_int_value: number;
            }
          }
          /** 改装 */
          api_mst_shipupgrade: ResShipUpgrade[];
          /** BGM */
          api_mst_bgm: {
            /** ID */
            api_id: number;
            /** 曲名 */
            api_name: string;
          }[];
          /** 特殊装備 */
          api_mst_equip_ship: {
            /** 艦船ID */
            api_ship_id: number;
            /** 装備可能なカテゴリのリスト */
            api_equip_type: number[];
          }[];
          /** 家具 */
          api_mst_furniture: ResFurniture[];
          /** 艦船グラフィック */
          api_mst_shipgraph: (ResFriendShipGraph | ResEnemyShipGraph)[];
        }
      }
      /** 艦娘マスタデータ */
      interface ResFriendShipMaster {
        /** ID */
        api_id: number;
        /** 図鑑番号 */
        api_sortno: number;
        /** 母港ソート順 ? */
        api_sort_id: number;
        /** 艦名 */
        api_name: string;
        /** 艦名の読み */
        api_yomi: string;
        /** 艦種 */
        api_stype: number;
        /** 艦級 */
        api_ctype: number;
        /** 改装Lv. */
        api_afterlv: number;
        /** 改装先ID */
        api_aftershipid: `${ number }`;
        /** 耐久 */
        api_taik: [ number, number ]; // [ 初期値, 最大値 ]
        /** 装甲 */
        api_souk: [ number, number ]; // [ 初期値, 最大値 ]
        /** 火力 */
        api_houg: [ number, number ]; // [ 初期値, 最大値 ]
        /** 雷装 */
        api_raug: [ number, number ]; // [ 初期値, 最大値 ]
        /** 対空 */
        api_tyku: [ number, number ]; // [ 初期値, 最大値 ]
        /** 運 */
        api_luck: [ number, number ]; // [ 初期値, 最大値 ]
        /** 速力 */
        api_soku: number; // 5: 低速, 10: 高速
        /** 射程 */
        api_leng: number; // 1: 短, 2: 中, 3: 長, 4: 超長
        /** 利用可能装備スロット数 */
        api_slot_num: number;
        /** 搭載数 */
        api_maxeq: [ number, number, number, number, number ];
        /** 建造時間 */
        api_buildtime: number; // min
        /** 解体時入手資材量 */
        api_broken: [ number, number, number, number ]; // [ 燃料, 弾薬, 鋼材, ボーキ ]
        /** 改修時ステータス上昇量 */
        api_powup: [ number, number, number, number ]; // [ 火力, 雷装, 対空, 装甲 ]
        /** レアリティ */
        api_backs: number; // 1: 藍, 2: 青, 3: 水, 4: 銀, 5: 金, 6: 虹, 7: 輝虹, 8: 桜虹
        /** 入手時メッセージ */
        api_getmes: string; // 改行は<br>
        /** 改装時消費鋼材 */
        api_afterfuel: number; // fuelだが鋼材
        /** 改装時消費弾薬 */
        api_afterbull: number;
        /** 搭載燃料量 */
        api_fuel_max: number;
        /** 搭載弾薬量 */
        api_bull_max: number;
        /** ボイス設定フラグ ? */
        api_voicef: number; // 1: 放置ボイス, 2: 時報, 3: 特殊放置ボイス (放置ボイスは5minおき、cond >= 50かつ特殊放置ボイス利用可能ならそれを利用)
      }
      /** 深海棲艦マスタデータ */
      interface ResEnemyShipMaster {
        /** ID */
        api_id: number;
        /** 母港ソート順 ? */
        api_sort_id: 0 /* number */; // 0 ?
        /** 艦名 */
        api_name: string;
        /** クラス */
        api_yomi: "" | "-" | "elite" | "flagship" /* string */; // "" or "-" or "elite" or "flagship" ?
        /** 艦種 */
        api_stype: number;
        /** 艦級 */
        api_ctype: 1 /* 1 */; // 1 ?
        /** 艦速 */
        api_soku: number; // 5: 低速 10: 高速
        /** 利用可能装備スロット数 */
        api_slot_num: number;
      }
      /** 装備アイテム種 */
      interface ResEquipItemType {
        /** ID */
        api_id: number;
        /** 装備種名 */
        api_name: string;
        /** ? */
        api_show_flg: 0 | 1 /* number */; // 0 or 1 ?
      }
      /** 艦種 */
      interface ResShipType {
        /** ID */
        api_id: number;
        /** ソート用 ? */
        api_sortno: number;
        /** 艦種名 */
        api_name: string;
        /** 入渠時間係数 ? */
        api_scnt: number;
        /** 建造時のシルエット ? */
        api_kcnt: number;
        /** 装備可能カテゴリのフラグ ? */
        api_equip_type: {
          [key: `${ number }`]: 0 | 1 /* number */;
        }
      }
      /** 装備アイテムマスタデータ */
      interface ResEquipItemMaster {
        /** ID */
        api_id: number;
        /** ソート順 ? */
        api_sortno: number;
        /** 装備名 */
        api_name: string;
        /**
         * 装備タイプ [ 大分類, 図鑑表示, カテゴリ, アイコン, 航空機カテゴリ ]
         * - api_type[0]: 大分類
         *    1. 砲
         *    2. 魚雷
         *    3. 艦載機
         *    4. 機銃/特殊弾(対空系)
         *    5. 偵察機/電探(索敵系)
         *    6. 強化
         *    7. 対潜装備
         *    8. 大発動艇/探照灯
         *    9. 簡易輸送部材
         *   10. 艦艇修理施設
         *   11. 照明弾
         *   12. 司令部施設
         *   13. 航空要員
         *   14. 高射装置
         *   15. 対地装備
         *   16. 水上艦要員
         *   17. 大型飛行艇
         *   18. 戦闘糧食
         *   19. 補給物資
         *   20. 特型内火艇
         *   21. 陸上攻撃機
         *   22. 局地戦闘機
         *   23. 輸送機材
         *   24. 潜水艦装備
         *   25. 陸上偵察機
         *   26. 大型陸上機
         * - api_type[1]: 図鑑表示
         *    1. 主砲
         *    2. 副砲
         *    3. 魚雷
         *    4. 特殊潜航艇
         *    5. 艦上機
         *    6. 対空機銃
         *    7. 偵察機
         *    8. 電探
         *    9. 強化
         *   10. ソナー
         *   11. 
         *   12. 
         *   13. 
         *   14. 上陸用舟艇
         *   15. オートジャイロ
         *   16. 対潜哨戒機
         *   17. 追加装甲
         *   18. 探照灯
         *   19. 簡易輸送部材
         *   20. 艦艇修理施設
         *   21. 照明弾
         *   22. 司令部施設
         *   23. 航空要員
         *   24. 高射装置
         *   25. 対艦強化弾
         *   26. 対地装備
         *   27. 水上艦要員
         *   28. 対空強化弾
         *   29. 対空ロケットランチャー
         *   30. 応急修理要員
         *   31. 機関部強化
         *   32. 爆雷
         *   33. 大型飛行艇
         *   34. 戦闘糧食
         *   35. 補給物資
         *   36. 多用途水上機/水上戦闘機
         *   37. 特型内火艇
         *   38. 陸上攻撃機
         *   39. 局地戦闘機
         *   40. 噴式戦闘爆撃機
         *   41. 輸送機材
         *   42. 潜水艦装備
         *   43. 多用途水上機/水上戦闘機
         *   44. ヘリコプター
         *   45. DD戦車
         *   46. 大型陸上機
         * - api_type[2]: カテゴリ (api_mst_slotitem_equiptype参照)
         *    1. 小口径主砲
         *    2. 中口径主砲
         *    3. 大口径主砲
         *    4. 副砲
         *    5. 魚雷
         *    6. 艦上戦闘機
         *    7. 艦上爆撃機
         *    8. 艦上攻撃機
         *    9. 艦上偵察機
         *   10. 水上偵察機
         *   11. 水上爆撃機
         *   12. 小型電探
         *   13. 大型電探
         *   14. ソナー
         *   15. 爆雷
         *   16. 追加装甲
         *   17. 機関部強化
         *   18. 対空強化弾
         *   19. 対艦強化弾
         *   20. VT信管
         *   21. 対空機銃
         *   22. 特殊潜航艇
         *   23. 応急修理要員
         *   24. 上陸用舟艇
         *   25. オートジャイロ
         *   26. 対潜哨戒機
         *   27. 追加装甲(中型)
         *   28. 追加装甲(大型)
         *   29. 探照灯
         *   30. 簡易輸送部材
         *   31. 艦艇修理施設
         *   32. 潜水艦魚雷
         *   33. 照明弾
         *   34. 司令部施設
         *   35. 航空要員
         *   36. 高射装置
         *   37. 対地装備
         *   38. 大口径主砲(II)
         *   39. 水上艦要員
         *   40. 大型ソナー
         *   41. 大型飛行艇
         *   42. 大型探照灯
         *   43. 戦闘糧食
         *   44. 補給物資
         *   45. 水上戦闘機
         *   46. 特型内火艇
         *   47. 陸上攻撃機
         *   48. 局地戦闘機
         *   49. 陸上偵察機
         *   50. 輸送機材
         *   51. 潜水艦装備
         *   52. 
         *   53. 大型陸上機
         *   54. 
         *   55. 
         *   56. 噴式戦闘機
         *   57. 噴式戦闘爆撃機
         *   58. 噴式攻撃機
         *   59. 噴式偵察機
         *   ...
         *   93. 大型電探(II)
         *   94. 艦上偵察機(II)
         * - api_type[3]: アイコン
         *    1. 小口径主砲
         *    2. 中口径主砲
         *    3. 大口径主砲
         *    4. 副砲
         *    5. 魚雷
         *    6. 艦上戦闘機
         *    7. 艦上爆撃機
         *    8. 艦上攻撃機
         *    9. 艦上偵察機
         *   10. 水上機
         *   11. 電探
         *   12. 対空強化弾
         *   13. 対艦強化弾
         *   14. 応急修理要員
         *   15. 対空機銃
         *   16. 高角砲
         *   17. 爆雷
         *   18. ソナー
         *   19. 機関部強化
         *   20. 上陸用舟艇
         *   21. オートジャイロ
         *   22. 対潜哨戒機
         *   23. 追加装甲
         *   24. 探照灯
         *   25. 簡易輸送部材
         *   26. 艦艇修理施設
         *   27. 照明弾
         *   28. 司令部施設
         *   29. 航空要員
         *   30. 高射装置
         *   31. 対地装備
         *   32. 水上艦要員
         *   33. 大型飛行艇
         *   34. 戦闘糧食
         *   35. 補給物資
         *   36. 特型内火艇
         *   37. 陸上攻撃機
         *   38. 局地戦闘機
         *   39. 噴式戦闘爆撃機(噴式景雲改)
         *   40. 噴式戦闘爆撃機(橘花改)
         *   41. 輸送機材
         *   42. 潜水艦装備
         *   43. 水上戦闘機
         *   44. 陸軍戦闘機
         *   45. 夜間戦闘機
         *   46. 夜間攻撃機
         *   47. 陸上対潜哨戒機
         *   48. 
         *   49. 大型陸上機
         * - api_type[3]: 航空機カテゴリ
         *    0. 非航空機
         *    1. 艦上攻撃機/艦上偵察機
         *    2. 水上偵察機/水上爆撃機
         *    3. 水上戦闘機
         *    4. 陸上攻撃機
         *    5. 零戦前期型
         *    6. 零戦後期型
         *    7. 烈風
         *    8. 海外機
         *    9. 九九式艦爆
         *   10. 彗星
         *   11. 流星
         *   12. 局地戦闘機
         *   13. 大型飛行艇
         *   14. 震電改
         *   15. 米艦載機
         *   16. 噴式景雲改
         *   17. 橘花改
         *   18. 試作機
         *   19. 伊水上機
         *   20. 強風改
         *   21. 一式戦
         *   22. 英攻撃機
         *   23. 英戦闘機
         *   24. 陸上対潜哨戒機
         *   25. 陸上偵察機
         *   26. 瑞雲
         *   27. 流星
         *   28. 烈風改良型
         *   29. 試製秋水
         *   30. 高高度局地戦闘機
         *   31. Fw190
         *   32. XF5U
         *   33. TBM-3W+3S
         *   34. 九九式艦爆改良型
         *   35. 大型陸上機
         */
        api_type: [ number, number, number, number, number ];
        /** 耐久 */
        api_taik: number; // 0のみ
        /** 装甲 */
        api_souk: number;
        /** 火力 */
        api_houg: number;
        /** 雷装 */
        api_raig: number;
        /** 速力 */
        api_soku: number;
        /** 爆走 */
        api_baku: number;
        /** 対空 */
        api_tyku: number;
        /** 対潜 */
        api_tais: number;
        /** ? */
        api_atap: number; // 0のみ
        /** 命中 or 対爆(局戦のとき) */
        api_houm: number;
        /** 雷撃命中 */
        api_raim: number; // 0のみ
        /** 回避 or 迎撃(局戦のとき) */
        api_houk: number;
        /** 雷撃回避 */
        api_raik: number; // 0のみ
        /** 爆撃回避 */
        api_bakk: number; // 0のみ
        /** 索敵 */
        api_saku: number;
        /** 索敵妨害 */
        api_sakb: number; // 0のみ
        /** 運 */
        api_luck: number; // 0のみ
        /** 射程 */
        api_leng: number;
        /** 航空機のコスト */
        api_cost?: number; // 航空機のみ存在
        /** 航続距離 */
        api_distance?: number; // 航空機のみ存在
        /** レアリティ */
        api_rare: number; // 0: コモン, 1: レア, 2: ホロ, 3: Sホロ, 4: SSホロ, 5: SSホロ', 6: SSホロ+, 7: SS++
        /** 廃棄時入手資材量 */
        api_broken: [ number, number, number, number ];
        /** ? */
        api_usebull: `${ number }`;
        /** グラフィックバージョン ? */
        api_version: number;
      }
      /** 家具グラフィック (稼働家具 ?) */
      interface ResFurnitureGraph {
        /** ID */
        api_id: number;
        /** カテゴリ ? */
        api_type: number;
        /** カテゴリ内通し番号 ? */
        api_no: number;
        /** ファイル名 */
        api_filename: string;
        /** バージョン */
        api_version: `${ string }`;
      }
      /** 消費アイテム */
      interface ResItem {
        /** ID */
        api_item: number;
        /** 使用方法 */
        api_usetype: number; // 0: 使用不可, 1: 高速修復材, 2: 高速建造材, 3: 開発資材, 4: 使用可能, ...
        /** カテゴリ ? */
        api_category: number;
        /** アイテム名 */
        api_name: string;
        /** アイテム説明 */
        api_description: [ string, `${ number }` ]; // [0]: アイテムの説明, [1]: 入手できる家具コインの枚数
        /** アイテムの値段 ? */
        api_price: number;
      }
      /** 課金アイテム */
      interface ResPayItem {
        /** ID */
        api_id: number;
        /** ? */
        api_type: number;
        /** 商品名 */
        api_name: string;
        /** 説明 */
        api_description: string;
        /** ? */
        api_shop_description: string;
        /** 入手アイテム量 */
        api_item: [ number, number, number, number, number, number, number, number ]; // [ 燃料, 弾薬, 鋼材, ボーキ, 高速建造材, 高速修復材, 開発資材, 改修資材 ]
        /** 価格 */
        api_price: number;
      }
      /** 海域 */
      interface ResMapArea {
        /** ID */
        api_id: number;
        /** 海域名 */
        api_name: string;
        /** 0: 通常海域, 1: イベント海域 */
        api_type: number;
      }
      /** マップ情報 */
      interface ResMapInfo {
        /** ID */
        api_id: number;
        /** 海域 */
        api_maparea_id: number;
        /** 海域内番号 ? */
        api_no: number;
        /** マップ名 */
        api_name: string;
        /** 難易度 ? */
        api_level: number;
        /** 作戦名 */
        api_opetext: string;
        /** 作戦内容 */
        api_infotext: string;
        /** 主な出現アイテム */
        api_item: [ number, number, number, number ];
        /** ゲージHP */
        api_max_maxhp: number | null;
        /** ゲージ撃破回数 */
        api_required_defeat_count: number | null;
        /**
         * 出撃艦隊編成フラグ
         *   以下七四式infoから
         *     (夏イベ時)通常海域, MI海域は[ 0, 1 ], AL海域, 本土防衛は[ 1, 0 ]
         *     (2014/09現在)すべて[ 1, 0 ]
         *     (秋イベ時)通常海域/E-2は[ 1, 0 ]、E-1/3は[ 0, 2 ], E-4は[ 0, 3 ]
         *     { 通常艦隊出撃フラグ, 連合艦隊出撃フラグ } と予想(それぞれビットフラグ)
         *     '15 秋イベ: 通常艦隊出撃は [ 1, 0 ]、連合艦隊出撃は [ 0, n ] ( n : 1=機動部隊, 2=水上部隊, 4=輸送部隊 でビットOR )
         *     '17 秋イベ：[通常艦隊可否, 連合艦隊可否ビットフラグ, 7隻編成可否]
         */
        api_sally_flag: [ number, number, number ];
      }
      /** マップBGM */
      interface ResMapBGM {
        /** ID */
        api_id: number;
        /** 海域ID ? */
        api_maparea_id: number; // eg. 2-4 => 2
        /** 海域番号 ? */
        api_no: number; // eg. 2-4 => 4
        /** 移動中BGM */
        api_moving_bgm: number;
        /** 通常戦BGM [ 昼, 夜 ] ? */
        api_map_bgm: [ number, number ];
        /** ボス戦BGM [ 昼, 夜 ] ? */
        api_boss_bgm: [ number, number ];
      }
      /** */
      interface ResMission {
        /** ID */
        api_id: number;
        /** 表示番号 */
        api_disp_no: string; // printf("%02d", number)
        /** 所属海域 */
        api_maparea_id: number;
        /** 遠征名 */
        api_name: string;
        /** 遠征詳細 */
        api_details: string;
        /** 進捗リセットタイミング */
        api_reset_type: number; // 0: 通常, 1: マンスリー
        /** 交戦種別 */
        api_damage_type: number; // 0: 通常, 1: 交戦, 2: 交戦II型
        /** 遠征時間 (min) */
        api_time: number;
        /** 編成数 */
        api_deck_num: number;
        /** 難易度 */
        api_difficulty: number;
        /** 燃料消費 */
        api_use_fuel: number;
        /** 弾薬消費 */
        api_use_bull: number;
        /** 獲得可能資材1 [ ID, 個数 ] */
        api_win_item1: [ number, number ];
        /** 獲得可能資材2 [ ID, 個数 ] */
        api_win_item2: [ number, number ];
        /** 入手資材量 [ 燃料, 弾薬, 鋼材, ボーキ ] */
        api_win_mat_level: [ number, number, number, number ];
        /** 遠征中止ができるかどうか */
        api_return_flag: number;
        /** サンプル艦隊表示 */
        api_sample_fleet: [ number, number, number, number, number, number ]; // 0: empty, other: 艦種ID
      }
      /** 改装 */
      interface ResShipUpgrade {
        /** 改装後の艦船ID */
        api_id: number;
        /** 改装前の艦船ID */
        api_current_ship_id: number; // 0: なし
        /** 初期改装の艦船ID ? */
        api_original_ship_id: number;
        /** ? */
        api_upgrade_type: number; // 1
        /** 改装回数 ? */
        api_upgrade_level: number;
        /** 改装設計図消費数 */
        api_drawing_count: number;
        /** カタパルト消費数 */
        api_catapult_count: number;
        /** 戦闘詳報消費数 */
        api_report_count: number;
        /** 新型航空兵装資材消費数 */
        api_aviation_mat_count: number;
        /** 新型兵装資材消費数 */
        api_arms_mat_count: number;
        /** ? */
        api_sortno: number; // (概ね図鑑IDだが、霞(改/二/乙), 利根(改/二), 筑摩(改/二)などで異なる) らしい
      }
      /** 家具 */
      interface ResFurniture {
        /** ID */
        api_id: number;
        /** カテゴリ */
        api_type: number; // 0: 床, 1: 壁紙, 2: 窓, 3: 壁掛け, 4: 家具, 5: 机
        /** カテゴリ内通し番号 */
        api_no: number; // 0-indexed order
        /** 家具名 */
        api_title: string;
        /** 説明 */
        api_description: string;
        /** レアリティ */
        api_rarity: number;
        /** 価格 */
        api_price: number;
        /** 販売中かどうか ? */
        api_saleflg: number;
        /** ? */
        api_season: number;
        /** グラフィックバージョン ? */
        api_version: number;
        /** ? */
        api_outsize_id: number;
        /** ? */
        api_active_flag: number;
      }
      /** 艦船グラフィック (艦娘) */
      interface ResFriendShipGraph {
        /** ID */
        api_id: number;
        /** ファイル名 */
        api_filename: string;
        /** ファイルのバージョン [ グラフィック, ボイス, 母港ボイス ] */
        api_version: [ `${ number }`, `${ number }`, `${ number }` ];
        /** 戦闘表示座標 */
        api_battle_n: [ number, number ];
        /** 戦闘表示座標 (中破絵) */
        api_battle_d: [ number, number ];
        /** 図鑑番号 */
        api_sortno: number;
        /** 母港での表示座標 */
        api_boko_n: [ number, number ];
        /** 母港での表示座標 (中破絵) */
        api_boko_d: [ number, number ];
        /** 近代化改修 */
        api_kaisyu_n: [ number, number ];
        /** 近代化改修 (中破) */
        api_kaisyu_d: [ number, number ];
        /** 改装 */
        api_kaizo_n: [ number, number ];
        /** 改装 (中破) */
        api_kaizo_d: [ number, number ];
        /** 出撃中 */
        api_map_n: [ number, number ];
        /** 出撃中 (中破) */
        api_map_d: [ number, number ];
        /** 演習(自軍) */
        api_ensyuf_n: [ number, number ];
        /** 演習(自軍) (中破) */
        api_ensyuf_d: [ number, number ];
        /** 演習(敵軍) */
        api_ensyue_n: [ number, number ];
        /** カッコカリの顔枠の左上座標 */
        api_weda: [ number, number ];
        /** カッコカリの [ 幅, 高さ ] */
        api_wedb: [ number, number ];
        /** ColoradoCIのエフェクト座標 */
        api_pa: [ number, number ]; // 非対応のとき: [0, 0]
        /** 量感野戦突撃演出の座標 */
        api_pab: [ number, number ]; // 非対応のとき: [0, 0]
      }
      /** 艦船グラフィック (深海) */
      interface ResEnemyShipGraph {
        /** ID */
        api_id: number;
        /** ファイル名 */
        api_filename: string;
        /** ファイルのバージョン [ グラフィック, ボイス, 母港ボイス ] */
        api_version: [ `${ number }`, `${ number }`, `${ number }` ];
        /** 戦闘表示座標 */
        api_battle_n?: [ number, number ];
        /** 戦闘表示座標 (中破絵) */
        api_battle_d?: [ number, number ];
      }
    }
  }
}

namespace defaults {
  export interface Request {
    api_token: string; // hex
    api_verno: `${ number }`;
  }
  export interface Response {
    /** response result */
    api_result: number; // 1: success
    api_result_msg: string;
    /** main content */
    api_data: { [key: string]: any };
  }
}

export default kcsapi;
