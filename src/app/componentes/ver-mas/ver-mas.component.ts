import { Component, OnInit,  Input } from '@angular/core';
import { ManejoJsonService } from 'src/app/servicios/manejo-json.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css']
})
export class VerMasComponent implements OnInit {

  constructor(private manejoJson: ManejoJsonService ) { }
  // producto:any;
  imagen="";
  // @Input() producto:any;
  producto:any;
  ngOnInit(): void {
    this.manejoJson.getProductos().subscribe(
      data => {
        this.producto=data.productos[0];
    this.imagen = "../../.."+ this.producto.fotos[0];
console.log(this.producto);
      }
    )
  }
  // imagen="../../../assets/img/producto2.jpg";

  cambiarImagen(ruta:any){
    this.imagen=ruta;
  }
}
