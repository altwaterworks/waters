import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Terrain } from './terrain';

@NgModule({
  declarations: [
    Terrain,
  ],
  imports: [
    IonicPageModule.forChild(Terrain),
  ],
  exports: [
    Terrain
  ]
})
export class TerrainModule {}
