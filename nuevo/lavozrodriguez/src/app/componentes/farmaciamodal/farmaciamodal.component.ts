import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-farmaciamodal',
  templateUrl: './farmaciamodal.component.html',
  styleUrls: ['./farmaciamodal.component.css']
})
export class FarmaciamodalComponent {

  constructor(public dialogRef: MatDialogRef<FarmaciamodalComponent>) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
