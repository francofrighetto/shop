import { Component, OnInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { Producto } from 'src/app/clases/Producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Carrito } from 'src/app/clases/Carrito';
import { Articulo } from 'src/app/clases/Articulo';

declare let alertify: any;

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
  producto!: Articulo;
  id: number = 0;
  carrito!:Articulo[];




  ngOnInit(): void {
    this.scrollTop();
    this.route.params.subscribe((params: Params) => {
      this.id= parseInt(params['id']);
    })

    this.manejoJson.getProductos().subscribe(
      data => {
        if (this.route.snapshot.url[0].path=="oferta"){
          this.producto = data.ofertas[this.id-1];
        }else {
          this.producto = data.productos[this.id-1];
      }
        // this.producto = data.productos[this.id-1];
        this.imagen = "../../.." + this.producto.fotos[0];
        // this.producto.cantidadCarro = this.producto.cantidadCarro;
        this.checkAgregados();
        console.log(this.producto);
      }
    )

    this.carrito = this.carritoService.getProductos();

  }
  // imagen="../../../assets/img/producto2.jpg";

  cambiarImagen(ruta: any) {
    this.imagen = '../../..'+ruta;
  }
  agregarProducto(producto: Articulo) {
    // producto.cantidadCarro=this.cantidadCarro;
    // producto.cantidad=this.cantidadCarro;
    this.carritoService.agregarProducto(producto);
  }
  menos(producto:Articulo){
    if (producto.cantidadCarro!=1){
      producto.cantidadCarro--;
    }
    this.carritoService.actualizarCarrito(producto);

  }
  mas(producto:Articulo){
    if (producto.cantidadCarro!=producto.stock){
      producto.cantidadCarro++;
    }
    this.carritoService.actualizarCarrito(producto);

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

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  cambiarCantidad(cantidad: number, producto:Producto) {
    console.log(cantidad);
    console.log(producto.cantidadCarro);

    if (cantidad > producto.stock) {
      console.log("si");
      producto.cantidadCarro=1;
    }
    producto.cantidadCarro = cantidad;
  }

  // se usa mientras cambia, mientras tiene el foco y cuando lo pierde
  // se asegura que la cantidad no sea mayor a 99999 por mas que onInput lo limite a que no ingresa mas caracteres
  // es para que no agregue valores nulos, 0 o myores al limite
  // si esta agregado actualiza el valor del carrito
  lostFocus(cantidad:number, producto:Articulo){

    if (cantidad == null || cantidad < 1 || cantidad > producto.stock) {
      this.producto.cantidadCarro = 1;
    } else {
      this.producto.cantidadCarro = cantidad;
    }
  }

}
