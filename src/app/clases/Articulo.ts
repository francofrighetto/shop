import { Categoria } from "./Categoria";
import { Detalle } from "./Detalle";
import { Promocion } from "./Promocion";

export class Articulo{

  art_id!:number;
  codigo?: number;
  subcodigo?:number;
  artHabilitado?:number;
  nombre!:string;
  stock!:number;
  precioCompra!:number;
  precioVenta!:number;
  descripcion!:string;
  art_cat:Categoria=new Categoria;
  fotos! : any[];
  precio!:number;
  cantidadCarro:number=1;
  descuento!:number;
  detalle! : Detalle;
  id!:number;
  color?:string;
  unidadMedida?:string;
  promocion?:number;
  agregado:boolean=false;
  errorImagen:boolean=false;
}

