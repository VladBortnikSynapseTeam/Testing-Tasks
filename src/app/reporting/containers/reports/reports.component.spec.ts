import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IReport } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';
import { ReportsComponent } from './reports.component';


describe('Reports Component', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let service: ApiReportingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(
        {
            declarations: [ReportsComponent],
            imports: [RouterTestingModule,HttpClientTestingModule],
            providers: [ApiReportingService]
        }
    ).compileComponents();
    service = TestBed.inject(ApiReportingService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should sort reports | sortReports()', () => {
    const reports: IReport[] = [
      {
        id: '1',
        type: 'report',
        attributes: {
            name: "A"
        }
      },
      {
        id: '2',
        type: 'report',
        attributes: {
            name: "B"
        }
      },{
        id: '3',
        type: 'report',
        attributes: {
            name: "C"
        }
      }
    ];
    component.reports = [{
        reports: reports
    }];
    component.sortReports(true);
    expect(component.reports[0].reports[0].attributes?.name).toBe('C');
    expect(component.reports[0].reports[1].attributes?.name).toBe('B');
    expect(component.reports[0].reports[2].attributes?.name).toBe('A');

    component.sortReports(false);
    expect(component.reports[0].reports[0].attributes?.name).toBe('A');
    expect(component.reports[0].reports[1].attributes?.name).toBe('B');
    expect(component.reports[0].reports[2].attributes?.name).toBe('C');
  });

  it('should get reprots on changed params', ()=>{
    let params = {
        searchText: 'some report',
        filter: [1,2],
        reportCategoryId: '2',
    }

    const reportsResponse: IReport[] = [
        {
            id: '1',
            type: 'report',
            attributes: {
                name: "A",
                reportCategoryId: '2'
            }
          },
          {
            id: '2',
            type: 'report',
            attributes: {
                name: "B",
                reportCategoryId: '2'
            }
          },{
            id: '3',
            type: 'report',
            attributes: {
                name: "C",
                reportCategoryId: '2'
            }
          }
    ]

    const reports: IReport[] = [
        {
          id: '1',
          type: 'report',
          attributes: {
              name: "A",
              reportCategoryId: '1'
          }
        },
        {
          id: '2',
          type: 'report',
          attributes: {
              name: "B",
              reportCategoryId: '2'
          }
        },{
          id: '3',
          type: 'report',
          attributes: {
              name: "C",
              reportCategoryId: '3'
          }
        }
      ];
    
    component.reports = [{
        reports: reports
    }]
    component.reportCategoryId = '2';
    spyOn(service,'getCannedReports').and.returnValue(of(reportsResponse))



    component.changedParams(params);
    expect(component.reports[0].reports).toEqual(reportsResponse)
  })
});






