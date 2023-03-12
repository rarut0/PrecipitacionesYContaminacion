import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {


  private bsMonth: BehaviorSubject<number>;
  private bsYear: BehaviorSubject<number>;

  constructor () {
    this.bsMonth = new BehaviorSubject(1);
    this.bsYear = new BehaviorSubject(2011);
  }
}
