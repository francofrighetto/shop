import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ProductosSliderComponent } from './componentes/productos-slider/productos-slider.component';
import { ProductosListaComponent } from './componentes/productos-lista/productos-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ProductosCardComponent } from './componentes/productos-card/productos-card.component';
import { FormsModule } from '@angular/forms';
import { VerMasComponent } from './componentes/ver-mas/ver-mas.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';


const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'productos', component: ProductosCardComponent },
  {path: 'ver-mas/:id', component: VerMasComponent },
  {path: 'carrito', component: CarritoComponent },
  {path: 'ofertas', component: OfertasComponent },
  { path: '**', component: ProductosCardComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosSliderComponent,
    ProductosListaComponent,
    CarritoComponent,
    ProductosCardComponent,
    VerMasComponent,
    CategoriasComponent,
    OfertasComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports:[RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
