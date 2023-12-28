import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carrito } from 'src/app/clases/Carrito';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { Articulo } from 'src/app/clases/Articulo';
import { MenuItem } from 'primeng/api';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/clases/Categoria';
import { FilesService } from 'src/app/servicios/files/files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(
    private carritoService: CarritoService,
    private route: Router,
    private rutaActiva: ActivatedRoute,
    private articuloService: ArticuloService,
    private categoriaService: CategoriaService,
    private fileService: FilesService) { }


  productos!: Articulo[];
  carrito!: Carrito;
  categoria?: Categoria;

  items: MenuItem[] = [];

  home: MenuItem = { label: 'Articulos', routerLink: '/' };

  titulo: string = "";

  url_imagen: string = environment.url_imagen;
  hayProductos: boolean = false;


  id?: number;
  nombreCategoria: string = "";
  ngOnInit(): void {
    this.rutaActiva.paramMap.subscribe((params) => {
      this.nombreCategoria = params.get('nombreCategoria') || "";
      if (this.nombreCategoria != "") {
        this.getArticulosXCategoria(this.nombreCategoria);
        this.items = [{ label: this.nombreCategoria, routerLink: '/productos/' + this.nombreCategoria }];
      } else {
        this.getArticulos();
      }
    });
    // this.nombreCategoria = this.rutaActiva.snapshot.params["nombreCategoria"] || "";
    // this.getCategoria(this.nombreCategoria);


    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
  }

  getArticulos() {
    this.articuloService.getArticulosVerificados().subscribe(data => {
      this.productos = data;
      this.hayProductos = this.productos.length != 0;
    })
  }

  errorImagen(producto: Articulo) {
    producto.errorImagen = true;
  }

  getArticulosXCategoria(nombre: string) {
    this.articuloService.getArticulosXCategoria(nombre).subscribe(data => {
      this.productos = data;
      this.hayProductos = this.productos.length != 0;
    })
  }

  getCategoria(nombre: string) {
    // this.categoriaService.getCategoriaId(id).subscribe(data => {
    //   this.categoria = data;
    //   if (this.categoria != null) {
    //     this.items = [{ label: this.categoria.nombre, routerLink: '/productos/' + this.categoria.cat_id }];
    //   }
    // })



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
