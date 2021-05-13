import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

const sharedModules = [
  CommonModule,
  CustomMaterialModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];

const sharedComponents = [
  FileUploadComponent
]


@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents
  ]
})
export class SharedModule { }
