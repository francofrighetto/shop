import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/clases/Articulo';
import { Carrito } from 'src/app/clases/Carrito';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { OfertaService } from 'src/app/servicios/oferta/oferta.service';
import Swal from 'sweetalert2';

import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  carrito:Carrito=new Carrito();
  url_imagen:string = environment.url_imagen;



  constructor(
    private carritoService: CarritoService,
    private route: Router,
    private ofertaService: OfertaService) { }
  productos!: Articulo[];
  hayOfertas:boolean=false;

  home: MenuItem = { label: 'Articulos', routerLink: '/' };
  items: MenuItem[] =[{ label: 'Ofertas', routerLink: '/ofertas' }];



  ngOnInit(): void {
    this.getOfertas();
    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
  }

  getOfertas() {
    this.ofertaService.getOfertas().subscribe(data => {
      this.productos = data;
      if(this.productos.length!=0){
        this.hayOfertas=true;
      }
    })
  }

  errorImagen(producto: Articulo) {
    producto.errorImagen = true;
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
