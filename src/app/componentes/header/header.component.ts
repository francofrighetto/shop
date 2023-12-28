import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Categoria } from 'src/app/clases/Categoria';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public carritoService:CarritoService,
    private categoriaService:CategoriaService,
    private articuloService:ArticuloService,
    private router: Router ) {}
    myControl = new FormControl('');

    busqueda:string="";
    options: any[] = [];
    filteredOptions!: Observable<string[]>;
       categorias?:Categoria[];

  ngOnInit(): void {
    this.getCategorias();

  }


  getCategorias(){
    this.categoriaService.getCategorias().subscribe(data=>{
      this.categorias=data;
    })
  }

  buscar(){
    this.articuloService.buscarPorNombre(this.busqueda).subscribe(data=>{
      this.options = data;
    })
  }


  redirigir(){
    this.router.navigate(["/busqueda/"+this.busqueda]);
    this.busqueda="";
  }


}
