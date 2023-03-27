import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, of, Subject, takeUntil } from 'rxjs';
import { ReportDetailSettingsComponent } from '../../components/report-detail-settings/report-detail-settings.component';
import { ICannedReportFavorite, IIncludedReportDetail, IReport } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';
import { LastFiltersService } from '../../services/last-filters.service';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  public report!: IReport;

  public saveTypes = [
    { name: 'Excel', type: 'xls' },
    { name: 'PDF', type: 'pdf' },
    { name: 'CSV', type: 'csv' },
  ];

  public selectLists: any = {
    businessArea: [],
    venue: [],
  };
  public reportId!: string;
  public useLastFilters: boolean = false;
  public managerNotification: boolean = true;

  public reportDetailExecuteData: any[] = [];
  public reportSettingsDetail: any[] = [];
  public reportExportTable?: any[];

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    private modalService: NgbModal,
    private apiReportingService: ApiReportingService,
    private route: ActivatedRoute,
    private lastFiltersService: LastFiltersService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.managerNotification = false;
    },5000)
    this.route.params
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((params: Params) => {
        console.log(params);
        if (params['id']) {
          this.reportId = params['id'];
          this.useLastFilters = this.lastFiltersService.getReportFilterState(this.reportId);
          this.getReportById(params['id']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  public getMultiselectItems(items: any[]): any {
    return items.map(i => {
      return {
        id: i.id,
        name: i.attributes.name
      }
    })
  }

  public toggleUseLastFilters(): void {
    this.useLastFilters = this.lastFiltersService.updateLastFilterStateById(this.reportId);
  }

  public toggleFavorite(): void {
    console.log(this.report,"this.report ====");
    this.report.attributes!.favorite = !this.report.attributes!.favorite;

    const reponse: ICannedReportFavorite = {
      data: {
        id: this.report.id!,
        type: 'report',
        attributes: {
          favorite: this.report.attributes!.favorite
        }
      }
    }
    this.apiReportingService.updateCannedReportsById(this.report.id, reponse)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (result) => {
          console.log(result);
        },
        (err) => {
          this.report.attributes!.favorite = !this.report.attributes!.favorite;
        }
      );
  }

  public resetFilters(): void {
    this.getReportById(this.reportId);
  }

  public openSettingsPopup(): void {
    const modalRef = this.modalService.open(ReportDetailSettingsComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
      });
    modalRef.componentInstance['reportSettingsDetail'] = this.reportSettingsDetail;
    modalRef.componentInstance['reportName'] = this.report.attributes?.name;
    modalRef.result.then(
      (data) => {
        this.reportSettingsDetail = data;
        this.getReportSectionData(data);
      }
    );
  }

  public executeReport(): void {
    const executeReportData = this.getExecuteReportData();
    // const executeReportData = {};
    this.apiReportingService.createCannedReportExecute(this.reportId, executeReportData)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (response) => {
          console.log(response);
          this.reportExportTable = response.attributes.data.table;
        }
      )
  }

  private getReportById(id: string): void {
    this.apiReportingService.getCannedReportById(id)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (report) => {
          console.log(report);
          // WIP: need some changes by response
          this.report = report.data;
          this.reportSettingsDetail = report.included;
          this.getSelectsData(report.included);
          this.executeReport();
        }
      )
  }

  private getReportSectionData(data: IIncludedReportDetail[]): void {
    console.log(data, 'data =====')
    let basicData: any[] = [];
    let advancedData: any[] = [];
    this.reportDetailExecuteData = [];

    data.forEach(item => {
      (item.attributes.advanced) ?
        advancedData.push({ ...item, attributes: {
          ...item.attributes,
          value: this.generateAttributesDataByType(item)
        }}) :
        basicData.push({ ...item, attributes: {
          ...item.attributes,
          value: this.generateAttributesDataByType(item)
        }});
    });

    // Need type
    basicData.sort((a: any, b: any) => a.attributes.sequence - b.attributes.sequence);
    // Need type
    advancedData.sort((a: any, b: any) => a.attributes.sequence - b.attributes.sequence);

    this.reportDetailExecuteData = [
      { data: basicData, title: 'Basic Filters', isBasic: true },
      { data: advancedData, title: 'Advanced', isBasic: false }
    ];
  }

  private generateAttributesDataByType(item: any): any {
    // WIP: need some changes by response
    return this.useLastFilters ?
      this.getTypeValue(item.attributes.lastUsedValue, item.attributes.dbDataType) :
      this.getTypeValue(item.attributes.defaultvalue, item.attributes.dbDataType)
  }
  
  private getTypeValue(value: any, dbDataType: string): string {
    return (dbDataType === 'date') ?
      new Date(value) :
      dbDataType === 'multipleChoice' ?
      value.split(',') :
      value;
  }

  // Need type
  private getExecuteReportData(): any {
    return {
      data: {
        type: 'report',
        id: `${this.reportId}`,
        attributes: {
          dataSource: "O3ReportPaymentsReceived"
        },
        relationships: {
          parameterFields: {
            data: this.reportSettingsDetail.map((report) => {
              return {
                id: report.id,
                type: 'reportParameterField'
              }
            })
          }
        },
      },
      included: [
        {
          data: this.getData()
        }
      ]
    }
  }

  // Need type
  private getData(): any[] {
    const data: any[] = []; // Need type
    this.reportDetailExecuteData.forEach(
      (detail) => {
        console.log(detail);
        detail.data.forEach(
          (d: any) => {
            data.push({
              id: d.id,
              type: 'reportParameterField',
              attributes: {
                value: d.attributes.value
              }
            })
          }
        )
      }
    )
    return data;
  }
  
  private getSelectsData(reportItems: any[]): void {
    console.log(reportItems,'REPORT ITEMS')
    const requests: { key: string, method: Observable<any> }[] = [];
    reportItems.forEach(field => {
      if (field.attributes.dataSource) {
        requests.push({
          key: field.attributes.name,
          method: this.apiReportingService.getReportFieldData(field.attributes.dataSource)
        })
      }
    });
    if (requests.length) {
      forkJoin(requests.map(r => r.method))
        .pipe(takeUntil(this.destroyComponent$))
        .subscribe(
          (data) => {
            requests.forEach((r, index) => {
              this.selectLists[r.key] = data[index];
            });
            this.getReportSectionData(reportItems);
          }
        );
    } else {
      this.getReportSectionData(reportItems);
    }
  }
}
