import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../providers/arquivos/fileService';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Proposta } from '../../models/propostaModel';
import { ToastController, NavParams, NavController, DateTime } from 'ionic-angular';
import { PropostasProvider } from '../../providers/propostas/propostas';
import { Arquivo } from '../../models/ArquivoModel';

import {  
  FileTransfer,  
  FileTransferObject  
} from '@ionic-native/file-transfer';  
import { PropostaDetalheAnexosVisualizadorComponent } from '../proposta-detalhe-anexos-visualizador/proposta-detalhe-anexos-visualizador';
  
/**
 * Generated class for the PropostaDetalheAnexosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proposta-detalhe-anexos',
  templateUrl: 'proposta-detalhe-anexos.html'
})
export class PropostaDetalheAnexosComponent implements OnInit  {

  proposta : Proposta
  arquivo: Arquivo
  text: string
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  private fileTransfer: FileTransferObject;  
  
  constructor(
    public navCtrl: NavController,
    private uploadService: UploadFileService,private toast: ToastController,
    private propostasProvider : PropostasProvider,public navParams: NavParams) {
      this.proposta= navParams.get('item');
      this.arquivo = new Arquivo();
    }

  ngOnInit() {}

  selectFile(event) {
      this.selectedFiles = event.target.files;
  }

   upload() {
    this.progress.percentage = 0;

     this.currentFileUpload = this.selectedFiles.item(0)
     this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
       if (event.type === HttpEventType.UploadProgress) {
         this.progress.percentage = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
           // Atualizar a base de dados
             this.arquivo.nome=event.body['fileName']
             this.arquivo.tamanho=event.body['size']
             this.arquivo.tipoArquivo=event.body['fileType']
             this.arquivo.URLDownload = event.body['fileDownloadUri']
             this.arquivo.dataUpload =  new Date().toISOString();
           
           if (this.proposta.arquivos != null) {
             this.proposta.arquivos.push(this.arquivo)
             } else {
               this.proposta.arquivos = [];
               this.proposta.arquivos.push(this.arquivo)
         }
           this.atualizarProposta(this.proposta);
     }
   })
    this.selectedFiles = undefined
   }

  atualizarProposta(proposta: Proposta){
    this.propostasProvider.atualizarProposta(proposta)
    .then(() => {
      this.toast.create({ message: 'Proposta atualizada com sucesso!', position: 'botton', duration: 3000 }).present();
  
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao atualizar Proposta. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  itemTapped(arquivo: Arquivo) {
    this.navCtrl.push(PropostaDetalheAnexosVisualizadorComponent,{arquivo:arquivo})
    
  }
}

