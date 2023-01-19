import { Injectable } from '@angular/core';
import { Producto } from '../clases/Producto';
import { Carrito } from '../clases/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public cantidadProductos : number = 0;
  carrito! : Carrito;
  constructor() {
    if (localStorage.getItem("carrito")==null || localStorage.getItem("carrito") == undefined){
      localStorage.setItem("carrito","[]");
    }
    this.actualizarCarrito();

   }

  actualizarCarrito() {
    this.cantidadProductos=JSON.parse(localStorage.getItem("carrito")!).length;
  }

  agregarProducto(producto:Producto){
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in this.carrito) {
      if (this.carrito.productos[ parseInt(i)].nombre == producto.nombre) {
        // falta alerta de q ya existe
        return
      }
    }
    this.carrito.productos.push(producto);
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.actualizarCarrito();
  }
}
