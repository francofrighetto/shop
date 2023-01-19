import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService) { }
  productos: any;
  carrito: any;
  // @Output() public producto = new EventEmitter<any>();
  ngOnInit(): void {
    this.manejoJson.getProductos().subscribe(
      data => {
        this.productos = data.productos;
      }
    )
    if (localStorage.getItem("carrito") == undefined) {
      localStorage.setItem("carrito", "[]");
    }
  }
  agregar(producto: any) {
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let i in this.carrito) {
      console.log(this.carrito[i]);
      console.log(producto);
      console.log("-----------");

      if (this.carrito[i].nombre == producto.nombre) {
        return
      }
    }
    this.carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

}
