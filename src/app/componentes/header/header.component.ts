import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  carrito:any;
  cantCarrito:number=0;

  ngOnInit(): void {
    this.calcTamañoCarrito();
  }

  calcTamañoCarrito():void {
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    this.cantCarrito = this.carrito.length;
  }

}
