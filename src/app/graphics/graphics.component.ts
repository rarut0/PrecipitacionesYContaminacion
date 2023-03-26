import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BehaviorControlService } from '../behavior-control.service';
import { DataSet, GraphicsData } from '../graphicsData';
import { ReadDataService } from '../read-data.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.sass']
})
export class GraphicsComponent {

  @Input() title: string = "";

  private bsSlice: BehaviorSubject<number>;
  private bsCCAA: BehaviorSubject<string>;
  private behaviorControlService: BehaviorControlService;
  private readDataService: ReadDataService;
  private data: GraphicsData = {
    dataSet: [],
    chartLabels: []
  }

  private selectedRegion: string = ''
  private slice: number = 0
  
  public chartData: DataSet[] = [];
  public chartLabels: string [] = [];

  constructor (behaviorControlService: BehaviorControlService, readDataService:ReadDataService) {
    this.behaviorControlService = behaviorControlService;
    
    this.bsSlice = this.behaviorControlService.getBSSlice();
    this.bsCCAA = this.behaviorControlService.getBSCCAA();

    this.readDataService = readDataService;
    
    this.selectedRegion = 'ESPAÑA PENINSULAR';
  }
  
  ngOnInit() {
    this.bsSlice.subscribe((nextSlice: number)=>{
      this.slice = nextSlice;
      this.newDataPoint();
      
    });

    this.bsCCAA.subscribe((nextCCAA: string) => {
      this.selectedRegion = nextCCAA
      this.newDataPoint()

    })
    
    this.data = this.readDataService.readDataFile(this.title)

    this.newDataPoint()
  }

  ngOnDestroy() {
    this.bsSlice.unsubscribe();
  }

  newDataPoint() {
    this.chartLabels = this.data.chartLabels.slice(this.slice, this.slice + 6)
      if(this.title === 'prec'){
        this.chartData = this.data.dataSet.filter((data:DataSet) => data.label === this.selectedRegion)
        .map((data:DataSet) => {
          return {
            data: data.data.slice(this.slice, this.slice + 6),
            label: data.label
          }
        })
      }
      if(this.title == 'quim'){
        this.chartData = this.data.dataSet.filter(
          (data:DataSet) => (data.label === 'ES01.SO2' || data.label === 'ES01.NO' || data.label === 'ES01.NO2')
        ).map((data:DataSet) => {
          return {
            data: data.data.slice(this.slice, this.slice + 6),
            label: data.label
          }
        })
      }
  }


  // chartData = [
  //   {
  //     data: [330, 600, 260, 700],
  //     label: 'Account A'
  //   },
  //   {
  //     data: [120, 455, 100, 340],
  //     label: 'Account B'
  //   },
  //   {
  //     data: [45, 67, 800, 500],
  //     label: 'Account C'
  //   },
  //   {
  //     data: [100,200,300,400],
  //     label: 'Account D'
  //   },
  //   {
  //     data: [120, 400,500,100],
  //     label: 'Account E'
  //   },
  //   {
  //     data: [432,123,54,123],
  //     label: 'Account F'
  //   },
  //   {
  //     data: [543,232,543,213],
  //     label: 'Account G'
  //   },
  //   {
  //     data: [123,324,213,414],
  //     label: 'Account H'
  //   },
  //   {
  //     data: [123,324,312,412],
  //     label: 'Account I'
  //   }
  // ];

  // chartLabels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April'
  // ];

  chartOptions = {
    responsive: true
  };

}
