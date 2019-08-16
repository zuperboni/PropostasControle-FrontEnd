import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  private API_URL = 'http://localhost:9080/'

  constructor(public http: Http) {
  }

  listar(){
    return new Promise ((resolve, reject) =>{
  
      let url = this.API_URL + 'usuarios';
  
      this.http.get(url)
        .subscribe((result : any) =>{
          resolve(result.json());
        },
        (error) =>{
          reject(error.json());
        });
    });
  } 


}
