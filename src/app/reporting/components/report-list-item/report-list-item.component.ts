import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ICannedReportFavorite, IReport } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';
import { ReportLockedModalComponent } from '../report-locked-modal/report-locked-modal.component';
import { ReportPreviewComponent } from '../report-preview/report-preview.component';

@Component({
  selector: 'app-report-list-item',
  templateUrl: './report-list-item.component.html',
  styleUrls: ['./report-list-item.component.scss']
})
export class ReportListItemComponent implements OnInit, OnDestroy {
  @Input() report!: IReport;

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private apiReportingService: ApiReportingService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  viewReport(): void {
    if (this.report.attributes!['2FARequired'] || this.report.attributes?.managerApprovalRequired) {
      this.openAuthLockedPopup();
      return;
    }
    this.openAuthLockedPopup();
    this.router.navigate([`/reports/${this.report?.id}`]);
  }

  openPreviewPopup(): void {
    const modalRef = this.modalService.open(ReportPreviewComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
      });
    modalRef.componentInstance['report'] = this.report;
  }

  openAuthLockedPopup(): void {
    const modalRef = this.modalService.open(ReportLockedModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
      });
    modalRef.componentInstance['report'] = this.report;
  }

  public toggleFavorite(): void {
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
    this.apiReportingService.updateCannedReportsById(this.report.id!, reponse)
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
}
