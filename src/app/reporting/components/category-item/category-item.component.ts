import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReportCategory } from '../../interfaces/reports.interfaces';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() category!: IReportCategory;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.category, 'CATEGORY ITEM ========')
  }

  goToCategory(): void {
    this.router.navigate([`/reports`], {queryParams: { reportCategoryId: this.category.id }});
  }

}
