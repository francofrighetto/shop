import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/clases/Articulo';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { GeneralService } from 'src/app/servicios/general/general.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers:[MessageService]
})
export class CarritoComponent implements OnInit {

  constructor(private carritoService: CarritoService, private funcionesGen: GeneralService,
    private messageService:MessageService) { }
  cantidad = 1;
  productosCarrito = this.carritoService.getProductos();
  mensaje = "";
  total = this.calcularTotal();
  ngOnInit(): void {

  }

  mas(producto: Articulo) {

    if (producto.cantidadCarro != producto.stock) {
      producto.cantidadCarro++;
      this.total = this.calcularTotal();
    }
    this.carritoService.actualizarCarrito(producto);
  }

  menos(producto: Articulo) {
    if (producto.cantidadCarro != 1) {
      producto.cantidadCarro--;
      this.total = this.calcularTotal();
    }
    this.carritoService.actualizarCarrito(producto);

  }

  eliminarItem(item: Articulo) {
    this.carritoService.eliminarProducto(item);
    this.productosCarrito = this.carritoService.getProductos();
    this.total = this.calcularTotal();
    this.messageService.add({ severity: 'success', detail: 'Artículo eliminado'});
  }

  formatoMensaje() {
    this.mensaje = `Hola Julieta! Te queria encargar: %0A`;
    for (let i in this.productosCarrito) {
      this.mensaje += this.productosCarrito[i].nombre + ": " + this.productosCarrito[i].cantidadCarro + " unidad/es ($" + this.productosCarrito[i].cantidadCarro *
        (this.productosCarrito[i].precioVenta - this.productosCarrito[i].precioVenta * this.productosCarrito[i].promocion / 100) + ") ";
      if (this.productosCarrito[i].promocion != undefined && this.productosCarrito[i].promocion != 0) {
        this.mensaje += "(promocion)";
      }
      this.mensaje += "%0A";
    }
    this.mensaje += "Total: " + this.total + "%0A";
    this.mensaje += "Gracias!";
  }

  enviarWpp() {
    this.formatoMensaje();

    this.vaciarTodo();
    window.open("https://api.whatsapp.com/send?phone=3534273353&text=" + this.mensaje, '_blank');
  }

  calcularTotal() {
    let total = 0;
    for (let producto of this.productosCarrito) {
      if (producto.promocion == null || producto.promocion == undefined) {
        producto.promocion = 0;
      }
      total += (parseFloat(producto.precioVenta) - parseFloat(producto.precioVenta) * parseFloat(producto.promocion) / 100) * parseFloat(producto.cantidadCarro);
    }
    return this.funcionesGen.formatearTotal(total);

    // return total;
  }

  vaciarTodo() {
    this.carritoService.eliminarTodo();
    this.productosCarrito = JSON.parse(localStorage.getItem("carrito")!);
    this.total = this.calcularTotal();
  }

  alertaCarrito() {
    Swal.fire({
      title: 'Se direccionará a WhatsApp',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      icon:'success',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      this.vaciarTodo();
      window.open("https://api.whatsapp.com/send?phone=3534273353&text=" + this.mensaje, '_blank');

    })
  }


  cambiarCantidad(cantidad: number, producto: Articulo) {
    console.log(cantidad);
    console.log(producto.cantidadCarro);

    if (cantidad > producto.stock) {
      producto.cantidadCarro = 1;
    }
    producto.cantidadCarro = cantidad;
  }

  // se usa mientras cambia, mientras tiene el foco y cuando lo pierde
  // se asegura que la cantidad no sea mayor a 99999 por mas que onInput lo limite a que no ingresa mas caracteres
  // es para que no agregue valores nulos, 0 o myores al limite
  // si esta agregado actualiza el valor del carrito
  lostFocus(cantidad: number, producto: Articulo) {

    if (cantidad == null || cantidad < 1 || cantidad > producto.stock) {
      producto.cantidadCarro = 1;
    } else {
      producto.cantidadCarro = cantidad;
    }
    this.carritoService.actualizarCarrito(producto);

  }
}
