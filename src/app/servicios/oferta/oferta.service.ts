import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http:HttpClient) { }
  getOfertas(){
    return this.http.get<any>(environment.url_api+endpoints.articulo+endpoints.mostrar+"/"+endpoints.promocion);
  }
}
