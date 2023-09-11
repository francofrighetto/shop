import { Articulo } from "./Articulo";
import { Producto  } from "./Producto";
export class Carrito {
    productos : Articulo[];
    constructor(){
        this.productos=[];
    }

    agregarProducto(producto:Articulo){
        this.productos.push(producto);
    }
}
