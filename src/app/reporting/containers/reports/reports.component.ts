import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IFilter, IHttpParamData, IReport } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  public reports: {
    reports: IReport[],
    reportCategoryId?: string;
    reportCategoryName?: string;
  }[] = [];
  public reportCategoryId = '';

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private apiReportingService: ApiReportingService,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((queryParams: Params) => {
        this.reportCategoryId = queryParams['reportCategoryId'] || '';
        let params: IHttpParamData[] = this.parseQueryParamsToHttpParams(queryParams);
        this.getReports(params);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  public sortReports(sort: boolean): void {
    this.reports = this.reports.map(r => {
      r.reports = r.reports.sort(
        (a: IReport, b: IReport) => (sort ? b : a).attributes!.name!.localeCompare((sort ? a : b).attributes!.name!)
      );
      return r;
    });
  }

  public changedParams(params: IFilter): void {
    console.log(params);
    console.log('reports filters');
    const httpParams = this.parseQueryParamsToHttpParams(params);
    this.getReports(httpParams);
  }

  public getReports(params: IHttpParamData[]): void {
    this.apiReportingService.getCannedReports(params)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(reports => {
        this.reports = [];
        reports.forEach(report => {
          const index = this.reports.findIndex(r => r.reportCategoryId === report.attributes?.reportCategoryId);
          if (index < 0) {
            this.reports.push({
              reportCategoryId: report.attributes?.reportCategoryId!,
              reportCategoryName: report.attributes?.reportCategoryName!,
              reports: [report]
            })
          } else {
            this.reports[index].reports.push(report)
          }
        });
        console.log(this.reports);
      });
  }

  private parseQueryParamsToHttpParams(params: IFilter): IHttpParamData[] {
    const httpParams: IHttpParamData[] = [];

    if(params.searchText) {
      httpParams.push({key: 'filters.searchText', value: params.searchText})
    }

    if(params.filter?.length) {
      params.filter.forEach((filter: number) => {
        if(filter === 1) {
          httpParams.push({key: 'sort', value: 'lastViewedTime'})
        }
        if(filter === 2) {
          httpParams.push({key: 'filters.favorite', value: 'true'})
        }
      })
    } 

    if(this.reportCategoryId) {
      httpParams.push({key: 'reportCategoryId', value: this.reportCategoryId})
    }
    return httpParams;
  }
}
