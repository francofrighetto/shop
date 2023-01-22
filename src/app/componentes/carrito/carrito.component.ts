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
  this.formatoMensaje();
  console.log(this.productosCarrito);

  }
  mas() {
    this.cantidad += 1;

  }

  menos() {
    this.cantidad -= 1;
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
      console.log(this.productosCarrito[i].id);
      console.log(document.getElementById("input-prod"+this.productosCarrito[i].id))
      this.mensaje+=this.productosCarrito[i].nombre + ": " + "%0A";
    }
    this.mensaje+=" Gracias!";
  }

  enviarWpp(){
    this.formatoMensaje();
  }

  calcularTotal(){
    let total=0;
    for (let producto of this.productosCarrito){
      total+= parseFloat(producto.precio);
    }
    return total;
  }

}
