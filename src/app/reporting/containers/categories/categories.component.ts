import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ICategorySearch, IReportCategory } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: IReportCategory[] = [];
  public filteredCategories: IReportCategory[] = [];

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    private apiReportingService: ApiReportingService
  ) { }

  ngOnInit(): void {
    this.apiReportingService.getCategories()
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe(
        (categories)=> {
          this.categories = [];
          this.categories = categories;
          this.categories.unshift({
            id: '',
            type: 'reportCategory',
            attributes: {
              name: 'Browse All',
              insertedUser: 'Browse All',
              insertedTime: '',
            }
          });
          this.filteredCategories = this.categories;
        }
      )
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  public categoriesOutput(categories: any): void {
    this.categories = categories.length > 0 ? this.filteredCategories.filter(c => {
      const index = categories.findIndex((a: ICategorySearch) => a.reportCategoryId === c.id);
      return (index >= 0) ? true : false;
    }) : this.filteredCategories;
  }
}
