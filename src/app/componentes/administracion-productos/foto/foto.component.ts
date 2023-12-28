import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/clases/Articulo';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { FilesService } from 'src/app/servicios/files/files.service';
import { FotoService } from 'src/app/servicios/foto/foto.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css'],
  providers: [MessageService]

})
export class FotoComponent implements OnInit {
  selectedFiles?: FileList;
  photosArray: File[] = [];
  uploadedFiles: any[] = [];
  articulo!: Articulo;
  filesPrev: any = [];
  id?: number;
  url_imagen:string = environment.url_imagen;


  constructor(private fotoService: FotoService,
    private fileService: FilesService, private rutaActiva: ActivatedRoute,
    private articuloService: ArticuloService,
    private messageService: MessageService,
    private router:Router) { }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params["id"];
    this.getArticulo();
  }

  getArticulo() {
    if (this.id != undefined) {
      this.articuloService.getArticuloId(this.id).subscribe(data => {
        this.articulo = data;
      })
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles.item(i);
        if (file) {
          this.photosArray.push(file);
        }
      }
    }
  }


  uploadPhotos() {
    for (const photo of this.photosArray) {
      const formData = new FormData();
      formData.append('file', photo, photo.name);
      this.fileService.newFile(formData)
        .subscribe(
          (data: any) => {
            if (data.errortype == 0) {
                this.fotoService.nuevaFoto(this.articulo.art_id, data.message).subscribe(data => {
                  if (data.status){
                  this.messageService.add({ severity: 'success', detail: 'Foto subida' });
                  this.router.navigate(['/abmProductos']);

                  }
                  if (!data.status){
                    this.messageService.add({ severity: 'error', detail: 'Error al subir foto' });
                    }
                })
            }
          },
          error => {
            console.error('Error al subir fotos:', error);
          }
        );
    }
  }

}
