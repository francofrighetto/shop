import { Injectable } from '@angular/core';
import { Producto } from '../clases/Producto';
import { Carrito } from '../clases/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public cantidadProductos : number = 0;
  // carrito!: Carrito;
  constructor() {
    if (localStorage.getItem("carrito")==null || localStorage.getItem("carrito") == undefined){
      localStorage.setItem("carrito","[]");
    }
    this.actualizarCarrito();

   }
   
  actualizarCarrito() {
    this.cantidadProductos=JSON.parse(localStorage.getItem("carrito")!).length;
  }

  getProductos(){
    return JSON.parse(localStorage.getItem("carrito")!);
  }

  agregarProducto(producto:Producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in  carrito) {
      if ( carrito[i].nombre == producto.nombre) {
        // falta alerta de q ya existe
        return
      }
    }
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.actualizarCarrito();
  }

  eliminarProducto(producto:Producto){
    console.log("a");
    let carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in  carrito) {
      if ( carrito[i].nombre == producto.nombre) {
        carrito.splice(i,1);
        break;
      }
    }
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.actualizarCarrito();

  }
}
