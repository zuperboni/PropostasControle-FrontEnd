import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SolicitantesProvider } from '../../providers/solicitantes/solicitantes';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Solicitante } from '../../models/SolicitanteModel';
import { Usuario } from '../../models/UsuarioModel';
import {Filtro} from '../../models/FiltroModel';
import {PropostasProvider} from '../../providers/propostas/propostas';
import { ListPage } from '../list/list';
import { Proposta } from '../../models/propostaModel';

/**
 * Generated class for the PropostaBuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proposta-busca',
  templateUrl: 'proposta-busca.html',
})
export class PropostaBuscaPage {
  proposta: Proposta
  solicitante: Solicitante
  responsavel : Usuario
  solicitantes: Solicitante[]
  usuarios: Usuario[]
  propostas:Proposta[]
  filtros : Filtro[]
  filtrosCompleto : String[]
  filtro:Filtro
  parametros : String

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private solicitantesProvider: SolicitantesProvider, 
    private usuariosProvider: UsuariosProvider,
    private propostasProvider : PropostasProvider,
    private toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.solicitantes = [];
    this.usuarios = [];
    this.filtros = [];
    this.filtrosCompleto = [];
    this.propostas = [];
    this.listarSolicitantes();
    this.listarUsuarios();
  }
  aplicarFiltros(form){
    // Monta o array de filtros de acordo com o que foi preenchido no formulario
    this.filtrosCompleto = [];
    if(form.value.desStatusProposta != undefined){
      this.filtro = new Filtro()
      this.filtro.chave = 'desStatusProposta';
      this.filtro.operacao = ':';
      this.filtro.valor=form.value.desStatusProposta;
      this.filtrosCompleto.push('desStatusProposta'.concat(':',form.value.desStatusProposta));
    }
    if(form.value.isDemandaAgil != undefined){
      this.filtro = new Filtro()
      this.filtro.chave = 'isDemandaAgil';
      this.filtro.operacao = ':';
      this.filtro.valor=form.value.isDemandaAgil;
      this.filtrosCompleto.push('isDemandaAgil'.concat(':',form.value.isDemandaAgil));

    }
    if(form.value.responsavel != undefined){
      this.filtro = new Filtro()
      this.filtro.chave = 'proposta.responsavel.email';
      this.filtro.operacao = ':';
      this.filtro.valor=form.value.responsavel.email;
      this.filtros.push(this.filtro);
      this.filtrosCompleto.push('proposta.responsavel.email'.concat(':',form.value.responsavel.email));
    }
    if(form.value.solicitante != undefined){
      this.filtro = new Filtro()
      this.filtro.chave = 'proposta.solicitante.id';
      this.filtro.operacao = ':';
      this.filtro.valor=form.value.solicitante.id;
      this.filtros.push(this.filtro);
      this.filtrosCompleto.push('proposta.solicitante.id'.concat(':',form.value.solicitante.id));
    }
    
    this.montaURL()
  }

  montaURL(){
    this.parametros = this.filtrosCompleto.join(",");
    console.log("Parametros: " + this.parametros);
    this.filtrarPropostas();
  }
  listarUsuarios() {
    this.usuariosProvider.listar()
      .then((result: any) => {
        for (var i = 0; i < result.length; i++) {
          var usuario = result[i];
          this.usuarios.push(usuario);

        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
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
  filtrarPropostas(){
    this.propostasProvider.filtrarPropostas(this.parametros)
    .then((result : any) =>{
      for(var i = 0; i< result.content.length; i++){
        var proposta = result.content[i];
        this.propostas.push(proposta);
      }
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {propostas:this.propostas,telaFiltro:true})
    })
    .catch((error:any)=>{
      this.toast.create({ message: 'Erro ao pesquisar. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }
}
