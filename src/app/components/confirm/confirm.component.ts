import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogContext
  ) {}

  public rowCount: number = 0;

  ngOnInit(): void {
    this.rowCount = this.data.rowCount;
  }
}

interface IConfirmDialogContext {
  rowCount: number;
}
