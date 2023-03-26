import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehaviorControlService } from '../behavior-control.service';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.sass']
})
export class SelectTimeComponent {

  
  public inputValue: number = 0;

  constructor(private behaviorControlService: BehaviorControlService) {
  }

  public retriveInput(event:any): void {
    this.inputValue = event.target.value;
    this.behaviorControlService.setSlice(this.inputValue*1)
  }

}
