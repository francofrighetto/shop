import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from './foto.component';
import { RouterModule } from '@angular/router';



const routes = [{path:'',component:FotoComponent},
{path:'**',component:FotoComponent}]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class FotoModule { }
