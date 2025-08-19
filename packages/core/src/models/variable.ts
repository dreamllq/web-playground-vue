import { v4 as uuidv4 } from 'uuid';

export class Variable {
  id: string = uuidv4();
  name: string;
  value: any; // 初始化值
  
  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      value: this.value
    };
  }
}