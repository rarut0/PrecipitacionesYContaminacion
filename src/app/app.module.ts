import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { SelectTimeComponent } from './select-time/select-time.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GraphicsComponent,
    SelectTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
