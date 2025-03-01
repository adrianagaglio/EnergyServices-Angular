import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, NgIconsModule],
  exports: [AlertComponent],
})
export class AlertModule {}
