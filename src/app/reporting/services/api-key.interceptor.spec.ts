import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiKeyInterceptor } from "./api-key.interceptor";

describe("Api Key Interceptor",()=>{
    let client: HttpClient
    let controller: HttpTestingController;
    let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im9wdGltbyIsIklEIjoiMiIsIkV4cGlyZURhdGUiOiIxLzIzLzIwMjMgMTI6MDQ6MDkgUE0iLCJpc3MiOiJvcHRpbW8iLCJBcHBsaWNhdGlvbklkIjoiIiwiU2FsZXNDaGFubmVsSWQiOiIiLCJuYmYiOjE2NzQzODkwNDksImV4cCI6MTY3NDQ3NTQ0OSwiaWF0IjoxNjc0Mzg5MDQ5fQ.jOD4Fsl14hNOgsBhggatVm6aC35N_pT9MlwxaUtaMVKDwfpL6LBn99v8hB_g1uv1hTMYPdUngYtp5vJGwdu-42ytPrU1cl69aOhv4Lrn8PJrFHCyFgXo6cIiV2V5x82BEQgH5qtecnP_jphwrngCx5TasylK8_xZsf0j3024bDdMacVD2Q50WEslY94L85SlCnvFzT24_uXCyKeBAe1Rn1Rt2P7qQmzJR34jlzd_m9K-uDXCqHMwreLniGH-35QmNV3uh5JAL3YVlLgvblNOfGTl7hC9LbVnprDO2w7FsVmGQ6HG1NImwcmEaIpP-ovwVZVzaMq7JcZIElYuEBw9ew';


    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
              {
                provide: HTTP_INTERCEPTORS,
                useClass: ApiKeyInterceptor,
                multi: true
              }
            ]
        })

        client = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
    })

    it('should add Token to http headers', ()=>{
        client.get('/test').subscribe(res => {
            expect(res).toBeTruthy();
        })

        const req = controller.expectOne('/test');
        expect(req.request.headers.get('Token')).toEqual(token);
    })

    it('should get body from the request',()=>{
        const sampleResponse = {
            meta: {
                apiId: '155155',
            },
            data: 'mockData'
        };

        client.get('/test').subscribe(res=>{
            expect(localStorage.getItem('reportsApiId')).toEqual(sampleResponse.meta.apiId);
            expect(res).toEqual(sampleResponse.data);
        })

        const req = controller.expectOne('/test');

        req.flush(sampleResponse);
    })
});