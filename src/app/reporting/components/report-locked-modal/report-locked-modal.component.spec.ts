import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { of, throwError } from "rxjs";
import { I2FAuthenticationData } from "../../interfaces/reports.interfaces";
import { ApiReportingService } from "../../services/api-reporting.service";
import { ReportLockedModalComponent } from "./report-locked-modal.component";

describe('Report Locaked MOdal Component', ()=>{
  let component: ReportLockedModalComponent;
  let fixture: ComponentFixture<ReportLockedModalComponent>;
  let router: Router;
  let service: ApiReportingService;
  let activeModal: NgbActiveModal;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ReportLockedModalComponent],
      providers: [ NgbActiveModal ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLockedModalComponent);
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

  it('should return "" when localstorage is empty',()=>{
    localStorage.clear();
    expect(component.getApiId).toBe('');
  })

  it('should change [mode] var to login if manager approval is true',()=>{
    expect(component.mode).toEqual('view');

    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: true,
            '2FARequired': false,
            favorite: false,
        }
    }

    component.ngOnInit();

    expect(component.mode).toEqual('login');
  })

  it('should change [mode] var to view if 2fa is true',()=>{
    expect(component.mode).toEqual('view');

    component.report = {
        id:'1',
        type: 'report',
        attributes: {
            managerApprovalRequired: false,
            '2FARequired': true,
            favorite: false,
        }
    }

    component.ngOnInit();
    expect(component.mode).toEqual('view');
  })

  it('should return apiId code stored in lcoal storage', ()=>{
    spyOn(service,'create2FAuthentication').and.returnValue(of({some2FAres:"123"}));
    spyOn(service,'createUsersOverride').and.returnValue(of({usersOverride: 'sample123'}))
    localStorage.setItem('apiKey','123123')
    component.sendCode(true);
  })

  it('should verify code and redirect if correct', ()=>{
    component.code = '123456';
    localStorage.setItem('reportsApiId','123')
    spyOn(service,'send2FAuthentication').and.returnValue(of({sampleRes: 'responce'}));
    spyOn(router,'navigate');
    component.verifyCode();

    expect(service.send2FAuthentication).toHaveBeenCalledWith({ 'APId': component.getApiId, '2FACode': '123456' });
    expect(router.navigate).toHaveBeenCalledWith(['/reports/1']);
  })

  it('should reset code and set isError to true on error', () => {
    const data: I2FAuthenticationData = { APId: 'apiId', '2FACode': 'code' };
    spyOn(service,'send2FAuthentication').and.returnValue(throwError('error'));
    component.verifyCode();
    expect(component.isError).toBeTrue();
    expect(component.code).toBe('');
  });

  it('should login', ()=>{
    component.username = 'user';
    component.password = '123';
    localStorage.setItem('reportsApiId','123');

    spyOn(service,'createUsersOverride').and.returnValue(of({usersOverride: 'sample'}))
    component.login();

    expect(service.createUsersOverride).toHaveBeenCalledWith({
        Username: 'user',
        Password: '123',
        apiID: '123'
    })
  })
})