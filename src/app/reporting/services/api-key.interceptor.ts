import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im9wdGltbyIsIklEIjoiMiIsIkV4cGlyZURhdGUiOiIxLzIzLzIwMjMgMTI6MDQ6MDkgUE0iLCJpc3MiOiJvcHRpbW8iLCJBcHBsaWNhdGlvbklkIjoiIiwiU2FsZXNDaGFubmVsSWQiOiIiLCJuYmYiOjE2NzQzODkwNDksImV4cCI6MTY3NDQ3NTQ0OSwiaWF0IjoxNjc0Mzg5MDQ5fQ.jOD4Fsl14hNOgsBhggatVm6aC35N_pT9MlwxaUtaMVKDwfpL6LBn99v8hB_g1uv1hTMYPdUngYtp5vJGwdu-42ytPrU1cl69aOhv4Lrn8PJrFHCyFgXo6cIiV2V5x82BEQgH5qtecnP_jphwrngCx5TasylK8_xZsf0j3024bDdMacVD2Q50WEslY94L85SlCnvFzT24_uXCyKeBAe1Rn1Rt2P7qQmzJR34jlzd_m9K-uDXCqHMwreLniGH-35QmNV3uh5JAL3YVlLgvblNOfGTl7hC9LbVnprDO2w7FsVmGQ6HG1NImwcmEaIpP-ovwVZVzaMq7JcZIElYuEBw9ew';
    if(token) {
      request = request.clone({
        setHeaders: {
          Token: `${token}`,
        }
      });
    }
    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            event = event.clone({body: this.modifyBody(event.body)});
          }
          return event;
        })
      );
  }

  private modifyBody(body: any): any {
    if (body.meta.apiId) {
      localStorage.setItem('reportsApiId', body.meta.apiId);
    }
    if (body.data) {
      return body.data;
    }
    return body;
  }
}
