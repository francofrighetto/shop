import { Component, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
// import { MatIcon } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public carritoService:CarritoService ) {}
  // @ViewChild('arrow_back', { static: false }) favorito: MatIcon;

  ngOnInit(): void {
  }

}
