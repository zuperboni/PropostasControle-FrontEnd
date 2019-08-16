import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitanteNovoPage } from './solicitante-novo';

@NgModule({
  declarations: [
    SolicitanteNovoPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitanteNovoPage),
  ],
})
export class SolicitanteNovoPageModule {}
