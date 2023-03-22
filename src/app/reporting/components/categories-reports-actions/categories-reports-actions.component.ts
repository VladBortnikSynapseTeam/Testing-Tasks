import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import SwiperCore, { Pagination, Navigation } from "swiper";
import { IHttpParamData } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-categories-reports-actions',
  templateUrl: './categories-reports-actions.component.html',
  styleUrls: ['./categories-reports-actions.component.scss']
})
export class CategoriesReportsActionsComponent implements OnInit {
  public lastViewedReports: any[] = [];
  public favoriteReports: any[] = [];

  private destroyComponent$ = new Subject<boolean>();
  private requestParams: IHttpParamData[] = [
    { key: 'page.number', value: '1' },
    { key: 'page.size', value: '3' },
    { key: 'sort', value: 'lastViewedTime' },
    { key: 'fields', value: 'name,description,lastviewedTime,thumbnailURL,favorite' },
  ];

  constructor(
    private apiReportingService: ApiReportingService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.apiReportingService.getCannedReports(this.requestParams),
      this.apiReportingService.getCannedReports([
        ...this.requestParams,
        { key: 'filters.favorite', value: 'true' }
      ])
    )
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        ([lastViewedReports, favoritesReports]) => {
          this.lastViewedReports = lastViewedReports;
          this.favoriteReports = favoritesReports;
        });
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

}
