import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ReportDetailSettingsComponent } from "./report-detail-settings.component";

describe('ReportDetailSettingsComponent', () => {
    let component: ReportDetailSettingsComponent;
    let fixture: ComponentFixture<ReportDetailSettingsComponent>;
    let modalService: NgbModal;
    let activeModal: NgbActiveModal;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ ReportDetailSettingsComponent ],
        providers: [ NgbActiveModal ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ReportDetailSettingsComponent);
      component = fixture.componentInstance;
      activeModal = TestBed.inject(NgbActiveModal);
      modalService = TestBed.inject(NgbModal);
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have correct reportSettingsDetail input', () => {
      const testSettingsDetail = [
        {setting: '1'},
        {setting: ''},
      ];
      component.reportSettingsDetail = testSettingsDetail;
      expect(component.reportSettingsDetail).toEqual(testSettingsDetail);
    });
  
    it('should call close method of activeModal in reset method', () => {
      spyOn(activeModal, 'close');
      component.reset();
      expect(activeModal.close).toHaveBeenCalled();
    });
  
    it('should call close method of activeModal with reportSettingsDetail in save method', () => {
      spyOn(activeModal, 'close');
      component.save();
      expect(activeModal.close).toHaveBeenCalledWith(component.reportSettingsDetail);
    });
  });