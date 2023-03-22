import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IReport } from '../../interfaces/reports.interfaces';
import { ReportLockedModalComponent } from '../report-locked-modal/report-locked-modal.component';

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.scss']
})
export class ReportPreviewComponent implements OnInit {
  @Input() report!: IReport;
  
  public isFullied = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

  viewReport(): void {
    // if (this.report.id) {
    //   this.openAuthLockedPopup();
    //   this.activeModal.dismiss();
    //   return;
    // }
    this.router.navigate([`/reports/${this.report?.id}`]);
  }

  toggleFullScreen(): void {
    this.isFullied = !this.isFullied;
    const modal = document.getElementsByClassName('modal-dialog');
    if (this.isFullied) {
      modal[0].classList.add('full-screen');
    } else {
      modal[0].classList.remove('full-screen');
    }
  }

}
