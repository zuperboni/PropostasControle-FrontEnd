import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadFileService {
  private API_URL = 'http://localhost:9080/arquivos/'
 
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let url = this.API_URL + 'uploadFile';
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', url , formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFile(fileName : String){
    let url = this.API_URL + 'downloadFile/' + fileName;
   // return new Promise ((resolve, reject) =>{  
    // return this.http.get(url);
        // .subscribe((result : any) =>{
        //   resolve(result.json());
        // },
        // (error) =>{
        //   reject(error.json());
        // });
   // });
  }
  // getFiles(): Promise<Arqui> {
  //     return null
  //  // return this.http
  // }
}
