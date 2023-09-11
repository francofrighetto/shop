import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto.component';
import { RouterModule } from '@angular/router';

const routes = [{path:'',component:ProductoComponent},
{path:'**',component:ProductoComponent}]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProductoModule { }
