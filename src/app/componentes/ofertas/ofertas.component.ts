import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/clases/Carrito';
import { OfertaService } from 'src/app/servicios/oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  constructor(private ofertaService: OfertaService) { }
  carrito:Carrito=new Carrito();
  ngOnInit(): void {
    console.log(this.ofertaService.getOfertas());

  }

}
