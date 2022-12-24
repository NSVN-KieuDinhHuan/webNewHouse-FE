import {OptionGroup} from './optionGroup';


export interface Option {
  id?: number;
  name?: string;
  price?: number;
  group?:OptionGroup
}
