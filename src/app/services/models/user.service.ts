import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '..';
import { BaseService } from './base.service';
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        super(http, authenticationService, 'users')
    }

    sendPasswordUpdateLink(record: any) {
        return this.http.post<any>(`${environment.apiUrl}` + '/admin/users/send-password-link', record);
    }

    editPassword(record: any) {
        return this.http.post<any>(`${environment.apiUrl}` + '/admin/users/password-edit', record);
    }

    getPasswordUpdate(token: any) {
        return this.http.get<any>(`${environment.apiUrl}` + '/admin/password-update/' + token);
    }

    submitPasswordUpdate(record: any) {
        return this.http.post<any>(`${environment.apiUrl}` + '/admin/password-update', record);
    }
}