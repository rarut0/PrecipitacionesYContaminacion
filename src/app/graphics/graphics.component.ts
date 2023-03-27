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
  private coidogoEstacion: string = 'ES01'
  
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
      this.selectCodigo()
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
          (data:DataSet) => (data.label === this.coidogoEstacion+'.SO2' || data.label === this.coidogoEstacion+'.O3'  || data.label === this.coidogoEstacion+'.NO' || data.label === this.coidogoEstacion+'.NO2')
        ).map((data:DataSet) => {
          return {
            data: data.data.slice(this.slice, this.slice + 6),
            label: data.label
          }
        })
      }
  }

  private selectCodigo(): void{

    switch (this.selectedRegion){
      case 'COMUNIDAD AUTÓNOMA DE GALICIA':
        this.coidogoEstacion = 'ES05'
        break;
      case 'PRINCIPADO DE ASTURIAS':
        this.coidogoEstacion = 'ES08'
        break;
      case 'COMUNIDAD AUTÓNOMA DE CANTABRIA':
        this.coidogoEstacion = 'ES08'
        break;
      case 'COMUNIDAD AUTÓNOMA DEL PAÍS VASCO':
        this.coidogoEstacion = 'ES08'
        break;
      case 'COMUNIDAD FORAL DE NAVARRA':
        this.coidogoEstacion = 'ES14'
        break;
      case 'COMUNIDAD AUTÓNOMA DE ARAGÓN':
        this.coidogoEstacion = 'ES14'
        break;
      case 'COMUNIDAD AUTÓNOMA DE CATALUÑA':
        this.coidogoEstacion = 'ES10'
        break;
      case 'COMUNITAT VALENCIANA':
        this.coidogoEstacion = 'ES12'
        break;
      case 'REGIÓN DE MURCIA':
        this.coidogoEstacion = 'ES12'
        break;
      case 'COMUNIDAD AUTÓNOMA DE ANDALUCÍA':
        this.coidogoEstacion = 'ES17'
        break;
      case 'COMUNIDAD AUTÓNOMA DE EXTREMADURA':
        this.coidogoEstacion = 'ES11'
        break;
      case 'COMUNIDAD AUTÓNOMA DE CASTILLA-LA MANCHA':
        this.coidogoEstacion = 'ES01'
        break;
      case 'COMUNIDAD DE MADRID':
        this.coidogoEstacion = 'ES09'
        break;
      case 'COMUNIDAD AUTÓNOMA DE CASTILLA Y LEÓN':
        this.coidogoEstacion = 'ES13'
        break;
      case 'COMUNIDAD AUTÓNOMA DE LA RIOJA':
        this.coidogoEstacion = 'ES13'
        break;
      case 'COMUNIDAD AUTÓNOMA DE BALEARES':
        this.coidogoEstacion = 'ES06'
        break;
      case 'COMUNIDAD AUTÓNOMA DE CANARIAS':
        this.coidogoEstacion = 'ES06'
        break;
      case 'CIUDAD AUTÓNOMA DE CEUTA':
        this.coidogoEstacion = 'ES07'
        break;
      case 'CIUDAD AUTÓNOMA DE MELILLA':
        this.coidogoEstacion = 'ES07'
        break;
      default:
        this.coidogoEstacion = 'ES01'
        break;
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
