import { IChargeExploitation } from "./exploitation.interface";
import { IVariete } from "./filiere.interface";

export interface SelectItem {
    label: string;
    value: number;
    items: Item[];
  }


export interface Item {
    label: string;
    value: IVariete;
  }

  export interface SelectItemChargeExploitation {
    label: string;
    value: number;
    items: ItemChargeExploitation[];
  }
  export interface ItemChargeExploitation {
    label: string;
    value: IChargeExploitation;
  }
