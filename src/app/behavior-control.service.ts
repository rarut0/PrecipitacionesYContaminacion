import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorControlService {

  bsMonth: BehaviorSubject<number>;
  bsYear: BehaviorSubject<number>;

  constructor() {
    this.bsMonth = new BehaviorSubject(11);
    this.bsYear = new BehaviorSubject(2022);
  }

  public getBSMonth():BehaviorSubject<number>{
    return this.bsMonth;
  }

  public getBSYear():BehaviorSubject<number>{
    return this.bsYear;
  }

  public setMonth(month: number): void {
    this.bsMonth.next(month);
  }

  public setYear(year:number): void {
    this.bsYear.next(year);
  }
}
