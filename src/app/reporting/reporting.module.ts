import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CategoriesComponent } from './containers/categories/categories.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { ReportDetailComponent } from './containers/report-detail/report-detail.component';
import { ReportListItemComponent } from './components/report-list-item/report-list-item.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { ReportsFiltersComponent } from './components/reports-filters/reports-filters.component';
import { CategoriesReportsActionsComponent } from './components/categories-reports-actions/categories-reports-actions.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
  NgbPopoverModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReportPreviewComponent } from './components/report-preview/report-preview.component';
import { ReportLockedModalComponent } from './components/report-locked-modal/report-locked-modal.component';
import { ReportDetailSettingsComponent } from './components/report-detail-settings/report-detail-settings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { ApiKeyInterceptor } from './services/api-key.interceptor';


@NgModule({
  declarations: [
    ReportingComponent,
    CategoriesComponent,
    ReportsComponent,
    ReportDetailComponent,
    ReportListItemComponent,
    CategoryItemComponent,
    ReportsFiltersComponent,
    CategoriesReportsActionsComponent,
    ReportPreviewComponent,
    ReportLockedModalComponent,
    ReportDetailSettingsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReportingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxMaterialTimepickerModule,
    NgbAlertModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  exports: [
    ReportingComponent,
    CategoriesComponent,
    ReportsComponent,
    ReportDetailComponent,
    ReportListItemComponent,
    CategoryItemComponent,
    ReportsFiltersComponent,
    CategoriesReportsActionsComponent,
    ReportDetailSettingsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
  ],
  bootstrap: [ReportingComponent]
})
export class ReportingModule { }
