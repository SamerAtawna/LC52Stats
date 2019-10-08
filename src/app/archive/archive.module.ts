import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArchivePage } from './archive.page';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgGridModule } from 'ag-grid-angular';



const routes: Routes = [
  {
    path: '',
    component: ArchivePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    IonicModule,
    NgxDatatableModule,
    MatSortModule,
    AgGridModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArchivePage]
})
export class ArchivePageModule {}
