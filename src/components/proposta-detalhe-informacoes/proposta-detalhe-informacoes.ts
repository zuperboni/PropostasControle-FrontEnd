import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Proposta } from '../../models/propostaModel';

/**
 * Generated class for the PropostaDetalheInformacoesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proposta-detalhe-informacoes',
  templateUrl: 'proposta-detalhe-informacoes.html'
})
export class PropostaDetalheInformacoesComponent {
  proposta: Proposta;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.proposta= navParams.get('item');
  }

}
