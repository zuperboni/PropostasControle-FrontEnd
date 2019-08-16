import { PropostasProvider } from './../../providers/propostas/propostas'
import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { PropostaDetalhePage } from '../proposta-detalhe/proposta-detalhe';
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';
import { Proposta } from '../../models/propostaModel';
import { PropostaBuscaPage } from '../proposta-busca/proposta-busca';
import { StatusProposta } from '../../models/StatusPropostaModel';
import { PropostaNovaPage } from '../proposta-nova/proposta-nova';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: Proposta;
  propostas:Proposta[];
  filtros: any;
  propostaBuscar: Proposta;
  telaFiltro : boolean;
  statusProposta : StatusProposta
  // Variáveis usadas para a busca
  showList: boolean = false;
  searchQuery: string = '';
  propostasBuscadas :Proposta[];
  editMode : boolean = false;

  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private toast: ToastController, private propostasProvider : PropostasProvider
    ,private orderPipe: OrderPipe) {
    this.propostaBuscar = new Proposta();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.propostas = navParams.get('propostas');
    this.telaFiltro = navParams.get('telaFiltro');
    this.propostaBuscar.solicitante = navParams.get('solicitante');
    this.editMode = navParams.get('editMode');
  }

  itemTapped(item) {
    if(this.editMode){
    this.navCtrl.push(PropostaNovaPage,{
      editMode:true,
      item:item
    });
    }
    else{
      this.navCtrl.push(PropostaDetalhePage, {
        item: item
      });
    }    
  }

  buscarPropostas() {
    this.navCtrl.setRoot(PropostaBuscaPage);
  }

  listarPropostas(){
    console.log(this.propostaBuscar)
    this.propostasProvider.listar()
    .then((result : any) =>{
      for(var i = 0; i< result.length; i++){
        var proposta = result[i];       
        this.propostas.push(proposta);
      }
      console.log(this.orderPipe.transform(this.propostas, 'datSolicitacao',true));
    })
    .catch((error:any)=>{
      this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  // Método para filtrar os itens da lista
  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      
      // Filter the items
      this.propostasBuscadas = this.propostas.filter((item) => {
        return (item.desDemanda.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
      // Show the results
      this.showList = true;
    } else {
      
      // hide the results when the query is empty
      this.showList = false;
    }
  }
  ionViewDidEnter() {
    if(this.telaFiltro){

    }
    else{
      this.propostas = [];
      this.listarPropostas();
    }
  }
}
