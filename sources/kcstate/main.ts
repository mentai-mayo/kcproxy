
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

  export class FriendShip {
    /** ID */
    public readonly id: number;
    /** 図鑑番号 */
    public readonly sortno: number;
    /** 艦名 */
    public readonly name: string;
    /** 艦名の読み */
    public readonly reading: string;
    /** 艦種 (ShipType) */
    public readonly stype: ShipType;
    /** 艦級 (ShipClass) */
    public readonly sclass: number;
    /** 速力 */
    public readonly speed: number; // 5: 低速, 10: 高速
    /** 利用可能スロット数 */
    public readonly slotcnt: number;
    /** 改装 */
    public readonly remodel: {
      /** 改装レベル */
      level: number;
      /** 改装先艦船ID */
      id: number;
      /** 消費資材量 [ 鋼材, 弾薬 ] */
      reqire: [ number, number ];
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
  }

  export class EnemyShip {
    /** ID */
    public readonly id: number;
    /** 図鑑番号 */
    public readonly sortno: number;
    /** 艦名 */
    public readonly name: string;
    /** 艦名の読み */
    public readonly reading: string;
    /** 艦種 (ShipType) */
    public readonly stype: ShipType;
    /** 艦級 (ShipClass) */
    public readonly sclass: number;
    /** 速力 */
    public readonly speed: number; // 5: 低速, 10: 高速
    /** 利用可能スロット数 */
    public readonly slotcnt: number;

    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number]): EnemyShip | FriendShip;
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"]): (EnemyShip | FriendShip)[];
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"] | kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number]): EnemyShip | FriendShip | (EnemyShip | FriendShip)[] {
      if (data instanceof Array) {
        return data.map(v => EnemyShip.from(v));
      }
      const ship = {} as { id: number, sortno: number, name: string, reading: string, stype: ShipType, sclass: number, speed: number, slotcnt: number } & ({ } | { remodel: { level: number, id: number, require: [ number, number ] }, status: { hp: [ number, number ], armor: [ number, number ], power: [ number, number ], torpedo: [ number, number ], antiair: [ number, number ], luck: [ number, number ] }, range: number, aircrafts: [ number, number, number, number, number ], construction_timer: number, dismantle: [ number, number, number, number ], consumption: [ number, number ], rarity: number, get_msg: string });
      ship.id = data.api_id;
      ship.sortno = data.api_sortno;
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
