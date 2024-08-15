import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  newFile(file:any){
    return this.http.post(environment.url_api+endpoints.files+endpoints.upload,file);
  }

  viewFile(nombre:string){
    return this.http.get(environment.url_api+endpoints.files+endpoints.mostrar+"/"+nombre);
  }

  deleteFile(nombre:string){
    return this.http.delete(environment.url_api+endpoints.files+endpoints.deleteFile+"/"+nombre);
  }
}
