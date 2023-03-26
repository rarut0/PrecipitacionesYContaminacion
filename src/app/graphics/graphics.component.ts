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
  private behaviorControlService: BehaviorControlService;
  private readDataService: ReadDataService;
  private data: GraphicsData = {
    dataSet: [],
    chartLabels: []
  }

  private selectedRegion: string = ''
  
  public chartData: DataSet[] = [];
  public chartLabels: string [] = [];

  constructor (behaviorControlService: BehaviorControlService, readDataService:ReadDataService) {
    this.behaviorControlService = behaviorControlService;
    
    this.bsSlice = this.behaviorControlService.getBSSlice();

    this.readDataService = readDataService;



  }
  
  ngOnInit() {
    this.selectedRegion = 'ESPAÑA PENINSULAR';
    this.bsSlice.subscribe((nextSlice: number)=>{
      this.chartLabels = this.data.chartLabels.slice(nextSlice, nextSlice + 6)
      if(this.title === 'prec'){
        this.chartData = this.data.dataSet.filter((data:DataSet) => data.label === this.selectedRegion)
        .map((data:DataSet) => {
          return {
            data: data.data.slice(nextSlice, nextSlice + 6),
            label: data.label
          }
        })
      }
      if(this.title == 'quim'){
        this.chartData = this.data.dataSet.filter(
          (data:DataSet) => (data.label === 'ES01.SO2' || data.label === 'ES01.NO' || data.label === 'ES01.NO2')
        ).map((data:DataSet) => {
          return {
            data: data.data.slice(nextSlice, nextSlice + 6),
            label: data.label
          }
        })
      }
    });
    
    this.data = this.readDataService.readDataFile(this.title)
    
    this.chartLabels = this.data.chartLabels.slice(0, 6);
    if(this.title === 'prec'){
      this.chartData = this.data.dataSet.filter((data:DataSet) => data.label === this.selectedRegion).map((data:DataSet) => {
        return {
          data: data.data.slice(0, 6),
          label: data.label
        }
      })
    }
    if(this.title == 'quim'){
      this.chartData = this.data.dataSet.filter(
        (data:DataSet) => (data.label === 'ES01.SO2' || data.label === 'ES01.NO' || data.label === 'ES01.NO2')
      ).map((data:DataSet) => {
        return {
          data: data.data.slice(0, 6),
          label: data.label
        }
      })
    }
  }

  ngOnDestroy() {
    this.bsSlice.unsubscribe();
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
