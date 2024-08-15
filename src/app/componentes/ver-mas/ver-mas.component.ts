import { Component, OnInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { Producto } from 'src/app/clases/Producto';
import { ActivatedRoute, Params } from '@angular/router';
import { Articulo } from 'src/app/clases/Articulo';
import { ArticuloService } from 'src/app/servicios/articulo/articulo.service';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

declare let alertify: any;

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css'],
  providers: [MessageService]
})



export class VerMasComponent implements OnInit {

  constructor(
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private messageService: MessageService) { }



  items: MenuItem[] = [];
  home: MenuItem = { label: 'Articulos', routerLink: '/' };

  imagen = "";
  producto!: Articulo;
  id: number = 0;
  carrito!: Articulo[];
  imagenes: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  productosCarrito: any;
  url_imagen:string = environment.url_imagen;
  style: string = "";

  ngOnInit(): void {
    this.scrollTop();
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
      this.getArticuloId();
    })

  }

  buscarArticuloCarrito() {
    this.productosCarrito = this.carritoService.getProductos();
    this.producto.cantidadCarro = 1;
    let articuloCarrito: any = undefined;
    if (this.productosCarrito.length != 0) {
      this.productosCarrito.forEach((e: any) => {
        if (e.art_id == this.id) {
          articuloCarrito = e;
        }
      });
      if (articuloCarrito != undefined) {
        this.producto.cantidadCarro = articuloCarrito.cantidadCarro;
        this.producto.agregado = true;
      }
    }

  }
  getArticuloId() {
    this.articuloService.getArticuloId(this.id).subscribe(data => {
      this.producto = data;
      if (this.producto.fotos.length != 0) {
        this.imagen = this.url_imagen + this.producto.fotos[0].nombre;
      }
      this.items.push({ label: this.producto.art_cat.nombre, routerLink: '/productos/' + this.producto.art_cat.nombre })
      this.items.push({ label: this.producto.nombre, routerLink: '/ver-mas/' + this.producto.art_id })
      this.buscarArticuloCarrito();
    })
  }

  cambiarImagen(ruta: any) {
    this.imagen = this.url_imagen + ruta.nombre;
  }

  errorImagen(producto:Articulo){
    producto.errorImagen=true;
  }

  agregarProducto(producto: Articulo) {
    if (!producto.agregado) {
      if (this.carritoService.agregarProducto(producto)) {
        this.messageService.add({ severity: 'success', detail: 'Artículo agregado al carrito' });
      } else {
        this.messageService.add({ severity: 'error', detail: 'El artículo ya se encuentra en el carrito' });
      }
    } else {
      if (this.carritoService.actualizarCarrito(producto)) {
        this.messageService.add({ severity: 'success', detail: 'Cantidad actualizada' });
      }else{
        this.messageService.add({ severity: 'error', detail: 'Misma cantidad que el carrito' });
      }
    }

  }
  menos(producto: Articulo) {
    if (producto.cantidadCarro != 1) {
      producto.cantidadCarro--;
    }

  }
  mas(producto: Articulo) {
    if (producto.cantidadCarro != producto.stock) {
      producto.cantidadCarro++;
    }
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  cambiarCantidad(cantidad: number, producto: Producto) {
    console.log(cantidad);
    console.log(producto.cantidadCarro);

    if (cantidad > producto.stock) {
      console.log("si");
      producto.cantidadCarro = 1;
    }
    producto.cantidadCarro = cantidad;
  }

  // se usa mientras cambia, mientras tiene el foco y cuando lo pierde
  // se asegura que la cantidad no sea mayor a 99999 por mas que onInput lo limite a que no ingresa mas caracteres
  // es para que no agregue valores nulos, 0 o myores al limite
  // si esta agregado actualiza el valor del carrito
  lostFocus(cantidad: number, producto: Articulo) {

    if (cantidad == null || cantidad < 1 || cantidad > producto.stock) {
      this.producto.cantidadCarro = 1;
    } else {
      this.producto.cantidadCarro = cantidad;
    }
  }

  getImageSize(event: Event, foto: any): void {
    const imgElement = event.target as HTMLImageElement;
    const width = imgElement.width;
    const height = imgElement.height;
    if (width > height) {
      foto.style = "width:100px";
    } else {
      foto.style = "height:100px";
    }
  }

}
