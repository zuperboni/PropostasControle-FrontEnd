import { Component } from '@angular/core';
import { Proposta } from '../../models/propostaModel';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostasProvider } from '../../providers/propostas/propostas';
import { Atividade } from '../../models/AtividadeModel';

/**
 * Generated class for the PropostaDetalheAtividadesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proposta-detalhe-atividades',
  templateUrl: 'proposta-detalhe-atividades.html'
})
export class PropostaDetalheAtividadesComponent {
  proposta: Proposta;
  atividade: Atividade;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController,
    private propostasProvider : PropostasProvider) {
    this.proposta= navParams.get('item');
    this.atividade = new Atividade()
  }
  inserirComentario(atividade : Atividade){
      atividade.datRegistro =  new Date().toISOString();
     if (this.proposta.atividades != null) {
       this.proposta.atividades.push(atividade)
       } else {
         this.proposta.atividades = [];
         this.proposta.atividades.push(atividade)
   }
  
    this.propostasProvider.atualizarProposta(this.proposta)
    .then(() => {
      this.atividade= new Atividade();
      this.toast.create({ message: 'Comentário incluído com sucesso!', position: 'botton', duration: 3000 }).present();
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao atualizar Proposta. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });

  }
}
