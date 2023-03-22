import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { I2FAuthenticationData, IReport, IUserOverride } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';

@Component({
  selector: 'app-report-locked-modal',
  templateUrl: './report-locked-modal.component.html',
  styleUrls: ['./report-locked-modal.component.scss']
})
export class ReportLockedModalComponent implements OnInit, OnDestroy {
  @Input() report!: IReport;

  public code = '';
  public isError = false;

  public username = '';
  public password = '';
  public userEmail = 'test@mail.com'

  public mode: 'view' | 'code' | 'login' = 'view'; //show

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
    private apiReportingService: ApiReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.report.attributes?.managerApprovalRequired) {
      this.mode = 'login';
    }
    else if (this.report.attributes?.['2FARequired']) {
      this.mode = 'view';
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  get getApiId(): string {
    return (localStorage.getItem('reportsApiId') || ''); 
  }

  sendCode(isResend?: boolean): void {
    const data = {
      'apiID': this.getApiId
    };
    this.apiReportingService.create2FAuthentication(data)
    .pipe(takeUntil(this.destroyComponent$))
    .subscribe(response => {
      console.log(`2FA REQUEST RESULT ${response}`)
    })
    if (isResend) {
      this.isError = false;
    }
    this.apiReportingService.createUsersOverride(null)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (data) => {
          this.mode = 'code';
        }
      );
    
    this.mode = 'code';
  }

  verifyCode(): void {
    const data: I2FAuthenticationData = {
      'APId': this.getApiId,
      '2FACode': this.code,
    };
    this.apiReportingService.send2FAuthentication(data)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (data) => {
          this.router.navigate([`/reports/${this.report?.id}`])
        },
        (error) => {
          this.isError = true;
          this.code = '';
        }
      );
  }

  login(): void {
    const data: IUserOverride = {
      Username: this.username,
      Password: this.password,
      apiID: this.getApiId,
    };
    
    this.apiReportingService.createUsersOverride(data)
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (data) => {
          console.log(data,'user-login data');
          //this.router.navigate([`/reports/${this.report?.id}`])
          this.activeModal.dismiss();
        },
        (error) => {

        }
      );
    // login
    // console.log('Username, ', this.username);
    // console.log('Password, ', this.password);
    // this.activeModal.dismiss();
  }

}
