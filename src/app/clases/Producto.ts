import { Detalle } from "./Detalle";
export class Producto {
    nombre : string | undefined;
    stock! : number;
    precio!:number;
    descripcion! : string;
    fotos! : string[];
    detalle! : Detalle;
}