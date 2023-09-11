import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Carrito } from 'src/app/clases/Carrito';
import { Producto } from 'src/app/clases/Producto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { Articulo } from 'src/app/clases/Articulo';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService,
     private carritoService:CarritoService,
     private productoService:ProductoService,
     private route:Router,
     private rutaActiva: ActivatedRoute,
     private articuloService:ArticuloService) { }
  productos!: Articulo[];
  carrito!: Carrito;
  // @Output() public producto = new EventEmitter<any>();
  ngOnInit(): void {
    this.manejoJson.getProductos().subscribe(
      data => {
    this.productos = data.productos;
    })

    // this.articuloService.getArticulos().subscribe(data=>{
    //   this.productos=data;
    //   console.log(this.productos);
    // })

    // this.productos[] = this.productoService.getProductos();
    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
  }
  agregar(producto: Articulo) {
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
  verMas(producto:Articulo){
    console.log(producto);
    this.route.navigate(['/ver-mas/'+producto.id])
  }

  descargarPDF(){

  }
}
