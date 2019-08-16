import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResponsavelNovoPage } from './responsavel-novo';

@NgModule({
  declarations: [
    ResponsavelNovoPage,
  ],
  imports: [
    IonicPageModule.forChild(ResponsavelNovoPage),
  ],
})
export class ResponsavelNovoPageModule {}
