import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(private http:HttpClient) { }

  nuevaFoto(idArt:any,url_foto:any):Observable<any>{
    return this.http.post(environment.url_api+"new/imagen",{"foto_nombre":url_foto, "articulo":{"art_id":idArt}});
  }
}
