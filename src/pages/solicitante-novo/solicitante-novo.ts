import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { Solicitante } from '../../models/SolicitanteModel';
import { SolicitantesProvider } from '../../providers/solicitantes/solicitantes';

/**
 * Generated class for the SolicitanteNovoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitante-novo',
  templateUrl: 'solicitante-novo.html',
})
export class SolicitanteNovoPage {
  solicitante:Solicitante

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private solicitanteProvider: SolicitantesProvider,
    private toast : ToastController) {
      this.solicitante = new Solicitante();
    }

  cadastrarSolicitante(form){
    this.solicitanteProvider.inserirSolicitante(form.value).then((result : any)=>{
      this.toast.create({ message: 'Solicitante inserido com sucesso!', position: 'botton', duration: 3000 }).present();
    }).catch((error:any)=>{
      this.toast.create({ message: 'Erro ao inserir Solicitante. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  ionViewDidLoad() {
  }

}
