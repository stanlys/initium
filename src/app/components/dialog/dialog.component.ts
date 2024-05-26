import { Component, Inject, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IClient } from 'src/app/models/interfaces';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public caption = 'Новый клиент';

  public minLength = MIN_LENGTH;

  private fb = inject(FormBuilder);

  constructor(
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IClient
  ) {}

  public client = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.pattern(
          /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/gm
        ),
      ],
    ],
    surname: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
  });

  ngOnInit(): void {
    if (this.data) {
      this.client.setValue({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone || '',
        surname: this.data.surname,
      });
      this.caption = 'Редактирование';
    }
  }

  cancel(): void {
    this.dialogRef.closeAll();
  }

  ok(): void {
    console.log(this.client);
    if (this.client.valid) {
      console.log('close');
      // this.dialogRef.closeAll('ddd');
    } else {
      this.client.markAllAsTouched();
    }
  }

  getErrorMessage(): string {
    return '';
  }
}

const MIN_LENGTH = 2;
