import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';

/*
  Generated class for the PropostasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PropostasProvider {
private API_URL = 'http://localhost:9080/'

  constructor(public http: Http) {
  }

listar(){
  return new Promise ((resolve, reject) =>{

    let url = this.API_URL + 'propostas';

    this.http.get(url)
      .subscribe((result : any) =>{
        resolve(result.json());
      },
      (error) =>{
        reject(error.json());
      });
  });
}  

listarPorId(id: String){
  return new Promise ((resolve, reject) =>{

    let url = this.API_URL + 'propostas'+'/'+id;

    this.http.get(url)
      .subscribe((result : any) =>{
        resolve(result.json());
      },
      (error) =>{
        reject(error.json());
      });
  });
}

filtrarPropostas(parametros:String){
  return new Promise ((resolve, reject) =>{
    let url = this.API_URL + 'propostas' + '/buscar?search=' + parametros;
    this.http.get(url)
      .subscribe((result : any) =>{
        resolve(result.json());
      },
      (error) =>{
        reject(error.json());
      });
  });
}

inserirProposta(proposta: any ){
  return new Promise((resolve, reject) => {
    this.http.post(this.API_URL + 'propostas', proposta)
      .subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
  });
}  

atualizarProposta(proposta: any ){
  return new Promise((resolve, reject) => {
    this.http.put(this.API_URL + 'propostas', proposta)
      .subscribe((result: any) => {
        resolve(result.json()) 
      },
      (error) => {
        reject(error.json());
      });
  });
}  
}
