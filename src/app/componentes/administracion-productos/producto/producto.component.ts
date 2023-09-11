import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Articulo } from 'src/app/clases/Articulo';
import { Categoria } from 'src/app/clases/Categoria';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { FotoService } from 'src/app/servicios/foto/foto.service';
import { FtpService } from 'src/app/servicios/ftp/ftp.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  categorias!: Categoria[];
  uploadedFiles: any[] = [];
  filesPrev: any = [];
  nuevo?: boolean;
  producto!: Articulo;


  constructor(
    private categoriaService: CategoriaService,
    private articuloService: ArticuloService,
    private http: HttpClient,
    private fotoService: FotoService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private ftpService:FtpService) { }

  ngOnInit(): void {
    this.getArticulo();
    this.getCategorias();
  }

  getArticulo() {
    const id = this.rutaActiva.snapshot.params["id"];
    if (id == "nuevo") {
      this.producto = new Articulo;
      this.producto.art_habilitado = 1;
      this.nuevo = true;
    }
    if (id != undefined && id !="nuevo") {
      this.nuevo = false;
      this.articuloService.getArticuloId(id).subscribe(
        data => {
          this.producto = data;
        }
      )
    }
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  selectedFile!: File;

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    this.uploadedFiles.push(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.filesPrev.push(reader.result as string);
    };
    reader.readAsDataURL(file);
    this.filesPrev.push()
  }


  onUpload() {
    if (this.nuevo) {
      this.articuloService.guardarArticulo(this.producto).subscribe(
        data => {
          if (data.exito) {
            this.producto.art_id = data.id;
            console.log(this.producto.art_id);
            console.log(data);

            console.log(this.uploadedFiles);

            for (let foto of this.uploadedFiles){
              const formData = new FormData();
              formData.append('file', foto);
              this.ftpService.subirFoto(formData).subscribe(
                (data:any) => {
                  if (data.status){
                  alert('Archivo subido exitosamente!');
                  this.subirFotBD(data);
                  }else{
                  alert('Error al subir el archivo. (status)');
                  }
                },
                err => {
                  if (err.status){
                    this.subirFotBD(err.error.text);
                    }else{
                    alert('Error al subir el archivo. (status)');
                    }
                }
              );
              }
            this.alertaExito('El artículo se cargo con éxito.');
            this.router.navigate(['abmProductos']);
          } else {
            this.alertaError('El artículo no se pudo crear.');
          }
        })
    } else {
      this.articuloService.editarArticulo(this.producto).subscribe(
        data => {
          if (data) {
            this.alertaExito('El artículo se modificó con éxito.');
            this.router.navigate(['abmProductos']);
          } else {
            this.alertaError('El artículo no se pudo modificar.');
          }
        })
    }
  }

  subirFotBD(url: any) {
    console.log(this.producto.art_id);
    this.fotoService.nuevaFoto(this.producto.art_id, url).subscribe(
      data => {
      })
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
