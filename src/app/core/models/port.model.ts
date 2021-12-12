export class Location {
  constructor(
    public city:string,
    public country:string,
    public point?:[number,number]
  ) {}
}

export class Port {
  constructor(
    public id:string,
    public name:string,
    public location:Location,
    public capacity:number
  ) {}
}