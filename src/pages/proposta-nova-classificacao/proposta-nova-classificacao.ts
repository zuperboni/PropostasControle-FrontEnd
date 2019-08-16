import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, List } from 'ionic-angular';
import { Proposta } from '../../models/propostaModel';
import { PropostasProvider } from '../../providers/propostas/propostas';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Time } from '../../models/TimeModel';
import { PapeisProvider } from '../../providers/papeis/papeis';
import { ListPage } from '../list/list';

/**
 * Generated class for the PropostaNovaClassificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proposta-nova-classificacao',
  templateUrl: 'proposta-nova-classificacao.html',
})
export class PropostaNovaClassificacaoPage {

  proposta: Proposta;
  time : Time;
  papeis:String[];


  public form 	: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController,
    private propostasProvider : PropostasProvider,
    private papelProvider : PapeisProvider,
    private _FB          : FormBuilder) {
    this.proposta = new Proposta();
    this.proposta.id= navParams.data;
    this.time = new Time();
    this.proposta.time = [];
    // Time dinamico
    this.form = this._FB.group({
      desObservacao: ['', Validators.required], 
      isDemandaAgil:[false, Validators.required],
      numHorasEstimadas:['',Validators.required], 
      datInicio:['',Validators.required], 
      datTermino:['',Validators.required], 
      numHorasProdSprint:['',Validators.required], 
      tempoPorSprint:['',Validators.required], 
      numSprints:['',Validators.required], 

      qtdProfissional: ['', Validators.required],
      isQtdPercentual: ['', Validators.required],
      desPapelTime: [false, Validators.required],

      flagConciliacao:[true,Validators.required], 
      numIP:['',Validators.required], 
      numPF:['',Validators.required],
      flagConcilicacaoAceita:[true,Validators.required], 
      desJustificativa:['',Validators.required],

      times     : this._FB.array([
         this.initTimeFields()
      ])
   });

  }

  initTimeFields(): FormGroup {
    return this._FB.group({
      qtdProfissional: ['', Validators.required],
      isQtdPercentual: [false, Validators.required],
      desPapelTime: ['', Validators.required]
    });
  }

  addNewTimeField() : void
  {
    //this.proposta.time = [];
    //this.proposta.time.push(this.time);
    const control = <FormArray>this.form.controls.times;
    control.push(this.initTimeFields());
  }

  removeTimeField(i : number) : void
  {
    const control = <FormArray>this.form.controls.times;
    control.removeAt(i);
  }

  listarPorId(id:String){
    this.propostasProvider.listarPorId(id)
    .then((result : any) =>{
      this.proposta=result;
    })
    .catch((error:any)=>{
      this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  cadastrarPropostaClassificacao(proposta: Proposta, form: any){
    this.proposta.time = [];
    
    // Percorre a lista de time do form e insere no objeto modelo
    for(var i = 0; i < form.times.length; i++) {
      this.proposta.time.push(form.times[i]);
      }
   
    this.propostasProvider.atualizarProposta(proposta)
    .then((result: any) => {
      this.toast.create({ message: 'Proposta atualizada com sucesso!', position: 'botton', duration: 3000 }).present();
      this.navCtrl.push(ListPage)
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao atualizar Proposta. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });

  }
  listarPapeis(){
    this.papelProvider.listar()
    .then((result : any) =>{
      this.papeis=result;
    })
    .catch((error:any)=>{
      this.toast.create({ message: 'Erro ao listar os papeis. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
  }

  ionViewDidLoad() {
    this.proposta.time = [];
    this.listarPorId(this.proposta.id);
    this.listarPapeis();
  }
}
