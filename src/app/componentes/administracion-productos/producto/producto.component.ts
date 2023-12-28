import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Articulo } from 'src/app/clases/Articulo';
import { Categoria } from 'src/app/clases/Categoria';
import { Promocion } from 'src/app/clases/Promocion';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [MessageService]
})
export class ProductoComponent implements OnInit {

  categorias!: Categoria[];
  filesPrev: any = [];
  nuevo?: boolean;
  producto!: Articulo;

  promociones: Promocion[] = [];


  constructor(
    private categoriaService: CategoriaService,
    private articuloService: ArticuloService,
    private rutaActiva: ActivatedRoute,
    private messageService: MessageService,
    private router:Router ) { }

  ngOnInit(): void {
    this.getArticulo();
    this.getCategorias();
  }

  getArticulo() {
    const id = this.rutaActiva.snapshot.params["id"];
    if (id == "nuevo") {
      this.producto = new Articulo;
      this.producto.artHabilitado = 1;
      this.nuevo = true;
    }
    if (id != undefined && id != "nuevo") {
      this.nuevo = false;
      this.articuloService.getArticuloId(id).subscribe(
        data => {
          this.producto = data;
        }
      )
    }
  }

  nuevoArticulo() {
    this.articuloService.guardarArticulo(this.producto).subscribe(data => {
      if (data.status) {
        this.messageService.add({ severity: 'success', detail: 'Artículo creado' });
        this.router.navigate(['/abmProductos']);
      }else{
        this.messageService.add({ severity: 'error', detail: 'Artículo creado' });
      }
    })
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }


  alertaExito(mensaje: string) {
    Swal.fire(
      'Artículo',
      mensaje,
      'success'
    );
  }

  alertaError(mensaje: string) {
    Swal.fire(
      'Artículo',
      mensaje,
      'error'
    );
  }

}
