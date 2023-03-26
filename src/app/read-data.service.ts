  import { Injectable } from '@angular/core';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
  import * as precJSON from '../assets/prec.json';
  import * as quimJSON from '../assets/quimica.json';
import { DataSet, GraphicsData } from './graphicsData';

@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  private emptyData: GraphicsData = {
    dataSet: [{
      data:[],
      label:''
    }],
    chartLabels:['']
  };

  private data: GraphicsData = this.emptyData;

  constructor() {}

  public readDataFile(name: string): GraphicsData {

    this.data = this.emptyData;

    if(name === 'prec'){
      this.data = this.transformPrec(precJSON);
    }
    if(name === 'quim'){
      this.data = this.transformQuim(quimJSON);
    }
    return this.data
  }

  private transformPrec(jsonData: any[]):GraphicsData{

    const dataSetArray: DataSet[] = []
    const length = jsonData.length
    let chartLabels: string[] = []

    for(let i = 0; i < length; i++){

      const inner = jsonData[i]
      const data: number[] = []
      if(chartLabels.length === 0){
        chartLabels = Object.keys(inner).filter((key:string) => (key !== 'Parámetro' && key !== 'región'))
      }
      chartLabels.forEach((key: any) => {
        data.push(inner[key])
      });

      const dataSet:DataSet = {
        data,
        label: inner['región']
      }

      dataSetArray.push(dataSet)
    }

    const transformedPrec=
    {dataSet: dataSetArray,
    chartLabels};

    return transformedPrec;
  }
  private transformQuim(jsonData: any):GraphicsData{
    const dataSetArray: DataSet[] = []
    const length = jsonData.length
    let chartLabels: string[] = []

    for(let i = 0; i < length; i++){

      const inner = jsonData[i]
      const data: number[] = []
      if(chartLabels.length === 0){
        chartLabels = Object.keys(inner).filter((key:string) => (key !== 'VARIABLE' && key !== 'CODIGO' && key !== 'LATITUD' && key !== 'LONGITUD'))
      }
      chartLabels.forEach((key: any) => {
          data.push(inner[key])
      });

      const dataSet:DataSet = {
        data,
        label: inner['VARIABLE']
      }

      dataSetArray.push(dataSet)
    }

    const transformedPrec=
    {dataSet: dataSetArray,
    chartLabels};

    return transformedPrec;
  }
}

