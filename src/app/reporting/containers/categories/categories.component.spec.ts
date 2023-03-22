import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { IReportCategory } from "../../interfaces/reports.interfaces";
import { ApiReportingService } from "../../services/api-reporting.service";
import { CategoriesComponent } from "./categories.component";

describe('CategoriesComponent', () => {
    let component: CategoriesComponent;
    let fixture: ComponentFixture<CategoriesComponent>;
    let service: ApiReportingService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ CategoriesComponent ],
        imports: [HttpClientTestingModule],
        providers: [ ApiReportingService ],
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CategoriesComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(ApiReportingService);
      fixture.detectChanges();
    });
   
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create category list', ()=>{
        let categoryRes: IReportCategory[] = [
            {
                id:'1',
                type: 'category',
                attributes: {
                    name: 'string',
                    insertedUser: 'string',
                    insertedTime: 'string'
                }
            }
        ]
        let expectedCategoryList: IReportCategory[] = [
            {
                id:'',
                type: 'reportCategory',
                attributes: {
                    name: 'Browse All',
                    insertedUser: 'Browse All',
                    insertedTime: ''
                }
            },
            {
                id:'1',
                type: 'category',
                attributes: {
                    name: 'string',
                    insertedUser: 'string',
                    insertedTime: 'string'
                }
            }
        ]; 
        spyOn(service,'getCategories').and.returnValue(of(categoryRes))
        component.ngOnInit();
        expect(component.categories).toEqual(expectedCategoryList);
    })

    it('should update categories on filter', () => {
        component.categories = [
            {
                id:'1',
                type: 'reportCategory',
                attributes: {
                    name: 'string',
                    insertedUser: 'string',
                    insertedTime: 'string'
                }
            },
            {
                id:'2',
                type: 'reportCategory',
                attributes: {
                    name: 'string',
                    insertedUser: 'string',
                    insertedTime: 'string'
                }
            }
        ];
        component.filteredCategories = component.categories;
        component.categoriesOutput([{ reportCategoryId: '1' }]);
        expect(component.categories).toEqual([
          { id: '1', type: 'reportCategory', attributes: { name: 'string', insertedUser: 'string', insertedTime: 'string' } }
        ]);
      });

      it('should return 0 categories when id != search id', () => {
        component.filteredCategories = component.categories;
        component.categoriesOutput([{ reportCategoryId: '1' }]);
        expect(component.categories).toEqual(component.filteredCategories);
      });

      it('should set categories to filtered categories when length is 0',()=>{
        component.filteredCategories = component.categories;
        component.categoriesOutput([]);
        expect(component.categories).toEqual(component.filteredCategories);
      })
  });
  