import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/clases/Categoria';
import { endpoints } from 'src/app/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  getCategorias():Observable<any>{
    return this.http.get<any>(environment.url_api+endpoints.categoria+endpoints.mostrar);
  }


  guardarCategoria(categoria:any) :Observable<any>{
    return this.http.post(environment.url_api+endpoints.categoria+endpoints.nuevo,categoria);
  }

  editarCategoria(categoria:Categoria){
    return this.http.put(environment.url_api+endpoints.categoria+endpoints.editar,categoria);
  }

  borrarCategoria(id:number):Observable<any>{
    return this.http.delete(environment.url_api+endpoints.categoria+endpoints.eliminar+ "/"+id);
  }

  getCategoriaId(id:number){
    return this.http.get<Categoria>(environment.url_api+endpoints.categoria+endpoints.mostrar+"/"+id);
  }
}
