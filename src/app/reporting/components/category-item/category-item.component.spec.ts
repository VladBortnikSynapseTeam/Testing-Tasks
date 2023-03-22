import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryItemComponent } from './category-item.component';
import { Router } from '@angular/router';
import { IReportCategory } from '../../interfaces/reports.interfaces';

describe('CategoryItemComponent', () => {
  let component: CategoryItemComponent;
  let fixture: ComponentFixture<CategoryItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemComponent);
    component = fixture.componentInstance;
    component.category = {
        id: '1',
        type: 'reportCategory',
        attributes: {
            name: 'string',
            insertedTime: '1111111',
            insertedUser: 'string',
        }
    }
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to report page when goToCategory is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToCategory();

    expect(navigateSpy).toHaveBeenCalledWith(['/reports'], { queryParams: { reportCategoryId: component.category.id } });
  });
});
