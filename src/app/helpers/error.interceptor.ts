import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService
        ,private alertService: AlertService) 
        {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        setTimeout(() => {
            this.alertService.networkActivity = true;
        });
        
        return next.handle(request).pipe(
            
            map(res => {
                if (res instanceof HttpResponse) {
                    if (request.method != 'GET' 
                        && res.status == 200 
                        && !request.url.endsWith('login') 
                        && !request.url.endsWith('check')
                        && !request.url.endsWith('logout')) {

                        this.alertService.success("Request processed successfully.");
                    }
                }
                return res;
            }),
            
            catchError(err => {
                if (err.status === 401) {
                    this.authenticationService.showLogin();
                } else if (err.status === 422) {
                    this.alertService.error("Validation failed! Please see highlighted fields below.");
                } else {
                    this.alertService.error("Error processing request, please try again later");
                }
                return throwError(err);
            }),
            
            finalize(() => {
                this.alertService.networkActivity = false;
                window.scroll(0,0);
            })
        );
    }
}