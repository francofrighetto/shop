import { Injectable } from '@angular/core';
import { ManejoJsonService } from './manejo-json.service';
import { ProductoService } from './producto.service';
import { Oferta } from '../clases/Oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private manejoJSON:ManejoJsonService,
    private productoService:ProductoService) { }
    ofertas = new Oferta();
  getOfertas(){
    let aux = this.productoService.getProductos();
    aux.forEach(e=>{
      for (let i=0;i<2;i++){
        if (e.productos[i].descuento!=0){
          this.ofertas.productos=(e.productos[i]);
        }
        console.log(e.productos[i]);
      }
    })
    return this.ofertas;
  }
}
