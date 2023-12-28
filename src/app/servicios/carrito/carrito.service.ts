import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { Articulo } from '../../clases/Articulo';

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
    this.actualizarCantidadCarrito();

   }

  actualizarCantidadCarrito() {

    this.cantidadProductos=JSON.parse(localStorage.getItem("carrito")!).length;
  }

  getProductos(){
    return JSON.parse(localStorage.getItem("carrito")!);
  }

  agregarProducto(producto:Articulo){
    let carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in  carrito) {

      if ( carrito[i].nombre == producto.nombre) {
        return false;
      }
    }
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.actualizarCantidadCarrito();
    return true;
  }

  eliminarProducto(producto:Articulo){
    let carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in  carrito) {
      if ( carrito[i].nombre == producto.nombre) {
        carrito.splice(i,1);
        break;
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.actualizarCantidadCarrito();

  }

  actualizarCarrito(producto:Articulo){
    let carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in  carrito) {
      if ( carrito[i].nombre == producto.nombre) {
        if (carrito[i].cantidadCarro == producto.cantidadCarro){
          return false;
        }
        carrito[i].cantidadCarro=producto.cantidadCarro;
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.actualizarCantidadCarrito();
    return true

  }

  eliminarTodo(){
    localStorage.setItem("carrito", "[]");
    this.actualizarCantidadCarrito();
  }

  private alertAgregadoExito(){
    Swal.fire(
      'Carrito de compras',
      'El artículo seleccionado se agrego exitosamente en su carrito de compras.',
      'success'
    );
  }

  private alertExiste(){
    Swal.fire(
      'Carrito de compras',
      'El artículo seleccionado ya se encuentra en su carrito de compras.',
      'error'
    );
  }

  private alertEliminadoExito(){
    Swal.fire(
      'Carrito de compras',
      'El artículo seleccionado se elimino exitosamente de su carrito de compras.',
      'success'
    );
  }

}
