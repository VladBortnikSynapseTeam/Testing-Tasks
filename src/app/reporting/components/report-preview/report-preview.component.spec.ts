import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ApiReportingService } from "../../services/api-reporting.service";
import { ReportPreviewComponent } from "./report-preview.component";

describe('Report Preview Component',()=>{
  let component: ReportPreviewComponent;
  let fixture: ComponentFixture<ReportPreviewComponent>;
  let router: Router;
  let activeModal: NgbActiveModal;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ReportPreviewComponent],
      providers: [ NgbActiveModal ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPreviewComponent);
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

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open auth locaked popup', ()=>{
    modalRef = { componentInstance: {} } as NgbModalRef;
    spyOn(modalService,'open').and.returnValue(modalRef);
    component.openAuthLockedPopup();
    expect(modalRef).toBeTruthy()
  })

  it('should view report and redirect',()=>{
    component.report.id = '1';
    spyOn(router,'navigate');
    component.viewReport();
    expect(router.navigate).toHaveBeenCalledWith([`/reports/1`]);
  })

  it('should toggle full screen', () => {
    let testEl = document.createElement('div');
    testEl.classList.add('modal-dialog');
    document.body.append(testEl);
    console.log(testEl,'HTML ELEMENT')
    component.toggleFullScreen();
    expect(component.isFullied).toBe(true);
    expect(testEl.classList.contains('full-screen')).toBe(true);
    component.toggleFullScreen();
    expect(component.isFullied).toBe(false);
    expect(testEl.classList.contains('full-screen')).toBe(false);
  });
})