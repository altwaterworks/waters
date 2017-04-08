import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Capture } from './capture';

@NgModule({
  declarations: [
    Capture,
  ],
  imports: [
    IonicPageModule.forChild(Capture),
  ],
  exports: [
    Capture
  ]
})
export class CaptureModule {}
