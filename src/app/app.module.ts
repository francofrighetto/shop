import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ProductosListaComponent } from './componentes/productos-lista/productos-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ProductosCardComponent } from './componentes/productos-card/productos-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerMasComponent } from './componentes/ver-mas/ver-mas.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';
import {MatIconModule} from '@angular/material/icon';
import { ListadoProductosComponent } from './componentes/administracion-productos/listado-productos/listado-productos.component';
import { ProductoComponent } from './componentes/administracion-productos/producto/producto.component'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {FileUploadModule} from 'primeng/fileupload';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FotoComponent } from './componentes/administracion-productos/foto/foto.component';
import { PromocionComponent } from './componentes/administracion/promocion/promocion.component';
import { CategoriaComponent } from './componentes/administracion/categoria/categoria.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'productos/:idCategoria', component: ProductosCardComponent },
  {path: 'ver-mas/:id', component: VerMasComponent },
  {path: 'carrito', component: CarritoComponent },
  {path: 'ofertas', component: OfertasComponent },
  {path: 'abmProductos', component: ListadoProductosComponent },
  {path: 'abmProductos/producto/:id', component: ProductoComponent },
  {path: 'abmProductos/producto/nuevo', component: ProductoComponent },
  {path: 'abmProductos/productoFoto/:id', component: FotoComponent },
  {path: 'administracion/promocion', component: PromocionComponent },
  {path: 'administracion/categoria', component: CategoriaComponent },
  { path: 'productos', component: ProductosCardComponent },
  { path: '**', redirectTo:'productos' }
];

registerLocaleData(localeEs, 'es-AR');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosListaComponent,
    CarritoComponent,
    ProductosCardComponent,
    VerMasComponent,
    CategoriasComponent,
    OfertasComponent,
    ListadoProductosComponent,
    ProductoComponent,
    PresentacionComponent,
    FotoComponent,
    PromocionComponent,
    CategoriaComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    GalleriaModule,
    TableModule,
    ToastModule
  ],
  providers: [],
  exports:[RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
