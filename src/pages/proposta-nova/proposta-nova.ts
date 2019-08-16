import { PropostasProvider } from './../../providers/propostas/propostas'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Proposta } from '../../models/propostaModel';
import { Solicitante } from '../../models/SolicitanteModel';
import { SolicitantesProvider } from '../../providers/solicitantes/solicitantes';
import { PropostaNovaOrcamentoPage } from '../proposta-nova-orcamento/proposta-nova-orcamento';
import { Usuario } from '../../models/UsuarioModel';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { StatusPropostaConstante } from '../../models/StatusPropostaConstante';
import { PropostaNovaClassificacaoPage } from '../proposta-nova-classificacao/proposta-nova-classificacao';

/**
 * Generated class for the PropostaNovaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proposta-nova',
  templateUrl: 'proposta-nova.html',
})
export class PropostaNovaPage {
  proposta: Proposta
  solicitantes: Solicitante[]
  usurio: Usuario
  usuarios: Usuario[]
 

  cadastrarProposta(form) {
    form.value.desStatusProposta = StatusPropostaConstante.NAO_INICIADO_ID
    form.value.datSolicitacao = new Date().toISOString();
    this.propostasProvider.inserirProposta(form.value)
      .then((result: any) => {
        this.toast.create({ message: 'Proposta inserida com sucesso!', position: 'botton', duration: 3000 }).present();
        //Redirecionar o usuario para outra tela usando o navCtrl
        this.navCtrl.push(PropostaNovaOrcamentoPage, result.id)
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao inserir Proposta. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private propostasProvider: PropostasProvider,
    private toast: ToastController, private solicitantesProvider: SolicitantesProvider, 
    private usuariosProvider: UsuariosProvider) {
    this.proposta = new Proposta();
    let editMode = navParams.get('editMode');

    // Verifica e está no modo edição e redireciona para a pagina correta
    if(editMode){
      this.proposta = navParams.get('item');
      switch (this.proposta.desStatusProposta){
        case StatusPropostaConstante.EM_DETALHAMENTO_ID:{ 
          this.navCtrl.push(PropostaNovaClassificacaoPage,{
            editMode:true,
            proposta:this.proposta
          });
          break;
        }
        case StatusPropostaConstante.EM_ORCAMENTACAO_ID:{ 
          this.navCtrl.push(PropostaNovaOrcamentoPage,{
            editMode:true,
            proposta:this.proposta
          });
          break;
        }
        case StatusPropostaConstante.NAO_INICIADO_ID:{
          this.navCtrl.push(PropostaNovaPage,{
            editMode:true,
            proposta:this.proposta
          });
          break;
        }
        default:{ break;}
      }
    }
    this.listarSolicitantes();
    this.listarUsuarios();
  }

  listarSolicitantes() {
    this.solicitantesProvider.listar()
      .then((result: any) => {
        for (var i = 0; i < result.length; i++) {
          var solicitante = result[i];
          this.solicitantes.push(solicitante);
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }
  listarUsuarios() {
    this.usuariosProvider.listar()
      .then((result: any) => {
        for (var i = 0; i < result.length; i++) {
          var usuario = result[i];
          this.usuarios.push(usuario);
        }
      })
      .catch(() => {
       // this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  ionViewDidLoad() {
    this.solicitantes = [];
    this.usuarios = [];
  }

}
