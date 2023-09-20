import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from 'src/app/clases/Promocion';
import { endpoints } from 'src/app/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(private http:HttpClient) { }

  getPromociones() : Observable<Promocion[]>{
    return this.http.get<Promocion[]>(environment.url_api+endpoints.promocion+endpoints.mostrar);
  }

  guardarPromocion(promocion:any) :Observable<any>{
    return this.http.post(environment.url_api+endpoints.promocion+endpoints.nuevo,promocion);
  }

  editarPromocion(promocion:Promocion){
    return this.http.put(environment.url_api+endpoints.promocion+endpoints.editar,promocion);
  }

  borrarPromocion(id:number):Observable<any>{
    return this.http.delete(environment.url_api+endpoints.promocion+endpoints.eliminar+ "/"+id);
  }

  getPromocionId(id:number){
    return this.http.get<Promocion>(environment.url_api+endpoints.promocion+endpoints.mostrar+"/"+id);
  }
}
