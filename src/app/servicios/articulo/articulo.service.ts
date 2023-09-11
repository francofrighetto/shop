import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/clases/Articulo';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }

  getArticulos() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulos);
  }

  guardarArticulo(articulo:any) :Observable<any>{
    return this.http.post(environment.url_api+endpoints.nuevoArticulo,articulo);
  }

  editarArticulo(articulo:Articulo){
    return this.http.put(environment.url_api+endpoints.editarArticulo,articulo);
  }

  borrarArticulo(id:number):Observable<any>{
    return this.http.get(environment.url_api+endpoints.borrarArticulo+ "/"+id);
  }

  getArticuloId(id:number){
    return this.http.get<Articulo>(environment.url_api+endpoints.articulos+"/"+id);
  }

  subirFoto(foto:any){
    return this.http.post(environment.url_api+"upload",foto);
  }
}
