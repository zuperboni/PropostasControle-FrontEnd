import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PropostasProvider } from '../../providers/propostas/propostas';
import { Proposta } from '../../models/propostaModel';
import { Orcamento } from '../../models/OrcamentoModel';
import { PropostaNovaClassificacaoPage } from '../proposta-nova-classificacao/proposta-nova-classificacao';
import { StatusPropostaConstante } from '../../models/StatusPropostaConstante';

/**
 * Generated class for the PropostaNovaOrcamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proposta-nova-orcamento',
  templateUrl: 'proposta-nova-orcamento.html',
})
export class PropostaNovaOrcamentoPage {
  proposta: Proposta;
  flagPermiteAvanco : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: ToastController,private propostasProvider : PropostasProvider
    ,private alertCtrl: AlertController) {
   this.proposta = new Proposta();
   this.proposta.orcamento = new Orcamento();
   let editMode = navParams.get('editMode');

   // Verifica e está no modo edição e redireciona para a pagina correta
   if(editMode){ 
    this.proposta = navParams.get('proposta');
    this.listarPorId(this.proposta.id);
   }
  else{
    this.proposta.id = navParams.data;
    this.listarPorId(this.proposta.id);
  }
  }

  listarPorId(id:String){
    this.propostasProvider.listarPorId(id)
    .then((result : any) =>{
      this.proposta=result;
      if(this.proposta.orcamento==null){
        this.proposta.orcamento = new Orcamento();
      } 
    })
    .catch((error:any)=>{
      this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  cadastrarPropostaOrcamento(proposta: Proposta){
    // Define o status da proposta
     if(proposta.orcamento.isOrcamentoDetalhado == "true"){
       if(proposta.orcamento.flagPossuiDetalhamento == "true"){
         proposta.desStatusProposta = StatusPropostaConstante.EM_ORCAMENTACAO_ID
       }
       else{
         proposta.desStatusProposta = StatusPropostaConstante.EM_DETALHAMENTO_ID
         this.flagPermiteAvanco = false
       }
     }
  
    this.propostasProvider.atualizarProposta(proposta)
    .then((result: any) => {
      this.toast.create({ message: 'Proposta atualizada com sucesso!', position: 'botton', duration: 3000 }).present();
      
      // Verifica se deve ou não avançar para a próxima tela
      if(this.flagPermiteAvanco == true){
        this.navCtrl.push(PropostaNovaClassificacaoPage,result.id)
      }
      // Exibe mensagem
      else{
        this.exibeAlerta();
        this.flagPermiteAvanco = true;
      }
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao atualizar Proposta. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  exibeAlerta(){
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Para avançar é necessário que exista EF ou Detalhamento da demanda!',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
 
    this.flagPermiteAvanco = true;
  }

}
