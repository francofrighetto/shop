import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../producto/producto.component';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos.component';
import { FotoComponent } from '../foto/foto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'productoFoto/:id', component: FotoComponent },
  { path: '**', component: ListadoProductosComponent }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule],
})
export class ListadoProductosModule { }
