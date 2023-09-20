import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(private http:HttpClient) { }

  nuevaFoto(idArt:any,url_foto:any):Observable<any>{
    return this.http.post(environment.url_api+endpoints.foto+endpoints.nuevo,
    {"foto_nombre":url_foto, "articulo":{"art_id":idArt}});
  }
}
