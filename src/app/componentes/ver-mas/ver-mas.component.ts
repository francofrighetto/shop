import { Component, OnInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';
import { Producto } from 'src/app/clases/Producto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css']
})
export class VerMasComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService, private carritoService:CarritoService,
    private productoService:ProductoService) { }
  // producto:any;
  imagen = "";
  // @Input() producto:any;
  producto!: Producto;
  ngOnInit(): void {
    this.producto = this.productoService.getProductoId(1);

    this.manejoJson.getProductos().subscribe(
      data => {
        this.producto = data.productos[0];
        this.imagen = "../../.." + this.producto.fotos[0];
      }
    )
  }
  // imagen="../../../assets/img/producto2.jpg";

  cambiarImagen(ruta: any) {
    this.imagen = ruta;
  }
  agregarProducto(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

}
