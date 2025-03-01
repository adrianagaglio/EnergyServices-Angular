import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapPencilFill } from '@ng-icons/bootstrap-icons';
import { AlertModule } from '../../shared/alert/alert/alert.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    NgbProgressbar,
    AlertModule,
    NgIconsModule.withIcons({ bootstrapPencilFill }),
  ],
})
export class ProfileModule {}
