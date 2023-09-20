import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carrito } from 'src/app/clases/Carrito';
import { Producto } from 'src/app/clases/Producto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { Articulo } from 'src/app/clases/Articulo';
import { MenuItem } from 'primeng/api';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/clases/Categoria';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private route: Router,
    private rutaActiva: ActivatedRoute,
    private articuloService: ArticuloService,
    private categoriaService: CategoriaService) { }
  productos!: Articulo[];
  carrito!: Carrito;
  categoria?: Categoria;

  items: MenuItem[] = [];

  home: MenuItem = { label: 'Articulos', routerLink: '/' };

  titulo: string = "";

  id?: number;
  ngOnInit(): void {
    // this.manejoJson.getProductos().subscribe(
    //   data => {
    // this.productos = data.productos;
    // })
    this.id = this.rutaActiva.snapshot.params["idCategoria"];
    if (this.id != undefined) {
      this.getArticulosXCategoria(this.id);
      this.getCategoria(this.id);
    } else {
      this.getArticulos();
      this.titulo = "Todos los artículos";
    }



    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
  }

  getArticulos() {
    this.articuloService.getArticulos().subscribe(data => {
      this.productos = data;
    })
  }

  getArticulosXCategoria(id: number) {
    this.articuloService.getArticulosXCategoria(id).subscribe(data => {
      this.productos = data;
    })
  }

  getCategoria(id: number) {
    this.categoriaService.getCategoriaId(id).subscribe(data => {
      this.categoria = data;
      if (this.categoria != null) {
        this.items = [{ label: this.categoria.nombre, routerLink: '/productos/' + this.categoria.cat_id }];
      }
    })
  }


  agregar(producto: Articulo) {
    producto.cantidadCarro = 1;
    this.carritoService.agregarProducto(producto)
  }

  private alertExito() {
    Swal.fire(
      'Carrito de compras',
      'El artículo seleccionado se agrego exitosamente en su carrito de compras.',
      'success'
    );
  }

  private alertExiste() {
    Swal.fire(
      'Carrito de compras',
      'El artículo seleccionado ya se encuentra en su carrito de compras.',
      'error'
    );
  }
  verMas(producto: Articulo) {
    this.route.navigate(['/ver-mas/' + producto.art_id])
  }

}
