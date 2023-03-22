import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { I2FAuthenticationData, ICannedReportFavorite, IFilterPreference, IHttpParamData, IReport, IReportCategory, IUserOverride } from '../interfaces/reports.interfaces';
import { ApiReportingService } from './api-reporting.service';

describe('ApiReportingService', () => {
  let apiURL = 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE';
  let apiPrefix = apiURL + '/api/v4.2';
  let apiPrefixV4_1 = apiURL + '/api/v4.1';
  let service: ApiReportingService;
  let httpMock: HttpTestingController;
  let reportMock: IReport = {
    id: '1',
    type: '1',
        attributes: {
            favorite: false,
            lastViewedTime: 'string',
            active: false,
            code: 'string',
            customReport: true,
            description: 'string',
            category: 'string',
            name: 'string',
            physicalFileName: 'string',
            reportCategoryId: 'string',
            reportCategoryName: 'string',
            thumbnailURL: 'string',
            managerApprovalRequired: true,
            SendManagerNotification: true,
            "2FARequired": true
        }
    };
  let categoryMock: IReportCategory= {
    id: '1',
    type: 'category',
    attributes: {
        name: 'string',
        insertedUser: 'string',
        insertedTime: 'string'
    }
  }

  let sampleRes = {
    value: "sample", key: 'sample'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiReportingService]
    });

    service = TestBed.inject(ApiReportingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

    it('should return canned reports | getCannedReports()', () => {
      const mockReports: IReport[] = [reportMock];

      const mockParams: IHttpParamData[] = [{ key: '1', value: '1' }, { key: '2', value: '2' }];

      service.getCannedReports(mockParams).subscribe((res: IReport[]) => {
        expect(res).toBe(mockReports);
      });

      const req = httpMock.expectOne(`${apiPrefix}/reports/canned-reports?1=1&2=2`);
      expect(req.request.method).toBe('GET');

      req.flush(mockReports);
    });

    it('should get reported field data | getReportFieldData()', ()=>{
        const url = '...test/endpoint';

        const mockResponce = {val: 1, sampl: 2};

        service.getReportFieldData(url).subscribe(res => {
            expect(res).toBe(mockResponce)
        })

        const req = httpMock.expectOne(`${apiURL}/test/endpoint`);
        expect(req.request.method).toBe("GET");

        req.flush(mockResponce);
    })

    it('should get categories data | getCategories()', ()=>{
    
        service.getCategories().subscribe(res => {
            expect(res).toEqual([categoryMock])
        })

        const req = httpMock.expectOne(`${apiPrefix}/reports/categories`);
        expect(req.request.method).toBe("GET");

        req.flush([categoryMock]);
    })

    it('should get canned reports by id | getCannedReportById()', ()=>{
        const mockId = '1';
        service.getCannedReportById(mockId).subscribe(res => {
            expect(res).toEqual(reportMock)
        })

        const req = httpMock.expectOne(`${apiPrefix}/reports/canned-reports/${mockId}?include=parameterFields`);
        expect(req.request.method).toBe("GET");

        req.flush(reportMock);
    })

    it('should get cbusiness Areas | getBusinessAreas()', ()=>{
        const businessAreasMOck = {businessAre: 'sample', id: '1'};
        service.getBusinessAreas().subscribe(res => {
            expect(res).toEqual(businessAreasMOck)
        })

        const req = httpMock.expectOne(`${apiPrefixV4_1}/products/business-areas`);
        expect(req.request.method).toBe("GET");

        req.flush(businessAreasMOck);
    })

    it('should get venues | getVenues()', ()=>{
        const venuesMock = {venue: 'sample', id: '1'};
        service.getVenues().subscribe(res => {
            expect(res).toEqual(venuesMock)
        })

        const req = httpMock.expectOne(`${apiPrefixV4_1}/venues`);
        expect(req.request.method).toBe("GET");

        req.flush(venuesMock);
    })

    it('should create Cenned Report Execute | createCannedReportExecute()', ()=>{
        const mockId = '1';
        const data = {id: '1', sample: '1'};

        service.createCannedReportExecute(mockId, data).subscribe(res => {
            expect(res).toBe(sampleRes);
        })

        const req = httpMock.expectOne(`${apiPrefix}/reports/canned-reports/${mockId}/execute`);
        expect(req.request.body).toBe(data);
        expect(req.request.method).toBe('POST');
    })

    it('should create Canned Report Filter Preferences | createCannedReportFilterPreferences()', ()=>{
        let mockID = '1';
        let mockData: IFilterPreference[] = [{
            id: '1',
            type: 'filter',
            attributes: {
                advanced: true
            }
        }];

        service.createCannedReportFilterPreferences(mockID,mockData).subscribe(res => {
            expect(res).toEqual(sampleRes)
        })

        const req = httpMock.expectOne(`${apiPrefix}/reports/canned-reports/${mockID}/filterPreferences`);
        expect(req.request.body).toEqual(mockData);
        expect(req.request.method).toEqual("POST");
    })

    it('should create Users Override | createUsersOverride()', ()=>{
        let mockData: IUserOverride = {
            Username: 'string',
            Password: 'string',
            apiID: 'string'
        }

        service.createUsersOverride(mockData).subscribe(res => {
            expect(res).toEqual(sampleRes)
        })

        const req = httpMock.expectOne(`${apiPrefixV4_1}/users/override`);
        expect(req.request.body).toEqual(mockData);
        expect(req.request.method).toEqual("POST");
    })

    it('should send 2fa code | send2FAuthentication()', ()=>{
        let mockData: I2FAuthenticationData = {
            'APId': 'string',
            '2FACode': 'string',
        }

        service.send2FAuthentication(mockData).subscribe(res => {
            expect(res).toEqual(sampleRes)
        })

        const req = httpMock.expectOne(`${apiPrefix}/users/2FAuthentication`);
        expect(req.request.body).toEqual(mockData);
        expect(req.request.method).toEqual("POST");
    })

    it('should create 2fa code | create2FAuthentication()', ()=>{

        service.create2FAuthentication(sampleRes).subscribe(res => {
            expect(res).toEqual(sampleRes)
        })

        const req = httpMock.expectOne(`${apiPrefix}/users/Request2FACode `)
        expect(req.request.body).toEqual(sampleRes);
        expect(req.request.method).toEqual("POST");

        
    })

    it('should update canned reports by id | updateCannedReportsById()', ()=>{
        const mockID = '1';
        const mockData: ICannedReportFavorite = {
            data: {
                id: 'string',
                type: 'string',
                attributes: {
                    favorite: false,
                }
            }
        }
        service.updateCannedReportsById(mockID, mockData).subscribe(res => {
            expect(res).toEqual(sampleRes)
        })

        const req = httpMock.expectOne(`${apiPrefix}/reports/canned-reports/${mockID}`);
        expect(req.request.body).toEqual(mockData);
        expect(req.request.method).toEqual("PATCH");
    })

    

});
