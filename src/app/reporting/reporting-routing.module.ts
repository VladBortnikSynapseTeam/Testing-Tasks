import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './containers/categories/categories.component';
import { ReportDetailComponent } from './containers/report-detail/report-detail.component';
import { ReportsComponent } from './containers/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
