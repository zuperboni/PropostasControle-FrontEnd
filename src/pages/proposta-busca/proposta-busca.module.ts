import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaBuscaPage } from './proposta-busca';

@NgModule({
  declarations: [
    PropostaBuscaPage,
  ],
  imports: [
    IonicPageModule.forChild(PropostaBuscaPage),
  ],
})
export class PropostaBuscaPageModule {}
