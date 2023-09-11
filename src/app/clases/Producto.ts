import { Detalle } from "./Detalle";
export class Producto {
    id! : number;
    nombre : string | undefined;
    stock! : number;
    precio!:number;
    descripcion! : string;
    fotos! : string[];
    detalle! : Detalle;
    cantidadCarro!:number;
    descuento!:number;
}
