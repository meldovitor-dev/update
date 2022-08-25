import { YoutubePipe } from './youtube.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    YoutubePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [YoutubePipe]

})
export class PipeModule { }
