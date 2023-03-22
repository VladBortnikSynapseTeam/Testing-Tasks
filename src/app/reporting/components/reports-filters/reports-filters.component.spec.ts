import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { ICategorySearch, IReport } from "../../interfaces/reports.interfaces";
import { ApiReportingService } from "../../services/api-reporting.service";
import { ReportsFiltersComponent } from "./reports-filters.component";

describe('Reports Filters Component',()=>{
  let component: ReportsFiltersComponent;
  let fixture: ComponentFixture<ReportsFiltersComponent>;
  let service: ApiReportingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(
        {
            declarations: [ReportsFiltersComponent],
            imports: [RouterTestingModule,HttpClientTestingModule],
            providers: [ApiReportingService]
        }
    ).compileComponents();
    service = TestBed.inject(ApiReportingService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should search list of autocomplete if general page is true', () => {
    component.isGeneralPage = true;
    component.reportCategoryId = '1';
    component.searchText = 'test';

    const mockResponse: IReport[] = [
      { 
        id: '1',
        type: 'report',
        attributes: {
            name: '1'
        } 
      },
    ];
    spyOn(service,'getCannedReports').and.returnValue(of(mockResponse));

    component.searchListOfAutocomplete().subscribe((result: any) => {
      expect(result).toEqual(component.categories);
    });

    expect(service.getCannedReports).toHaveBeenCalledWith([
      { key: 'filters.reportCategoryId', value: '1' },
      { key: 'filters.searchText', value: 'test' }
    ]);
  });

  it('should search list of autocomplete if general page is false', () => {
    component.isGeneralPage = false;
    component.reportCategoryId = '1';
    component.searchText = 'test';

    const mockResponse: IReport[] = [
      { 
        id: '1',
        type: 'report',
        attributes: {
            name: '1'
        } 
      },
    ];
    spyOn(service,'getCannedReports').and.returnValue(of(mockResponse));

    component.searchListOfAutocomplete().subscribe((result: any) => {
      expect(result).toEqual(mockResponse);
    });

    expect(service.getCannedReports).toHaveBeenCalledWith([
      { key: 'filters.reportCategoryId', value: '1' },
      { key: 'filters.searchText', value: 'test' }
    ]);
  });

  it('should set text categories if id', ()=>{
    let categoriesListMock = [
        {
            reportCategoryName: 'sample category 1',
            reportCategoryId: '1'
        },
        {
            reportCategoryName: 'sample category 2',
            reportCategoryId: '2'
        }
    ]
    component.categories = categoriesListMock;
    expect(component.categories).toEqual(categoriesListMock);
    component.setTextCategories('1');
  })

  it('should set responseCategories to an empty array when searchText is not defined', () => {
    component.categories = [
      { 
        reportCategoryId: '1',
        reportCategoryName: 'sample category 1'
      },
      { 
        reportCategoryId: '2', 
        reportCategoryName: 'sample category 2' 
      }
    ];
    component.searchText = '';

    component.setTextCategories();

    expect(component.searchText).toEqual('');
  });

  it('should set responseCategories to categories when searchText is defined but id is not defined', () => {
    component.categories = [
      { 
        reportCategoryId: '1', 
        reportCategoryName: 'sample category 1' 
      },
      { 
        reportCategoryId: '2', 
        reportCategoryName: 'sample category 2' 
      }
    ];
    component.searchText = 'Se';

    component.setTextCategories();

    expect(component.searchText).toEqual('Se');
  });

  it('should set responseCategories to categories when searchText is defined but id is not defined and texr is lower tahn 2',()=>{
    component.categories = [
        { 
          reportCategoryId: '1', 
          reportCategoryName: 'sample category 1' 
        },
        { 
          reportCategoryId: '2', 
          reportCategoryName: 'sample category 2' 
        }
      ];
      component.searchText = 'S';
  
      component.setTextCategories();
  
      expect(component.searchText).toEqual('S');
  })

  it('should set searchText to text property if text is passed to method', ()=>{
    let text = 'sample text';
    component.setText(text);
    expect(component.searchText).toEqual('sample text');
    expect(component.optionsModel).toEqual([]);
  })

  it('should set searchText to the name property when searchText has an id property', () => {
    component.searchText = { id: 1, attributes: { name: 'sample text' } };

    component.setText();

    expect(component.searchText).toEqual('sample text');
    expect(component.optionsModel).toEqual([]);
  });

  it('should toggle sort if enable sort is true and isSort is null',()=>{
    component.enableSort = true;
    component.isSort = null;
    component.toggleSort();
    expect(component.isSort).toBeFalse();
  })

  it('should toggle sort if enable sort is true and isSort has value',()=>{
    component.enableSort = true;
    component.isSort = false;
    component.toggleSort();
    expect(component.isSort).toBeTrue();
  })

  it('should format IReport', () => {
    const report: IReport = {
        id: '1',
        type: 'report',
        attributes: { 
            name: 'Report Name' 
        } 
    };
    const expectedValue = 'Report Name';

    const result = component.formatter(report);

    expect(result).toEqual(expectedValue);
  });

  it('should format ICategorySearch', () => {
    const category: ICategorySearch = { reportCategoryId: '1', reportCategoryName: 'Category Name' };
    const expectedValue = 'Category Name';

    const result = component.formatterGeneral(category);

    expect(result).toEqual(expectedValue);
  });

  it('should update enableSort to false if optionsModel contains 1', () => {
    component.optionsModel = [1, 2, 3];
    component.onMSChange();
    expect(component.enableSort).toBe(false);
  });

  it('should update enableSort to true if optionsModel does not contain 1', () => {
    component.optionsModel = [2, 3];
    component.onMSChange();
    expect(component.enableSort).toBe(true);
  });


  it('should return an Observable of empty array when search term is less than 2 characters', () => {
    const result = component.search(of('a'));
    result.subscribe((value) => {
      expect(value).toEqual([]);
    });
  });
})