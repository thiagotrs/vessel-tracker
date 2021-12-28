import { Port } from "./port.model";

export enum Status {
  SAILING = "Sailing",
  PARKED = "Parked",
}

export class Stop {
  constructor(
    public port:Port,
    public dateIn?:Date,
    public dateOut?:Date,
    public id?: number
  ) {}
}

export class Vessel {
  constructor(
    public id:string,
    public name:string,
    public ownership:string,
    public status:Status,
    public year:number,
    public stops:Stop[],
    public nextStops:Stop[]
  ) {}
}
