import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaNovaPage } from './proposta-nova';

@NgModule({
  declarations: [
    PropostaNovaPage,
  ],
  imports: [
    IonicPageModule.forChild(PropostaNovaPage),
  ],
})
export class PropostaNovaPageModule {}
