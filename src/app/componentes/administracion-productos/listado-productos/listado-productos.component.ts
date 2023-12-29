import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from 'src/app/clases/Articulo';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Page } from 'src/app/clases/Page';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})


export class ListadoProductosComponent {

  articulos!: Articulo[];
  articulosNoHabilitados!: Articulo[];

  articuloSelec!: Articulo;
  open: boolean = false;

  // paginado
  pageNumberHabilitados: number = 0;
  pageNumberNoHabilitados: number = 0;

  pageSizeHabilitados: number = 20;
  pageSizeNoHabilitados: number = 20;

  totalItemsHabilitados?: number;
  totalItemsNoHabilitados?: number;



  constructor(private articuloService: ArticuloService,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getArticulosHabilitadosPag();
    this.getArticulosNoHabilitadosPag();

  }

  getArticulos() {
    this.articuloService.getArticulosHabilitados().subscribe(data => {
      this.articulos = data;
    })
    this.articuloService.getArticulosNoHabilitados().subscribe(data => {
      this.articulosNoHabilitados = data;
    })
  }

  getArticulosHabilitadosPag() {
    this.articuloService.getArticulosHabilitadosPag(this.pageNumberHabilitados, this.pageSizeHabilitados).subscribe((data: Page) => {
      this.articulos = data.contenido;
      this.totalItemsHabilitados = data.totalRegistros;
    })
  }
  getArticulosNoHabilitadosPag() {
    this.articuloService.getArticulosNoHabilitadosPag(this.pageNumberNoHabilitados, this.pageSizeNoHabilitados).subscribe((data: Page) => {
      this.articulosNoHabilitados = data.contenido;
      this.totalItemsNoHabilitados = data.totalRegistros;
    })
  }


  eliminar(id: number) {
    this.articuloService.cambioHabilitado(id).subscribe(data => {
      if (data) {
        this.getArticulos();
        this.openSnackBar();
      } else {
        this.alertaError(id);
      }
    });
  }

  alertaError(id: number) {
    Swal.fire("Error", "No se pudo eliminar el articulo " + id, 'error');
  }

  openSnackBar() {
    this._snackBar.open('Artículo eliminado', '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 1500
    });
  }

  onPageChangeHabilitados(event: any) {
    this.pageNumberHabilitados = event.pageIndex;
    this.getArticulosHabilitadosPag();

  }
  onPageChangeNoHabilitados(event: any) {
    this.pageNumberNoHabilitados = event.pageIndex;
    this.getArticulosNoHabilitadosPag();

  }

}


