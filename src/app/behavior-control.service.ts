import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorControlService {

  private bsSlice: BehaviorSubject<number>;

  constructor() {
    this.bsSlice = new BehaviorSubject(0);
  }

  public getBSSlice():BehaviorSubject<number>{
    return this.bsSlice;
  }

  public setSlice(slice:number): void {
    this.bsSlice.next(slice);
  }
}
