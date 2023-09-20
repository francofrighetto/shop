import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Articulo } from 'src/app/clases/Articulo';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { ProductoComponent } from '../producto/producto.component';
import { Categoria } from 'src/app/clases/Categoria';
import Swal from 'sweetalert2';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})






export class ListadoProductosComponent {

   @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  articulos!:Articulo[];
  articulosNoHabilitados!:Articulo[];

  articuloSelec!:Articulo;
  open:boolean=false;


  constructor(private articuloService:ArticuloService,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this.articuloService.getArticulosHabilitados().subscribe(data=>{
      this.articulos=data;
    })
    this.articuloService.getArticulosNoHabilitados().subscribe(data=>{
      this.articulosNoHabilitados=data;
    })
  }



  eliminar(id:number){
    this.articuloService.cambioHabilitado(id).subscribe(data=>{
      if (data){
        this.getArticulos();
        this.openSnackBar();
      }else{
        this.alertaError(id);
      }
    });
  }

  alertaError(id:number){
    Swal.fire("Error","No se pudo eliminar el articulo "+id, 'error');
  }

  openSnackBar() {
    this._snackBar.open('Artículo eliminado', '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration:1500
    });
  }

}


