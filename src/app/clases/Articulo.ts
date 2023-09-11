import { Categoria } from "./Categoria";
import { Detalle } from "./Detalle";

export class Articulo{

  art_id!:number;
  art_codigo!: number;
  art_subcod?:number;
  art_habilitado!:number;
  art_nombre!:string;
  art_stock!:number;
  art_precio_compra!:number;
  art_precio_venta!:number;
  art_descr!:string;
  art_cat!:number;
  categoria?:Categoria;
;
  // fotos?:any;
  fotos! : any[];




  id! : number;
  nombre : string | undefined;
  stock! : number;
  precio!:number;
  descripcion! : string;
  cantidadCarro!:number;
  descuento!:number;
  detalle! : Detalle;

}

