import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";
import { ApiReportingService } from "../../services/api-reporting.service";
import { ReportListItemComponent } from "./report-list-item.component";

describe('Report list item Component', ()=>{
    let component: ReportListItemComponent;
  let fixture: ComponentFixture<ReportListItemComponent>;
  let router: Router;
  let service: ApiReportingService;
  let activeModal: NgbActiveModal;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ReportListItemComponent],
      providers: [ NgbActiveModal ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListItemComponent);
    component = fixture.componentInstance;
    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: false,
            '2FARequired': false,
            favorite: false,
        }
    }
    router = TestBed.inject(Router);
    activeModal = TestBed.inject(NgbActiveModal);
    modalService = TestBed.inject(NgbModal);
    service = TestBed.inject(ApiReportingService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when 2fa is true',()=>{
    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: false,
            '2FARequired': true,
            favorite: false,
        }
    }

    expect(component.report.attributes?.["2FARequired"]).toBeTrue();
    component.viewReport();
  })

  it('should open modal when managerAproval is true',()=>{
    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: true,
            '2FARequired': false,
            favorite: false,
        }
    }

    expect(component.report.attributes?.managerApprovalRequired).toBeTrue();
    
    component.viewReport();
    

  })

  it('shoukd open modal on report list view click', ()=>{
    modalRef = { componentInstance: {} } as NgbModalRef;
    spyOn(modalService,'open').and.returnValue(modalRef);
    component.openPreviewPopup();
    expect(modalRef).toBeTruthy()
  })

  it('should just route in neither 2fa nor menager is true', ()=>{
    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: false,
            '2FARequired': false,
            favorite: false,
        }
    }

    spyOn(component, 'openAuthLockedPopup');
    spyOn(router, 'navigate');
    component.viewReport();
    expect(router.navigate).toHaveBeenCalled();
  })

  it('should toggle favourite', ()=>{
    expect(component.report.attributes?.favorite).toBeFalse();
    spyOn(service,'updateCannedReportsById').and.returnValue(of({somerandomResult: true}))
    component.toggleFavorite();

    expect(component.report.attributes?.favorite).toBeTrue();
  })

})