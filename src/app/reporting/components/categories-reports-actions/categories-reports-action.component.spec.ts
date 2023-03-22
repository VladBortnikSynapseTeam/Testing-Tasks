import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { IReport } from "../../interfaces/reports.interfaces";
import { ApiReportingService } from "../../services/api-reporting.service";
import { CategoriesReportsActionsComponent } from "./categories-reports-actions.component";

describe('Categories Reports Action Component', ()=>{
    let component: CategoriesReportsActionsComponent;
    let fixture: ComponentFixture<CategoriesReportsActionsComponent>;
    let service: ApiReportingService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ CategoriesReportsActionsComponent ],
        imports: [HttpClientTestingModule],
        providers: [  ApiReportingService ]
      })
      .compileComponents();
      service = TestBed.inject(ApiReportingService);
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CategoriesReportsActionsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should subscribe on get reports with favourite and not',()=>{
        let mockLastViewed: IReport[] = [
            {
                id: '1',
                type: 'report',
                attributes: {
                    lastViewedTime: '111222333',
                    favorite: true,
                }
            }
        ];

        let mockfavorite: IReport[] = [
            {
                id: '1',
                type: 'report',
                attributes: {
                    favorite: true,
                    lastViewedTime: '111222333',
                }
            }
        ];
        expect(component.lastViewedReports).toEqual([]);
        expect(component.favoriteReports).toEqual([]);
        spyOn(service,'getCannedReports').and.returnValue(of(mockfavorite)).and.returnValue(of(mockLastViewed));
        component.ngOnInit();
        expect(component.lastViewedReports).toEqual(mockLastViewed);
        expect(component.favoriteReports).toEqual(mockfavorite);
    })
})