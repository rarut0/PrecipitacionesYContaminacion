import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehaviorControlService } from '../behavior-control.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {


  private bsSlice: BehaviorSubject<number>;
  private behaviorControlService: BehaviorControlService;

  private slice: number;
  private selectedCCAA: string = ''

  constructor (behaviorControlService: BehaviorControlService) {
    this.behaviorControlService = behaviorControlService;
    
    this.bsSlice = this.behaviorControlService.getBSSlice();

    this.slice = 0;
  }

  ngOnInit() {
    this.bsSlice.subscribe((nextSlice: number)=>{
      this.slice = nextSlice;
    });
  }

  ngOnDestroy() {
    this.bsSlice.unsubscribe();
  }

  public mapClicked(CCAA:string){
    if(CCAA === this.selectedCCAA){
      CCAA = 'ESPAÑA PENINSULAR'
    }
    this.selectedCCAA = CCAA;
    this.behaviorControlService.setCCAA(CCAA)
  }
}
