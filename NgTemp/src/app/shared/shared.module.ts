import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NotFound404Component
  ],
  imports: [
    CommonModule,
    //!Importamos el módulo ReactiveFormsModule para poder usar los formularios reactivos
    ReactiveFormsModule
  ],
  //!Exportamos el módulo ReactiveFormsModule para poder usar los formularios reactivos en cualquier módulo que importe este módulo SharedModule
  exports:[ReactiveFormsModule]
})
export class SharedModule { }
