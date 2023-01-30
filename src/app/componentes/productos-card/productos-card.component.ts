import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Carrito } from 'src/app/clases/Carrito';
import { Producto } from 'src/app/clases/Producto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService,
     private carritoService:CarritoService,
     private productoService:ProductoService,
     private route:Router) { }
  productos!: Producto[];
  carrito!: Carrito;
  // @Output() public producto = new EventEmitter<any>();
  ngOnInit(): void {
    this.manejoJson.getProductos().subscribe(
      data => {
        this.productos = data.productos;
      }
    )

    // this.productos[] = this.productoService.getProductos();
    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
    this.productoService.getProductoId(1);
  }
  agregar(producto: Producto) {
    producto.cantidadCarro=1;
    this.carritoService.agregarProducto(producto)
  }

  private alertExito(){
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
  verMas(producto:Producto){
    this.route.navigate(['/ver-mas/'+producto.id])
  }

  descargarPDF(){
    
  }
}
