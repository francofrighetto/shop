import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  formatearTotal(total:any):string{
    let entero;
    let decimas;
    total = total.toString();
    try{
    total = total.split(".");
    entero = total[0];
    decimas = total[1];
  } catch{
    entero = total;
    }
    entero = entero.split("");

    entero = entero.reverse();

    let precioFormateado="";
    for (let i =0;i<entero.length;i++){
      if (i%3==0 && i!=0){
        precioFormateado+=".";
      }
      precioFormateado+=entero[i];
      
    }
    entero = precioFormateado.split("");
    entero = entero.reverse();
    entero = entero.join("");


    if (decimas != undefined) {
      decimas = decimas.split("");

      if (decimas.length == 1) {
        decimas = decimas[0] + "0";
      } else if (decimas.length >= 2) {
        decimas = decimas[0] + decimas[1];
      }
    }else{
      decimas="00";
    }
    return entero+","+decimas;
  }
}
