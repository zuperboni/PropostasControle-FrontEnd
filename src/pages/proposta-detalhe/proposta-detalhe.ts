import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-proposta-detalhe',
  templateUrl: 'proposta-detalhe.html',
})
export class PropostaDetalhePage {
  trocaAba : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trocaAba = 'informacoes';
  }

  ionViewDidLoad() {
}
  }


