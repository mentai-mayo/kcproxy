
import kcsapi from "../kcsapi.type.js";

/** マスタデータ */
export namespace MasterData {

  /** 艦種 */
  export class ShipType {
    /** ID */
    public readonly id: number;
    /** ソート用 ? */
    public readonly sort: number;
    /** 艦種名 */
    public readonly name: string;
    /** 入渠時間係数 ? */
    public readonly s_count: number;
    /** 建造時のシルエット ? */
    public readonly k_count: number;
    /** 装備可能種別 ? */
    public readonly equip_types: [ null, ...boolean[] ];

    private constructor(data: { id: number, sort: number, name: string, s_count: number, k_count: number, equip_types: [ null, ...boolean[] ] }) {
      this.id = data.id;
      this.sort = data.sort;
      this.name = data.name;
      this.s_count = data.s_count;
      this.k_count = data.k_count;
      this.equip_types = data.equip_types;
    }

    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_stype"][number]): ShipType;
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_stype"]): ShipType[];
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_stype"] | kcsapi.api_start2.getData.Response["api_data"]["api_mst_stype"][number]): ShipType[] | ShipType {
      if (data instanceof Array) {
        return data.map(v => ShipType.from(v)) as ShipType[];
      }
      const stype = {} as { id: number, sort: number, name: string, s_count: number, k_count: number, equip_types: [ null, ...boolean[] ] };
      stype.id = data.api_id;
      stype.sort = data.api_sortno;
      stype.name = data.api_name;
      stype.s_count = data.api_scnt;
      stype.k_count = data.api_kcnt;
      stype.equip_types = [ null, ...Object.entries(data.api_equip_type).sort((prev, next) => Number(prev[0][0]) - Number(next[0][0])).map(v => !!v[1]) ];
      return new ShipType(stype);
    }

    public toString(): string {
      return `[ShipType.${ this.id } "${ this.name }"]`;
    }
    public toLogStr(): string {
      return `[ShipType.${ this.id } "${ this.name }", cnt.{s: ${ this.s_count }, k: ${ this.k_count }}, equip_types: [${ this.equip_types.slice(1).map(v => v ? 1 : 0).join("") }]]`;
    }
  }

  interface ShipSuperSet {
    /** ID */
    id: number;
    /** 艦名 */
    name: string;
    /** 艦種 */
    stype: number;
    /** 速力 */
    speed: number; // 5: 低速, 10: 高速
    /** 利用可能スロット数 */
    slotcnt: number;
    /** `艦娘` 図鑑番号 */
    index?: number;
    /** `艦娘` 母港ソート順 ? */
    sort?: number;
    /** `艦娘` 艦名の読み */
    reading?: string;
    /** `艦娘` 艦級 / `深海` 階級 */
    sclass: number | "" | "-" | "eliete" | "flagship";
    /** `艦娘` 改装 */
    remodel?: {
      /** 改装Lv. */
      level?: number;
      /** 改装先艦船ID */
      id?: number;
      /** 消費資材量 [ 鋼材, 弾薬 ] */
      require: [ number | undefined, number | undefined ];
    }
    /** `艦娘` ステータス [ 初期値, 最大(Lv.99)値 ] */
    status?: {
      /** 耐久 */
      hp?: [ number, number ];
      /** 装甲 */
      armor?: [ number, number ];
      /** 火力 */
      power?: [ number, number ];
      /** 雷装 */
      torpedo?: [ number, number ];
      /** 対空 */
      antiair?: [ number, number ];
      /** 運 */
      luck?: [ number, number ];
    }
    /** `艦娘` 射程 */
    range?: number; // 1: 短, 2: 中, 3: 長, 4: 超長
    /** `艦娘` 搭載 */
    aircrafts?: [ number, number, number, number, number ];
    /** `艦娘` 建造時間 */
    construction_timer?: number; // min
    /** `艦娘` 解体時入手資材量 [ 燃料, 弾薬, 鋼材, ボーキ ] */
    dismantle?: [ number, number, number, number ];
    /** `艦娘` 搭載資材量 [ 燃料, 弾薬 ] */
    consumption?: [ number, number ];
    /** `艦娘` レアリティ */
    rarity?: number;
    /** `艦娘` 入手時メッセージ */
    get_msg?: string;
  }

  class _Ship {
    /** ID */
    id: number;
    /** 図鑑番号 */
    index: number;
    /** 母港ソート順 ? */
    sort: number;
    /** 艦名 */
    name: string;
    /** 艦名の読み */
    reading: string;
    /** 艦種 */
    stype: number;
    /** 艦級 */
    sclass: number;
    /** ステータス */
    status: {
      /** 耐久 */
      hp: { init: number, max: number };
      /** 装甲 */
      armor: { init: number, max: number };
      /** 火力 */
      power: { init: number, max: number };
      /** 雷装 */
      torpedo: { init: number, max: number };
      /** 対空 */
      antiair: { init: number, max: number };
      /** 運 */
      luck: { init: number, max: number };
    }
    /** 速力 */
    speed: number; // 5: 低速, 10: 高速
    /** 射程 */
    range: number; // 1: 短, 2: 中, 3: 長, 4: 超長
    /** 利用可能スロット数 */
    slotcnt: number;
    /** 搭載数 */
    aircrafts: [ number, number, number, number, number ];
    /** 建造時間 */
    construction_timer: number; // min
    /** 解体時入手資材量 */
    dismantle: [ number, number, number, number ]; // [ 燃料, 弾薬, 鋼材, ボーキ ]
    /** 改修時ステータス上昇量 */
    modernization: [ number, number, number, number ]; // [ 火力, 雷装, 対空, 装甲 ]
    /** レアリティ */
    rarity: number; // 1: 藍, 2: 青, 3: 水, 4: 銀, 5: 金, 6: 虹, 7: 輝虹, 8: 桜虹
    /** 入手時メッセージ */
    get_msg: string; // 改行は"<br>"
    /** 改装 */
    remodel: {
      /** 改装先艦船ID */
      id: number;
      /** 改装Lv. */
      level: number;
    }
    /** 搭載資材量 */
    consumption: [ number, number ]; // [ 燃料, 弾薬 ]
    /** ボイス設定フラグ */
    voice_flag: number; // 1: 放置ボイス, 2: 時報, 3: 特殊放置ボイス (放置ボイスは5minおき、cond >= 50かつ特殊放置ボイス利用可能ならそれを利用)

    /** その他 */
    additional: Map<string, any>;
  }

  class Ship {
    /** ID */
    public readonly id: number;
    /** 艦名 */
    public readonly name: string;
    /** 艦種 */
    public readonly stype: number;
    /** 速力 */
    public readonly speed: number; // 5: 低速, 10: 高速
    /** 利用可能スロット数 */
    public readonly slotcnt: number;

    protected constructor(data: { id: number, name: string, stype: number, speed: number, slotcnt: number }) {
      this.id = data.id;
      this.name = data.name;
      this.stype = data.stype;
      this.speed = data.speed;
      this.slotcnt = data.slotcnt;
    }

    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number]): EnemyShip | FriendShip;
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"]): (EnemyShip | FriendShip)[];
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"] | kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number]): EnemyShip | FriendShip | (EnemyShip | FriendShip)[] {
      if (data instanceof Array) {
        return data.map(v => Ship.from(v));
      }
      const ship = {} as ShipSuperSet;

      ship.id      = data.api_id;
      ship.name    = data.api_name;
      ship.stype   = data.api_stype;
      ship.speed   = data.api_soku;
      ship.slotcnt = data.api_slot_num;
      ship.sclass  = ([ "", "-", "eliete", "flagship" ].includes(data.api_yomi)) ? data.api_yomi as ("" | "-" | "eliete" | "flagship") : data.api_stype;
      if (((_p: any): _p is kcsapi.api_start2.getData.ResEnemyShipMaster => typeof ship.sclass === "string")(data)) return new EnemyShip(ship as { id: number, name: string, stype: number, speed: number, slotcnt: number, sclass: "" | "-" | "elite" | "flagship" });
      ship.index   = data.api_sortno;
      ship.sort    = data.api_sort_id;
      ship.reading = data.api_yomi;
      ship.sclass  = data.api_stype;
      ship.remodel = {
        level:   data.api_afterlv,
        id:      Number(data.api_aftershipid),
        require: [ data.api_afterfuel, data.api_afterbull ],
      };
      ship.status = {
        hp:      data.api_taik,
        armor:   data.api_souk,
        power:   data.api_houg,
        torpedo: data.api_raig,
        antiair: data.api_tyku,
        luck:    data.api_luck,
      };
      ship.range       = data.api_leng;
      ship.aircrafts   = data.api_maxeq;
      ship.construction_timer = data.api_buildtime;
      ship.dismantle   = data.api_broken;
      ship.consumption = [ data.api_fuel_max, data.api_bull_max ];
      ship.rarity      = data.api_backs;
      ship.get_msg     = data.api_getmes;
      return new FriendShip(ship);
    }
  }

  export class FriendShip extends Ship {
    /** 図鑑番号 */
    public readonly index: number;
    /** 母港ソート順 ? */
    public readonly sort: number;
    /** 艦名の読み */
    public readonly reading: string;
    /** 艦級 (ShipClass) */
    public readonly sclass: number;
    /** 改装 */
    public readonly remodel: {
      /** 改装レベル */
      level: number;
      /** 改装先艦船ID */
      id: number;
      /** 消費資材量 [ 鋼材, 弾薬 ] */
      require: [ number, number ];
    };
    /** ステータス [ 初期値, 最大(Lv.99)値 ] */
    public readonly status: {
      /** 耐久 */
      hp: [ number, number ];
      /** 装甲 */
      armor: [ number, number ];
      /** 火力 */
      power: [ number, number ];
      /** 雷装 */
      torpedo: [ number, number ];
      /** 対空 */
      antiair: [ number, number ];
      /** 運 */
      luck: [ number, number ];
    };
    /** 射程 */
    public readonly range: number; // 1: 短 ... 4: 超長
    /** 搭載 */
    public readonly aircrafts: [ number, number, number, number, number ];
    /** 建造時間 */
    public readonly construction_timer: number; // min.
    /** 解体時入手資材量 [ 燃料, 弾薬, 鋼材, ボーキ ] */
    public readonly dismantle: [ number, number, number, number ];
    /** 搭載資材量 [ 燃料, 弾薬 ] */
    public readonly consumption: [ number, number ];
    /** レアリティ */
    public readonly rarity: number;
    /** 入手時メッセージ */
    public readonly get_msg: string;

    protected constructor(data: { id: number, name: string, stype: number, speed: number, slotcnt: number, index: number, sort: number, reading: string, sclass: number, remodel: { level: number, id: number, require: [ number, number ] }, status: { hp: [ number, number ], armor: [ number, number ], power: [ number, number ], torpedo: [ number, number ], antiair: [ number, number ], luck: [ number, number ] }, range: number, aircrafts: [ number, number, number, number, number ], construction_timer: number, dismantle: [ number, number, number, number ], consumption: [ number, number ], rarity: number, get_msg: string }) {
      super(data);
      this.index = data.index;
      this.sort = data.sort;
      this.reading = data.reading;
      this.sclass = data.sclass;
      this.remodel = data.remodel;
      this.status = data.status;
      this.range = data.range;
      this.aircrafts = data.aircrafts;
      this.construction_timer = data.construction_timer;
      this.dismantle = data.dismantle;
      this.consumption = data.consumption;
      this.rarity = data.rarity;
      this.get_msg = data.get_msg;
    }
  }

  export class EnemyShip extends Ship {
    /** 階級 */
    public readonly sclass: "" | "-" | "elite" | "flagship";

    protected constructor(data: { id: number, name: string, stype: number, speed: number, slotcnt: number, sclass: "" | "-" | "elite" | "flagship" }) {
      super(data);
      this.sclass = data.sclass;
    }
  }
}

/**
 * update proxyserver kc state
 * @param req supposed to be "/kcsapi/api_start2/getData" request body
 * @param res supposed to be "/kcsapi/api_start2/getData" response body
 */
export function update(endpoint: "/kcsapi/api_start2/getData", req: any, res: any): void;
export function update(endpoint: string, req: any, res: any): void {
  // 
}
