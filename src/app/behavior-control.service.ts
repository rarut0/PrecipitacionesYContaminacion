import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorControlService {

  private bsSlice: BehaviorSubject<number>;
  private bsCCAA: BehaviorSubject<string>;

  constructor() {
    this.bsSlice = new BehaviorSubject(0);
    this.bsCCAA = new BehaviorSubject('ESPAÑA PENINSULAR')
  }

  public getBSSlice():BehaviorSubject<number>{
    return this.bsSlice;
  }

  public setSlice(slice:number): void {
    this.bsSlice.next(slice);
  }

  public getBSCCAA():BehaviorSubject<string>{
    return this.bsCCAA;
  }

  public setCCAA(CCAA:string): void {
    this.bsCCAA.next(CCAA);
  }
}
