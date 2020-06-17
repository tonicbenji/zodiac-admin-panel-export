import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request).pipe(
            
            map(res => {
                if (res instanceof HttpResponse) {
                    if (res && res.body && res.body.access_token) {
                        this.authenticationService.setAccessToken(res.body.access_token);
                    }
                }

                return res;
            })
        );
    }
}