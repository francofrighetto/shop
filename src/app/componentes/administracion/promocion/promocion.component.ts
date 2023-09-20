import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Promocion } from 'src/app/clases/Promocion';
import { PromocionService } from 'src/app/servicios/promocion/promocion.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  constructor(private promocionService:PromocionService) { }

  promociones?:Promocion[];
  promocion:Promocion=new Promocion;
  nuevo:boolean=true;

  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputDescuento: new FormControl(
      "", Validators.compose([Validators.required])
    )
  });

  ngOnInit(): void {
    this.resetPromocion();
  }

  getPromociones(){
    this.promocionService.getPromociones().subscribe(data=>{
      this.promociones=data;
    })
  }

  nuevaPromocion() {
    if (this.formRegister.valid) {
      console.log(this.promocion);
      this.promocionService.guardarPromocion(this.promocion).subscribe((data: any) => {
          this.resetPromocion();
          // this.mostrarAlerta("success", "Marca creada con éxito");
        })}

  }

  cancelar() {
    this.promocion = new Promocion;
    this.promocion.promo_habilitado = 1;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetPromocion() {
    this.getPromociones();
    this.cancelar();
  }

}
