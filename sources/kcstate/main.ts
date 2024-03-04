
import * as kcsapi from "../kcsapi.js";

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
    /** */
    public readonly s_count: number;
    /** */
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

    public static from(data: kcsapi.api_start2.getData.ResponseBody["api_data"]["api_mst_stype"][number]): ShipType;
    public static from(data: kcsapi.api_start2.getData.ResponseBody["api_data"]["api_mst_stype"]): ShipType[];
    public static from(data: kcsapi.api_start2.getData.ResponseBody["api_data"]["api_mst_stype"] | kcsapi.api_start2.getData.ResponseBody["api_data"]["api_mst_stype"][number]): ShipType[] | ShipType {
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
  export let ShipTypes: Map<number, ShipType> = new Map;
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
