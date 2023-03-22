import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, Subject, switchMap, takeUntil } from 'rxjs';
import { ICategorySearch, IFilter, IHttpParamData, IReport } from '../../interfaces/reports.interfaces';
import { ApiReportingService } from '../../services/api-reporting.service';

@Component({
  selector: 'app-reports-filters',
  templateUrl: './reports-filters.component.html',
  styleUrls: ['./reports-filters.component.scss']
})
export class ReportsFiltersComponent implements OnInit {
  @Input() isFilters = false;
  @Input() isGeneralPage = false;
  @Input() reportCategoryId = '';
  @Output() onFilterChanged = new EventEmitter<IFilter | ICategorySearch[]>();
  @Output() onSortChanged = new EventEmitter<boolean>();

  public searchText: any;
  public sort = '';
  public filter = '';
  public isSort: null | boolean = null;

  public enableSort = true;
  public model: any;
  public categories: ICategorySearch[] = [];

  // multiselect options
  public optionsModel: number[] = [];
  // public msSettings: IMultiSelectSettings = { fixedTitle: true, showCheckAll: true, pullRight: true };
  // public msTexts: IMultiSelectTexts = { checkAll: 'All', allSelected: 'All selected', defaultTitle: 'Filter by' };
  // public msOptions: IMultiSelectOption[] = [{ id: 1, name: 'Last Viewed' }, { id: 2, name: 'Favourites' }];

  private destroyComponent$ = new Subject<boolean>();

  constructor(
    private apiReportingService: ApiReportingService,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyComponent$.next(true);
    this.destroyComponent$.unsubscribe();
  }

  public searchListOfAutocomplete(): Observable<IReport[] | any[]> {
    const params: IHttpParamData[] = [];
    if (this.reportCategoryId) {
      params.push({ key: 'filters.reportCategoryId', value: this.reportCategoryId });
    }
    params.push({ key: 'filters.searchText', value: this.searchText });

    if (this.isGeneralPage) {
      return this.apiReportingService.getCannedReports(params)
        .pipe(
          takeUntil(this.destroyComponent$),
          map(items => {
            this.categories = [];
            const categories: ICategorySearch[] = [];
            items.forEach(item => {
              const index = categories.findIndex(category => category.reportCategoryId === item.attributes?.reportCategoryId);
              if (index < 0) {
                categories.push({
                  reportCategoryId: item.attributes!.reportCategoryId!,
                  reportCategoryName: item.attributes!.reportCategoryName!
                });
              }
            });
            this.categories = items.length > 0 ? categories : [{ reportCategoryId: '-1', reportCategoryName: `Not found '${this.searchText}'` }];
            return this.categories;
          })
        )
    } else {
      return this.apiReportingService.getCannedReports(params)
        .pipe(
          takeUntil(this.destroyComponent$)
        )
    }
  }

  public setTextCategories(id?: string): void {
    let responseCategories: ICategorySearch[] = [];
    if (id) {
      const filterByIdCategory = this.categories.filter(c => c.reportCategoryId === id);
      responseCategories = filterByIdCategory;
      this.searchText = filterByIdCategory[0].reportCategoryName;
    } else if (!this.searchText) {
      responseCategories = [];
    } else if (this.searchText && !id) {
      responseCategories = (this.searchText.length < 2) ? [] : this.categories;
    }
    this.onFilterChanged.emit(responseCategories);
  }

  public setText(text?: string): void {
    if (text) this.searchText = text;
    if (this.searchText && this.searchText['id']) {
      this.searchText = this.searchText.attributes.name;
    }
    this.optionsModel = [];
    this.onFilterChanged.emit(this.getSearchData());
  }

  public toggleSort(): void {
    if (this.enableSort) {
      if (this.isSort === null) {
        this.isSort = false;
      } else {
        this.isSort = !this.isSort;
      }
      this.onSortChanged.emit(this.isSort);
    }
  }

  public onMSChange(): void {
    const findIndex = this.optionsModel.findIndex(i => i === 1);
    this.enableSort = findIndex < 0;
    this.onFilterChanged.emit(this.getSearchData());
  }

	public search: OperatorFunction<string, readonly IReport[] | any[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((term) =>
				term.length < 2
					? of([])
					: this.searchListOfAutocomplete().pipe(
              catchError(() => {
                this.categories = [];
                return of([]);
              })
            )
			),
		);

  public formatter = (x: IReport) => (x.attributes && x.attributes!.name as string) || (x as any);

  public formatterGeneral = (x: ICategorySearch) => ((x as ICategorySearch).reportCategoryName) || (x as any);

  private getSearchData(): IFilter {
    this.isSort = null;

    return {
      searchText: this.searchText,
      filter: this.optionsModel,
    }
  }
}
