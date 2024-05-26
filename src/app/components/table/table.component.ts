import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { IClient } from 'src/app/models/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ClientsDataService } from 'src/app/services/data-service.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSource = new MatTableDataSource<IClient>([]);
  selection = new SelectionModel<IClient>(true, []);
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'empty',
  ];

  @ViewChild('matSort') sort?: MatSort;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  constructor(
    public dialog: MatDialog,
    private dataService: ClientsDataService
  ) {}

  ngAfterViewInit() {
    console.log(this.sort);
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataService.getClients();
    this.dataService.clients$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'add-client',
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.dataService.addClient(result);
    });
  }

  opedEditDialog() {
    setTimeout(() => {
      const el = this.selection.selected.pop();
      if (!el) return;
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '448px',
        height: '593px',
        data: el,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;
        this.dataService.editClient({ ...(result as IClient), id: el.id });
      });
      this.selection.clear();
    }, 5);
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '448px',
      height: '300px',
      panelClass: 'confirm-dialog',
      data: {
        rowCount: this.selection.selected.length,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.dataService.deleteClients(this.selection.selected);
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
