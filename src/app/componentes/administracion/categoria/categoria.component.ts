import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { Categoria } from 'src/app/clases/Categoria';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [MessageService]

})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private messageService: MessageService) { }

  categorias?: Categoria[];
  categoria!: Categoria;
  nuevo: boolean = true;

  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    )
  });

  ngOnInit(): void {
    this.resetCategoria();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    })
  }

  nuevaCategoria() {
    if (this.formRegister.valid) {
      this.categoriaService.guardarCategoria(this.categoria).subscribe((data: any) => {
        if (data.status) {
          this.resetCategoria();
          this.messageService.add({ severity: 'success', detail: 'Categoría creada' });
        } else {
          this.messageService.add({ severity: 'error', detail: 'Error al crear categoría' });
        }
      })
    }

  }

  eliminar(id:number){
    this.categoriaService.borrarCategoria(id).subscribe(data=>{
      if (data.status) {
        this.resetCategoria();
        this.messageService.add({ severity: 'success', detail: 'Categoría eliminada' });
      } else {
        this.messageService.add({ severity: 'error', detail: 'No se pudo eliminar la categoría' });
      }
    }, error => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });

    }
    )
  }

  cancelar() {
    this.categoria = new Categoria;
    this.categoria.cat_habilitado = true;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetCategoria() {
    this.getCategorias();
    this.cancelar();
  }

}
