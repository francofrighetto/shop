import { Producto  } from "./Producto";
export class Carrito {
    productos : Producto[];
    constructor(){
        this.productos=[];
    }

    agregarProducto(producto:Producto){
        this.productos.push(producto);
    }
}