import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { of, sample } from "rxjs";
import { IIncludedReportDetail, IReport } from "../../interfaces/reports.interfaces";
import { ApiReportingService } from "../../services/api-reporting.service";
import { ReportDetailComponent } from "./report-detail.component";


describe('Report Detail',()=>{
    let component: ReportDetailComponent;
    let fixture: ComponentFixture<ReportDetailComponent>;
    let service: ApiReportingService;
    let activatedRoute: Partial<ActivatedRoute>;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule(
          {
              declarations: [ReportDetailComponent],
              imports: [RouterTestingModule,HttpClientTestingModule],
              providers: [ApiReportingService,
                {
                  provide: ActivatedRoute,
                  useValue: {
                    params: of({ id: '123' })
                  }
                },
                NgbModal
              ]
          }
      ).compileComponents();
      service = TestBed.inject(ApiReportingService);
      activatedRoute = TestBed.inject(ActivatedRoute);
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ReportDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create component', () => {
      expect(component).toBeDefined();
    });

    it('should hide manager approval after 5 sec', fakeAsync(()=>{
        component.ngOnInit();
        tick(4000);
        expect(component.managerNotification).toBe(true);
        tick(2000);
        expect(component.managerNotification).toBe(false);
    }))

    it('should get multiselect items', ()=>{
      let items = [
        {
          id: '1',
          attributes: {
            name: '1'
          },
          someOtherValue: '3'
        }
      ]
      let itemsRes = [
        {
          id: '1',
          name: '1'
        }
      ]
      component.getMultiselectItems(items);
      expect(component.getMultiselectItems(items)).toEqual(itemsRes);
    })

    it('shoudl toggle use last filters', ()=>{
      localStorage.clear();
      component.reportId = '1'
      component.toggleUseLastFilters();
      expect(component.useLastFilters).toBeTrue();
    })

    it('should toggle favorite icon and send data', () => {
      component.report = {
        id: '1',
        type: 'report',
        attributes: {
          favorite: false
        }
      }
      spyOn(service,'updateCannedReportsById').and.returnValue(of({test: '1'}))
      component.toggleFavorite();
      expect(component.report.attributes?.favorite).toEqual(true);
      
    })

    it('should reset filters', ()=>{
      component.useLastFilters = true;
      let result = {
        data: {
          sample: '1'
        },
        included: [
          {
            attributes: {
              name: 'sampleNAme',
              advanced: true,
              dataSource: '...123',
              dbDataType: 'date',
              lastUsedValue: 'sample,test'
            }
          },
          {
            attributes: {
              name: 'sampleNAme',
              advanced: true,
              dataSource: '...123',
              dbDataType: 'multipleChoice',
              defaultValue: 'sample,test',
              lastUsedValue: 'sample,test'
            }
          }
        ],
      }
  
      let mockData = [{data1: 'sample'}]

      spyOn(service,'getCannedReportById').and.returnValue(of(result));
      spyOn(service, 'getReportFieldData').withArgs('...123').and.returnValue(of(mockData));
      component.resetFilters();
      expect(component.reportId).toEqual('123')
    })

    it('should have no data source', ()=>{
      let result = {
        data: {
          sample: '1'
        },
        included: [
          {
            attributes: {
              name: 'sampleNAme',
            }
          }
        ],
      }
      let mockData = [{data1: 'sample'}]

      spyOn(service,'getCannedReportById').and.returnValue(of(result));
      spyOn(service, 'getReportFieldData').withArgs('123').and.returnValue(of(mockData));
      component.resetFilters();
      expect(component.reportId).toEqual('123')
    })

    it('should open settings popup', () => {
      component.report = {
        id: '1',
        type: 'report',
        attributes: {
          favorite: false
        }
      }

      let mockReport = {
        id: '1',
        type: 'report',
        attributes: {
          favorite: false
        }
      }
      component.openSettingsPopup();
      expect(component.report).toEqual(mockReport);
    })

    it('should execute report and update reportExportTable', () => {
      component.reportExportTable = [];
      component.reportId = '123';
      const response = { attributes: { data: { table: [{someData: '1'}] } } };
      spyOn(service,'createCannedReportExecute').and.returnValue(of(response));
      component.executeReport();
      expect(component.reportExportTable).toEqual([{someData: '1'}])
    });



})