import { Component, OnInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { Producto } from 'src/app/clases/Producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Carrito } from 'src/app/clases/Carrito';
import { parse } from 'path';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css']
})
export class VerMasComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private route: ActivatedRoute) { }
  // producto:any;
  imagen = "";
  // cantidadCarro:number=1;
  // @Input() producto:any;
  producto!: Producto;
  id: number = 0;
  carrito!:Producto[];
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id= parseInt(params['id']);
    })

    this.manejoJson.getProductos().subscribe(
      data => {
        this.producto = data.productos[this.id-1];
        this.imagen = "../../.." + this.producto.fotos[0];
        // this.cantidadCarro = this.producto.cantidadCarro;
        this.checkAgregados();
      }
    )

    this.carrito = this.carritoService.getProductos();
  }
  // imagen="../../../assets/img/producto2.jpg";

  cambiarImagen(ruta: any) {
    this.imagen = '../../..'+ruta;
  }
  agregarProducto(producto: Producto) {
    // producto.cantidadCarro=this.cantidadCarro;
    // producto.cantidad=this.cantidadCarro;
    this.carritoService.agregarProducto(producto);
  }
  menos(producto:Producto){
    if (producto.cantidadCarro!=1){
      producto.cantidadCarro--;
    }
  }
  mas(producto:Producto){
    if (producto.cantidadCarro!=producto.stock){
      producto.cantidadCarro++;
    }
  }

  checkAgregados(){
    for (let i  in this.carrito){
      if (this.carrito[i].id==this.producto.id){
        this.producto.cantidadCarro=this.carrito[i].cantidadCarro;
        return
      }
    }
    this.producto.cantidadCarro=1;
  }

}
