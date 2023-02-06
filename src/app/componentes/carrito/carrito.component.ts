import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/Producto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { GeneralService } from 'src/app/servicios/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private carritoService: CarritoService, private funcionesGen:GeneralService) { }
  cantidad = 1;
  productosCarrito = this.carritoService.getProductos();
  mensaje = "";
  total = this.calcularTotal();
  ngOnInit(): void {

  }
  mas(producto: Producto) {

    if (producto.cantidadCarro != producto.stock) {
      producto.cantidadCarro++;
      this.total = this.calcularTotal();
    }
    this.carritoService.actualizarCarrito(producto);
  }

  menos(producto: Producto) {
    if (producto.cantidadCarro != 1) {
      producto.cantidadCarro--;
      this.total = this.calcularTotal();
    }
    this.carritoService.actualizarCarrito(producto);

  }

  eliminarItem(item: Producto) {
    // for (let i in this.productosCarrito){
    //   if (this.productosCarrito[i]==item){
    //     this.productosCarrito.splice(i,1);
    //     localStorage.setItem("carrito", JSON.stringify(this.productosCarrito));
    //   }
    // }
    // this.total=this.calcularTotal();
    this.carritoService.eliminarProducto(item);
    this.productosCarrito = this.carritoService.getProductos();
    this.total = this.calcularTotal();
  }

  formatoMensaje() {
    this.mensaje = `Hola Julieta! Te queria encargar: %0A`;
    for (let i in this.productosCarrito) {
      this.mensaje += this.productosCarrito[i].nombre + ": " + this.productosCarrito[i].cantidadCarro + " unidad/es ($" + this.productosCarrito[i].cantidadCarro * this.productosCarrito[i].precio + ")%0A";
    }
    this.mensaje += "Total: " + this.total + "%0A";
    this.mensaje += "Gracias!";
  }

  enviarWpp() {
    this.alertaCarrito();

    this.formatoMensaje();
  }

  calcularTotal() {
    let total = 0;
    for (let producto of this.productosCarrito) {
      total += parseFloat(producto.precio) * parseFloat(producto.cantidadCarro);
    }
    return this.funcionesGen.formatearTotal(total);

    // return total;
  }

  vaciarTodo() {
    this.carritoService.eliminarTodo();
    this.productosCarrito = JSON.parse(localStorage.getItem("carrito")!);
    this.total = this.calcularTotal();
  }

  alertaCarrito(){
    Swal.fire({
      title: 'Se confirmará la compra por WhatsApp, desea mantener el carrito con los productos seleccionados?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Mantener',
      denyButtonText: `Borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.open("https://api.whatsapp.com/send?phone=3534273353&text="+this.mensaje,'_blank');
      } else if (result.isDenied) {
        this.vaciarTodo();
        window.open("https://api.whatsapp.com/send?phone=3534273353&text="+this.mensaje,'_blank');
      }
    })
  }


  cambiarCantidad(cantidad: number, producto:Producto) {
    console.log(cantidad);
    console.log(producto.cantidadCarro);

    if (cantidad > producto.stock) {
      producto.cantidadCarro=1;
    }
    producto.cantidadCarro = cantidad;
  }
  
  // se usa mientras cambia, mientras tiene el foco y cuando lo pierde
  // se asegura que la cantidad no sea mayor a 99999 por mas que onInput lo limite a que no ingresa mas caracteres
  // es para que no agregue valores nulos, 0 o myores al limite
  // si esta agregado actualiza el valor del carrito
  lostFocus(cantidad:number, producto:Producto){

    if (cantidad == null || cantidad < 1 || cantidad > producto.stock) {
      producto.cantidadCarro = 1;
    } else {
      producto.cantidadCarro = cantidad;
    }
    this.carritoService.actualizarCarrito(producto);

  }
}
