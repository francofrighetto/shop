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

  // getProductos(){
  //   this.manejoJSON.getProductos().forEach(element => {
  //     return element.productos;
  //   })
  // }

  getProductos(){
    return this.manejoJSON.getProductos();
  }

  getProductoId(id:number){
    // let a:Producto=new Producto;
    let a="";

    this.manejoJSON.getProductos().subscribe(data=>{

      for (let i =0; i<data.productos.length;i++){
        if (data.productos[i].id==id){
          a= "a";
        }
      }
    return a;

    })

  }

}
