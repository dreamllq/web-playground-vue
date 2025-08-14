import { v4 as uuidv4 } from 'uuid';

export class Variable {
  id: string = uuidv4();
  name: string;
  value: any;
  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }
}