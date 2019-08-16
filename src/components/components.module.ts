import { NgModule } from '@angular/core';
import { PropostaDetalheAtividadesComponent } from './proposta-detalhe-atividades/proposta-detalhe-atividades';
import { PropostaDetalheInformacoesComponent } from './proposta-detalhe-informacoes/proposta-detalhe-informacoes';
import { PropostaDetalheAnexosComponent } from './proposta-detalhe-anexos/proposta-detalhe-anexos';
import { PropostaDetalheAnexosVisualizadorComponent } from './proposta-detalhe-anexos-visualizador/proposta-detalhe-anexos-visualizador';

@NgModule({
	declarations: [PropostaDetalheAtividadesComponent,
    PropostaDetalheInformacoesComponent,
    PropostaDetalheAnexosComponent,
    PropostaDetalheAnexosVisualizadorComponent],
	imports: [
    
    ],
	exports: [
    PropostaDetalheAtividadesComponent,
    PropostaDetalheInformacoesComponent,
    PropostaDetalheAnexosComponent,
    PropostaDetalheAnexosVisualizadorComponent]
})
export class ComponentsModule {}
