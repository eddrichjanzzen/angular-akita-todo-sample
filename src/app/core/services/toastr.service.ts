import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private matSnackBar: MatSnackBar) { }

  open(displayMessage: string, buttonText: string): void {
    this.matSnackBar.open(displayMessage, buttonText, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
