import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PropostaNovaPage } from '../pages/proposta-nova/proposta-nova';
import { SolicitanteNovoPage } from '../pages/solicitante-novo/solicitante-novo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
   ,private actionSheetController : ActionSheetController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Propostas', component: ListPage },
      { title:'Cadastrar Proposta', component: PropostaNovaPage},
      { title:'Cadastrar Solicitante', component:SolicitanteNovoPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    
   // Exibe o componente ActionSheetController para definir a acao
    if(page.component.name =="PropostaNovaPage"){
      this.presentActionSheet();
    }
    else if(page.component.name == "ListPage"){
      this.nav.setRoot(page.component,{editMode:false});
    }
    else{
    this.nav.setRoot(page.component);
    }
  }
   presentActionSheet() {
    const actionSheet =  this.actionSheetController.create({
      title: 'O que você deseja fazer?',
      buttons: [{
        text: 'Editar proposta existente',
        role: 'destructive',
        icon: 'create',
        handler: () => {
          this.nav.setRoot(ListPage,{editMode:true});
        }
      }, {
        text: 'Criar nova proposta',
        icon: 'add',
        handler: () => {
          this.nav.setRoot(PropostaNovaPage,{editMode:false});
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
     actionSheet.present();
  }
}
