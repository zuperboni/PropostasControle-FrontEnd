import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 
import {FileOpener} from '@ionic-native/file-opener';
import {FileTransfer} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {DocumentViewer} from '@ionic-native/document-viewer'
import { OrderModule } from 'ngx-order-pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {PropostaNovaPage} from '../pages/proposta-nova/proposta-nova';
import { PropostaNovaOrcamentoPage } from '../pages/proposta-nova-orcamento/proposta-nova-orcamento';
import { PropostaNovaClassificacaoPage } from '../pages/proposta-nova-classificacao/proposta-nova-classificacao';
import { PropostaDetalhePage } from '../pages/proposta-detalhe/proposta-detalhe';
import { SolicitanteNovoPage } from '../pages/solicitante-novo/solicitante-novo';
import { ResponsavelNovoPage } from '../pages/responsavel-novo/responsavel-novo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { PropostasProvider } from '../providers/propostas/propostas';
import { SolicitantesProvider } from '../providers/solicitantes/solicitantes';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { PropostaBuscaPage } from '../pages/proposta-busca/proposta-busca';
import { PropostaDetalheAtividadesComponent } from '../components/proposta-detalhe-atividades/proposta-detalhe-atividades';
import { PropostaDetalheAnexosComponent } from '../components/proposta-detalhe-anexos/proposta-detalhe-anexos';
import { PropostaDetalheInformacoesComponent } from '../components/proposta-detalhe-informacoes/proposta-detalhe-informacoes';
import { PapeisProvider } from '../providers/papeis/papeis';
import {UploadFileService} from '../providers/arquivos/fileService';
import { PropostaDetalheAnexosVisualizadorComponent } from '../components/proposta-detalhe-anexos-visualizador/proposta-detalhe-anexos-visualizador';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PropostaDetalhePage,
    PropostaNovaPage,
    PropostaNovaOrcamentoPage,
    PropostaNovaClassificacaoPage,
    PropostaBuscaPage,
    SolicitanteNovoPage,
    ResponsavelNovoPage,
    PropostaDetalheAtividadesComponent,
    PropostaDetalheAnexosComponent,
    PropostaDetalheInformacoesComponent,
    PropostaDetalheAnexosVisualizadorComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['janeiro', 'fevereiro', 'mar\u00e7o', 'abril', 'maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],
      monthShortNames: ['jan', 'fev', 'mar','abr','mai','jun','jul','ago','set','out','nov','dez' ],
      dayNames: ['domingo', 'segunda-feira', 'ter\u00e7a-feira', 'quarta-feira','quinta-feira','sexta-feita','s\u00e1bado'],
      dayShortNames: ['dom', 'seg', 'ter', 'qua','qui','sex','sab' ]
    }),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PropostaDetalhePage,
    PropostaNovaPage,
    PropostaNovaOrcamentoPage,
    PropostaNovaClassificacaoPage,
    SolicitanteNovoPage,
    ResponsavelNovoPage,
    PropostaBuscaPage,
    PropostaDetalheAtividadesComponent,
    PropostaDetalheAnexosComponent,
    PropostaDetalheInformacoesComponent,
    PropostaDetalheAnexosVisualizadorComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileOpener,
    FileTransfer,
    File,
    PropostasProvider,
    SolicitantesProvider,
    UsuariosProvider,
    PapeisProvider,
    UploadFileService  ,
    DocumentViewer  
  ]
})
export class AppModule {}
