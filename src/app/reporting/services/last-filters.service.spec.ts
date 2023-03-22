import { LastFiltersService } from './last-filters.service';

describe('LastFiltersService', () => {
  let service: LastFiltersService;

  beforeEach(() => {
    service = new LastFiltersService();
    localStorage.clear();
  });
  
  afterEach(()=>{
    localStorage.clear();
  })

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should update and get the filter state', () => {
    localStorage.clear();
    const id = '1';
    const initialFilterState = service.getReportFilterState(id);
    expect(initialFilterState).toBe(false);

    const updatedFilterState = service.updateLastFilterStateById(id);
    expect(updatedFilterState).toBe(true);

    const retrievedFilterState = service.getReportFilterState(id);
    expect(retrievedFilterState).toBe(true);
  });
  it('should update if report last filter state exists', ()=>{
    service.reportsLastFiltersState = {'45' : true};
    service.updateLastFilterStateById('45');
    const updatedFilterState = service.updateLastFilterStateById('45');
    expect(updatedFilterState).toBe(true);
  })

});
