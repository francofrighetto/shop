import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManejoJsonService } from './manejo-json.service';
import { Producto } from '../clases/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient, private manejoJSON:ManejoJsonService) { 
  }

  getProductos():Producto{
    this.manejoJSON.getProductos().subscribe(data=>{
      return data.productos;
    })
    return new Producto;
  }


  getProductoId(id:number):Producto{
    this.manejoJSON.getProductos().subscribe(data=>{
      for (let i =0; i<data.productos.length;i++){
        if (data.productos[i].id==id){
          return data.productos[i];
        }
      }
    })
    return new Producto;
  }

}
