import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/clases/Categoria';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
// import { MatIcon } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public carritoService:CarritoService,
    private categoriaService:CategoriaService ) {}

    categorias?:Categoria[];

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(data=>{
      this.categorias=data;
    })
  }

}
