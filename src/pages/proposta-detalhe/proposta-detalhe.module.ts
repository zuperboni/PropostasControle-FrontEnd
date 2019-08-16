import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaDetalhePage } from './proposta-detalhe';
import { ListPage } from '../list/list';

@NgModule({
  declarations: [
    PropostaDetalhePage
  ],
  imports: [
    IonicPageModule.forChild(PropostaDetalhePage),
    IonicPageModule.forChild(ListPage),
  ],
  exports:[
    PropostaDetalhePage,
    ListPage
  ],
  entryComponents: [
    PropostaDetalhePage,
    ListPage
  ]
})
export class PropostaDetalhePageModule {}
