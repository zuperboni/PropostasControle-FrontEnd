import { Component } from '@angular/core';
import { NavController, Platform, NavParams, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Arquivo } from '../../models/ArquivoModel';

/**
 * Generated class for the PropostaDetalheAnexosVisualizadorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proposta-detalhe-anexos-visualizador',
  templateUrl: 'proposta-detalhe-anexos-visualizador.html'
})
export class PropostaDetalheAnexosVisualizadorComponent {

  arquivo : Arquivo
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private file: File,
    private fileTransfer: FileTransfer,
    private platform: Platform,
    private fileOpener: FileOpener,
    public loadingCtrl: LoadingController
  ) {
    this.arquivo= navParams.get('arquivo');
    console.log(this.arquivo);
    this.getAndShow();
  }

    getAndShow(){
      this.presentLoadingCrescent();
      let path = null;

      if(this.platform.is('ios')){
        path = this.file.documentsDirectory
      }
      else{
        path = this.file.dataDirectory
      }
      // Cria o Objeto de transferencia de arquivo
      const ft = this.fileTransfer.create();
      ft.download('http://localhost:9080/arquivos/downloadFile/' + this.arquivo.nome,path + this.arquivo.nome).then(  
     res=>{
       // Exibe o arquivo
       this.fileOpener.open(path + this.arquivo.nome, this.arquivo.tipoArquivo.toString())
       .then(() => console.log('File is opened'))
       .catch(e => console.log('Error opening file', e));       
        }
      );
    }
    presentLoadingCrescent() {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Aguarde',
        duration: 5000
      });
  
      loading.present();
    }
  
}
