import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { I2FAuthenticationData, ICannedReportFavorite, IFilter, IFilterPreference, IHttpParamData, IReport, IReportCategory, IUserOverride } from '../interfaces/reports.interfaces';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiReportingService {
  private apiURL = 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE';
  private apiPrefix = this.apiURL + '/api/v4.2';
  private apiPrefixV4_1 = this.apiURL + '/api/v4.1';

  constructor(
    private http: HttpClient,
  ) {}

  // GET
  public getCannedReports(params: IHttpParamData[]): Observable<IReport[]> {
    let data = new HttpParams();
    params?.forEach((p) => {
      data = data.append(p.key, p.value);
    });

    return this.http.get<IReport[]>(`${this.apiPrefix}/reports/canned-reports`, { params: data });
    // return of(this.mockDataService.reports);
  }

  public getReportFieldData(url: string): Observable<any> {
    const parsedUrl = url.replace('...', '');
    return this.http.get<any>(`${this.apiURL}/${parsedUrl}`);
  }

  // GET
  // /reports/categories
  public getCategories(): Observable<IReportCategory[]> {
    return this.http.get<IReportCategory[]>(`${this.apiPrefix}/reports/categories`);
  }

  // GET
  // /reports/canned-reports/{id}?include=parameterFields,sortFields,groupFields
  public getCannedReportById(id: string): Observable<any> {
    const httpParams = new HttpParams().set('include', 'parameterFields');
    return this.http.get<any>(`${this.apiPrefix}/reports/canned-reports/${id}`, { params: httpParams });
    // return of(this.mockDataService.rd);
  }

  // GET
  // /products/business-areas
  public getBusinessAreas(): Observable<any> {
    return this.http.get<any>(`${this.apiPrefixV4_1}/products/business-areas`);
  }

  // GET
  // /venues
  public getVenues(): Observable<any> {
    return this.http.get<any>(`${this.apiPrefixV4_1}/venues`);
  }

  // POST
  // /reports/canned-reports/{id}/execute
  public createCannedReportExecute(id: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiPrefix}/reports/canned-reports/${id}/execute`, data);
  }

  // POST
  // /reports/canned-reports/{id}/filterPreferences
  public createCannedReportFilterPreferences(id: string, data: IFilterPreference[]): Observable<any> {
    return this.http.post<any>(`${this.apiPrefix}/reports/canned-reports/${id}/filterPreferences`, data );
  }

  // POST
  // /users/override
  public createUsersOverride(data?: IUserOverride | null): Observable<any> {
    return this.http.post<any>(`${this.apiPrefixV4_1}/users/override`, data);
  }

  // POST
  // /users/2FAuthentication
  public send2FAuthentication(data: I2FAuthenticationData): Observable<any> {
    return this.http.post<any>(`${this.apiPrefix}/users/2FAuthentication`, data);
    // return this.http.get<any>(`${this.apiPrefixV4_1}/users/2FAuthentication`);
  }

  public create2FAuthentication(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiPrefix}/users/Request2FACode `,data);
  }

  // PATCH
  // /reports/canned-reports/{id}
  public updateCannedReportsById(id: string, data: ICannedReportFavorite): Observable<any> {
    return this.http.patch<any>(`${this.apiPrefix}/reports/canned-reports/${id}`, data);
  }
}
