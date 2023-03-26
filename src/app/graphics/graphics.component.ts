import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BehaviorControlService } from '../behavior-control.service';
import { DataSet } from '../graphicsData';
import { ReadDataService } from '../read-data.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.sass']
})
export class GraphicsComponent {

  @Input() title: string = "";

  private bsMonth: BehaviorSubject<number>;
  private bsYear: BehaviorSubject<number>;
  private behaviorControlService: BehaviorControlService;
  private readDataService: ReadDataService;
  
  private year: number = 2019;
  private month: number = 1;
  
  public chartData: DataSet[] = [];
  public chartLabels: string [] = [];

  constructor (behaviorControlService: BehaviorControlService, readDataService:ReadDataService) {
    this.behaviorControlService = behaviorControlService;
    
    this.bsMonth = this.behaviorControlService.getBSMonth();
    this.bsYear = this.behaviorControlService.getBSYear();

    this.readDataService = readDataService;



  }
  
  ngOnInit() {
    this.bsMonth.subscribe((nextMonth: number)=>{
      this.month = nextMonth;
    });
    this.bsYear.subscribe((nextYear: number)=>{
      this.year = nextYear;
    });
    
    const data = this.readDataService.readDataFile(this.title)
    
    this.chartLabels = data.chartLabels
    this.chartData = data.dataSet
  }

  ngOnDestroy() {
    this.bsMonth.unsubscribe();
    this.bsYear.unsubscribe();
  }

  newDataPoint(dataArr: number[], label: string) {
    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]]
      });
    });


    this.chartLabels = [...this.chartLabels, label];

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
