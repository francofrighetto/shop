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
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar);
  }

  getArticulosVerificados() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+endpoints.verificados);
  }

  getArticulosHabilitados() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+endpoints.habilitados);
  }

  getArticulosHabilitadosPag(page:number,size:number): Observable<Articulo[]>{
    const params = { page, size };
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+endpoints.habilitados+endpoints.paginado,{ params })
  }

  getArticulosNoHabilitados() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+endpoints.noHabilitados);
  }

  getArticulosNoHabilitadosPag(page:number,size:number): Observable<Articulo[]>{
    const params = { page, size };
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+endpoints.habilitados+endpoints.paginado,{ params })
  }

  getArticulosXCategoria(nombre:string) : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.mostrar+"/"+endpoints.categoria+nombre);
  }

  buscarPorNombre(nombre:string) : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(environment.url_api+endpoints.articulo+endpoints.busqueda+"/"+nombre);
  }

  guardarArticulo(articulo:any) :Observable<any>{
    return this.http.post(environment.url_api+endpoints.articulo+endpoints.nuevo,articulo);
  }

  editarArticulo(articulo:Articulo){
    return this.http.put(environment.url_api+endpoints.articulo+endpoints.editar,articulo);
  }

  borrarArticulo(id:number):Observable<any>{
    return this.http.delete(environment.url_api+endpoints.articulo+endpoints.eliminar+ "/"+id);
  }

  cambioHabilitado(id:number) :Observable<any>{
    return this.http.post(environment.url_api+endpoints.articulo+endpoints.cambioHabilitado+id,{});
  }

  getArticuloId(id:number){
    return this.http.get<Articulo>(environment.url_api+endpoints.articulo+endpoints.mostrar+"/"+id);
  }

  subirFoto(foto:any){
    return this.http.post(environment.url_api+"upload",foto);
  }
}
