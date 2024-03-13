
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

  class Ship {
    /** `共通` ID */
    public id: number;
    /** `艦娘` 図鑑番号 */
    public index: number | undefined;
    /** `艦娘` 母港ソート順 ? */
    public sort: number | undefined;
    /** `共通` 艦名 */
    public name: string;
    /** `艦娘` 艦名の読み */
    public reading: string | undefined;
    /** `共通` 艦種 */
    public stype: number;
    /** `混合` 艦級/階級 */
    public sclass: number | "" | "-" | "elite" | "flagship";
    /** `艦娘` 艦級 */
    public sclass_friend: number | undefined;
    /** `深海` 階級 */
    public sclass_enemy: "" | "-" | "elite" | "flagship" | undefined;
    /** `艦娘` ステータス */
    public status: {
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
    } | undefined;
    /** `共通` 速力 */
    public speed: number; // 5: 低速, 10: 高速
    /** `艦娘` 射程 */
    public range: number | undefined; // 1: 短, 2: 中, 3: 長, 4: 超長
    /** `共通` 利用可能スロット数 */
    public slotcnt: number;
    /** `艦娘` 搭載数 */
    public aircrafts: [ number, number, number, number, number ] | undefined;
    /** `艦娘` 建造時間 */
    public construction_time: number | undefined; // min
    /** `艦娘` 解体時入手資材量 */
    public dismantle: { fuel: number, bullets: number, steels: number, bauxites: number } | undefined;
    /** `艦娘` 改修時ステータス上昇量 */
    public modernization: { power: number, torpedo: number, antiair: number, armor: number } | undefined;
    /** `艦娘` レアリティ */
    public rarity: number | undefined; // 1: 藍, 2: 青, 3: 水, 4: 銀, 5: 金, 6: 虹, 7: 輝虹, 8: 桜虹
    /** `艦娘` 入手時メッセージ */
    public get_msg: string | undefined; // 改行は"<br>"
    /** `艦娘` 改装 */
    public remodel: {
      /** 改装先艦船ID */
      id: number;
      /** 改装Lv. */
      level: number;
      /** 改装消費資材 */
      materials: {
        /** 鋼材 */
        steels: number;
        /** 弾薬 */
        bullets: number;
      }
    } | undefined;
    /** `艦娘` 搭載資材量 */
    public consumption: { fuel: number, bullets: number } | undefined;
    /** `艦娘` ボイス設定フラグ */
    public voice_flag: number | undefined; // 1: 放置ボイス, 2: 時報, 3: 特殊放置ボイス (放置ボイスは5minおき、cond >= 50かつ特殊放置ボイス利用可能ならそれを利用)

    /** `共通` その他 */
    public additional: Map<string, any>;

    /** 必須キー名 (in `/kcsapi/api_start2/getData.Response.api_data.api_mst_ship`) */
    public static readonly required_keys = [ "api_id", "api_sort_id", "api_name", "api_yomi", "api_stype", "api_ctype", "api_soku", "api_slot_num" ] as const;
    /** 確認済みキー名 (in `/kcsapi/api_start2/getData.Response.api_data.api_mst_ship`) */
    public static readonly defined_keys = [ "api_id", "api_sortno", "api_sort_id", "api_name", "api_yomi", "api_stype", "api_ctype", "api_afterlv", "api_aftershipid", "api_taik", "api_souk", "api_houg", "api_raig", "api_tyku", "api_luck", "api_soku", "api_leng", "api_slot_num", "api_maxeq", "api_buildtime", "api_broken", "api_powup", "api_backs", "api_getmes", "api_afterfuel", "api_afterbull", "api_fuel_max", "api_bull_max", "api_voicef" ] as const;

    private constructor() {
      this.id = 0;
      this.name = "(未定義)";
      this.stype = 0;
      this.sclass = 0;
      this.speed = 0;
      this.slotcnt = 0;
      this.additional = new Map;
    }

    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number]): Ship | Map<string, any>;
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"]): (Ship | Map<string, any>)[];
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"][number] | kcsapi.api_start2.getData.Response["api_data"]["api_mst_ship"]): Ship | Map<string, any> | (Ship | Map<string, any>)[] {
      if (data instanceof Array) {
        return data.map(v => Ship.from(v));
      }
      /** all keys in `data` */
      const keys = Object.keys(data);
      if (!Ship.required_keys.every(key => keys.includes(key))) {
        const info: Map<string, any> = new Map;
        keys.forEach(key => info.set(key, (data as { [key: string]: any })[key]));
        return info;
      }
      const ship = new Ship;
      const isEnemy = ((data: any): data is kcsapi.api_start2.getData.ResEnemyShipMaster => [ "", "-", "elite", "flagship" ].includes(data.api_yomi))(data);
      ship.id = data.api_id;
      ship.index = isEnemy ? void 0 : data.api_sortno;
      ship.sort = data.api_sort_id; // if EnemyShip, 0.
      ship.name = data.api_name;
      ship.reading = data.api_yomi; // if EnemyShip, any of "", "-", "elite", "flagship".
      ship.stype = data.api_stype;
      ship.sclass = isEnemy ? data.api_yomi : data.api_ctype;
      ship.sclass_friend = data.api_ctype; // if EnemyShip, 1.
      ship.sclass_enemy = isEnemy ? data.api_yomi : void 0;
      const status_keys = [ "init", "max" ];
      ship.status = isEnemy ? void 0 : {
        hp: Object.fromEntries(data.api_taik.map((v, i) => [ status_keys[i], v ])),
        armor: Object.fromEntries(data.api_souk.map((v, i) => [ status_keys[i], v ])),
        power: Object.fromEntries(data.api_houg.map((v, i) => [ status_keys[i], v ])),
        torpedo: Object.fromEntries(data.api_raig.map((v, i) => [ status_keys[i], v ])),
        antiair: Object.fromEntries(data.api_tyku.map((v, i) => [ status_keys[i], v ])),
        luck: Object.fromEntries(data.api_luck.map((v, i) => [ status_keys[i], v ])),
      };
      ship.speed = data.api_soku;
      ship.range = isEnemy ? void 0 : data.api_leng;
      ship.slotcnt = data.api_slot_num;
      ship.aircrafts = isEnemy ? void 0 : data.api_maxeq;
      ship.construction_time = isEnemy ? void 0 : data.api_buildtime;
      const dismantle_keys = [ "fuel", "bullets", "steels", "bauxites" ];
      ship.dismantle = isEnemy ? void 0 : Object.fromEntries(data.api_broken.map((v, i) => [ dismantle_keys[i], v ]));
      const modernization_keys = [ "power", "torpedo", "antiair", "armor" ];
      ship.modernization = isEnemy ? void 0 : Object.fromEntries(data.api_powup.map((v, i) => [ modernization_keys[i], v ]));
      ship.rarity = isEnemy ? void 0 : data.api_backs;
      ship.get_msg = isEnemy ? void 0 : data.api_getmes;
      ship.remodel = isEnemy ? void 0 : {
        id: Number(data.api_aftershipid),
        level: data.api_afterlv,
        materials: {
          steels: data.api_afterfuel,
          bullets: data.api_afterbull
        }
      };
      ship.consumption = isEnemy ? void 0 : {
        fuel: data.api_fuel_max,
        bullets: data.api_bull_max
      };
      ship.voice_flag = isEnemy ? void 0 : data.api_voicef;
      /** additional keys in `data` */
      const additional_keys = keys.filter(key => !(Ship.defined_keys as readonly string[]).includes(key));
      ship.additional = new Map(additional_keys.map(key => [ key, (data as { [key: string]: any })[key] ]));
      return ship;
    }

    public toString(): string {
      return `[Ship.${ this.id } "${ this.name }"]`;
    }
    public toLogStr(): string {
      return `[Ship.${ this.id } "${ this.name }", ${ JSON.stringify(this) }]`;
    }
  }

  class EquipType {
    /** 装備種ID */
    public id: number;
    /** 装備種名 */
    public name: string;
    /** ? */
    public show_flag: boolean;

    private constructor() {
      this.id = 0;
      this.name = "(未定義)";
      this.show_flag = false;
    }

    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_slotitem_equiptype"]): EquipType[];
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_slotitem_equiptype"][number]): EquipType;
    public static from(data: kcsapi.api_start2.getData.Response["api_data"]["api_mst_slotitem_equiptype"][number] | kcsapi.api_start2.getData.Response["api_data"]["api_mst_slotitem_equiptype"]): EquipType | EquipType[] {
      if (data instanceof Array) {
        return data.map(v =>  EquipType.from(v));
      }
      const etype = new EquipType;
      etype.id = data.api_id;
      etype.name = data.api_name;
      etype.show_flag = Boolean(data.api_show_flg);
      return etype;
    }

    public toString(): string {
      return `[EquipType.${ this.id } "${ this.name }"]`;
    }
    public toLogStr(): string {
      return `[EquipType.${ this.id } "${ this.name }" flag:${ this.show_flag }]`;
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
