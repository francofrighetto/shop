import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService, private carritoService:CarritoService) { }
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
    
  }

}
