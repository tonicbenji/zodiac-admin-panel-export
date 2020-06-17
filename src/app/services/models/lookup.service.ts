import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '..';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';
import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class LookupService {

    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    getAll(type:string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/lookups/' + type);
        }
    }
}