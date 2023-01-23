import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/Producto';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private carritoService:CarritoService ) {}
  cantidad = 1;
  productosCarrito= this.carritoService.getProductos();
  mensaje="";
  total= this.calcularTotal();
  ngOnInit(): void {

  }
  mas(producto:Producto) {

    if (producto.cantidadCarro != producto.stock && producto.stock!=1){
      producto.cantidadCarro++;
      this.total=this.calcularTotal();
    }
  }

  menos(producto:Producto) {
    if (producto.cantidadCarro!=1){
    producto.cantidadCarro--;
    this.total=this.calcularTotal();
  }
  }

  eliminarItem(item:Producto){
    // for (let i in this.productosCarrito){
    //   if (this.productosCarrito[i]==item){
    //     this.productosCarrito.splice(i,1);
    //     localStorage.setItem("carrito", JSON.stringify(this.productosCarrito));
    //   }
    // }
    // this.total=this.calcularTotal();
    this.carritoService.eliminarProducto(item);
    this.productosCarrito= this.carritoService.getProductos();
    this.total= this.calcularTotal();
  }

  formatoMensaje(){
    this.mensaje=`Hola Julieta! Te queria encargar: %0A`;
    for (let i in this.productosCarrito){
      this.mensaje+=this.productosCarrito[i].nombre + ": "+this.productosCarrito[i].cantidadCarro  + " unidad/es ($"+this.productosCarrito[i].cantidadCarro*this.productosCarrito[i].precio +")%0A";
    }
    this.mensaje += "Total: "+this.total+"%0A";
    this.mensaje+="Gracias!";
  }

  enviarWpp(){
    this.formatoMensaje();
  }

  calcularTotal(){
    let total=0;
    for (let producto of this.productosCarrito){
      total+= parseFloat(producto.precio)*parseFloat(producto.cantidadCarro);
    }
    return total;
  }

  vaciarTodo(){
    localStorage.setItem("carrito","[]");
    this.productosCarrito = JSON.parse(localStorage.getItem("carrito")!);
    this.carritoService.actualizarCarrito();
    this.total=this.calcularTotal();
  }

}
