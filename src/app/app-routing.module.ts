import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './reporting/containers/categories/categories.component';
import { ReportDetailComponent } from './reporting/containers/report-detail/report-detail.component';
import { ReportsComponent } from './reporting/containers/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'reports/:id',
    component: ReportDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
