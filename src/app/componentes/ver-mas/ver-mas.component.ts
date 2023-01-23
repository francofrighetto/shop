import { Component, OnInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { Producto } from 'src/app/clases/Producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  cantidadCarrito:number=1;
  // @Input() producto:any;
  producto!: Producto;
  id: number = 0;
  ngOnInit(): void {
    // console.log(this.route.snapshot.params['id'])
    this.route.params.subscribe((params: Params) => {
      this.id= parseInt(params['id']);
    })

    this.manejoJson.getProductos().subscribe(
      data => {
        this.producto = data.productos[this.id-1];
        this.imagen = "../../.." + this.producto.fotos[0];
        console.log(this.producto.fotos);
      }
    )
  }
  // imagen="../../../assets/img/producto2.jpg";

  cambiarImagen(ruta: any) {
    this.imagen = '../../..'+ruta;
  }
  agregarProducto(producto: Producto) {
    producto.cantidadCarro=this.cantidadCarrito;
    this.carritoService.agregarProducto(producto);
  }
  menos(producto:Producto){
    if (this.cantidadCarrito!=1){
      this.cantidadCarrito--;
    }
  }
  mas(producto:Producto){
    if (this.cantidadCarrito!=producto.stock){
      this.cantidadCarrito++;
    }
  }

}
