import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-detail-settings',
  templateUrl: './report-detail-settings.component.html',
  styleUrls: ['./report-detail-settings.component.scss']
})
export class ReportDetailSettingsComponent implements OnInit {
  @Input() reportSettingsDetail: any[] = [];
  @Input() reportName!: string;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.activeModal)
  }

  reset(): void {
    this.activeModal.close();
  }

  save(): void {
    this.activeModal.close(this.reportSettingsDetail);
  }
}
