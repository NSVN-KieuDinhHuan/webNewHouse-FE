import {OptionGroup} from './optionGroup';


export interface Option {
  id?: number;
  name?: String;
  price?:number;
  optionGroup?: OptionGroup
}
