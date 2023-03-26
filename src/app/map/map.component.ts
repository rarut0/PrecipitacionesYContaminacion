import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehaviorControlService } from '../behavior-control.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {


  private bsMonth: BehaviorSubject<number>;
  private bsYear: BehaviorSubject<number>;
  private behaviorControlService: BehaviorControlService;

  private year: number;
  private month: number;

  constructor (behaviorControlService: BehaviorControlService) {
    this.behaviorControlService = behaviorControlService;
    
    this.bsMonth = this.behaviorControlService.getBSMonth();
    this.bsYear = this.behaviorControlService.getBSYear();

    this.year = 2019;
    this.month = 0;
  }

  ngOnInit() {
    this.bsMonth.subscribe((nextMonth: number)=>{
      this.month = nextMonth;
    });
    this.bsYear.subscribe((nextYear: number)=>{
      this.year = nextYear;
    });
  }

  ngOnDestroy() {
    this.bsMonth.unsubscribe();
    this.bsYear.unsubscribe();
  }
}
