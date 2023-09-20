import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/clases/Articulo';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { FotoService } from 'src/app/servicios/foto/foto.service';
import { FtpService } from 'src/app/servicios/ftp/ftp.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  selectedFiles?: FileList;
  photosArray: File[] = [];
  uploadedFiles: any[] = [];
  articulo!: Articulo;
  filesPrev: any = [];
  id?:number;

  constructor(private fotoService: FotoService,
    private ftpService: FtpService, private rutaActiva: ActivatedRoute,
    private articuloService:ArticuloService) { }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params["id"];
    this.getArticulo();
  }

  getArticulo(){
    if (this.id!=undefined){
      this.articuloService.getArticuloId(this.id).subscribe(data=>{
        this.articulo=data;
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
      formData.append('archivo', photo, photo.name);
      this.ftpService.subirFoto(formData)
        .subscribe(
          (data:any) => {
            if (data.status){
              this.fotoService.nuevaFoto(this.articulo.art_id,data.nombre).subscribe(data=>{
                console.log(data);
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
