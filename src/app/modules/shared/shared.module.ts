import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedModules = [
  CommonModule,
  CustomMaterialModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules
  ]
})
export class SharedModule { }
