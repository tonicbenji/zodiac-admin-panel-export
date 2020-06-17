import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '../../models';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '..';

@Injectable({ providedIn: 'root' })
export class BaseService {
    
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(protected http: HttpClient,
        protected authenticationService: AuthenticationService,
        protected type: string) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    getAll() {
        if (this.currentUser) {

            console.log(`${environment.apiUrl}` + '/admin/' + this.type);

            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.type);
        }
    }

    getRecord(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/edit');
        }
    }

    create(record: any) {
        if (this.currentUser) {
            return this.http.post<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/create', record);
        }
    }

    save(record: any) {
        if (this.currentUser) {
            return this.http.post<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + record.id + '/update', record);
        }
    }

    enable(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/enable');
        }
    }

    disable(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/disable');
        }
    }

    featured(id: string, value: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/featured/' + value);
        }
    }

    delete(id: string) {
        if (this.currentUser) {
            return this.http.delete<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/delete');
        }
    }

    duplicate(id: string) {
        if (this.currentUser) {
            return this.http.post<any>(`${environment.apiUrl}` + '/admin/' + this.type + '/' + id + '/duplicate', id);
        }
    }

}