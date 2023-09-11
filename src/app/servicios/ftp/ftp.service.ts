import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FtpService {

  constructor(private http:HttpClient) { }

  subirFoto(archivo:any){
    const url_api = environment.url_api + endpoints.subirFoto;
    return this.http.post(url_api,{archivo});
  }
}
