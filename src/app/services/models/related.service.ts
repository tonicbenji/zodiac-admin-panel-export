import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '../../models';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';

@Injectable({ providedIn: 'root' })
export class RelatedService {
    
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(protected http: HttpClient,
        protected authenticationService: AuthenticationService,
        protected parent_type: string,
        protected type: string) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    getAll(parent_id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + parent_id + '/' + this.type);
        }
    }

    getRecord(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + this.type + '/' + id + '/edit');
        }
    }

    create(record: any, parent_id: string) {
        if (this.currentUser) {
            return this.http.post<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + parent_id + '/' + this.type + '/create', record);
        }
    }

    save(record: any) {
        if (this.currentUser) {
            return this.http.post<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + this.type + '/' + record.id + '/update', record);
        }
    }

    enable(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + this.type + '/' + id + '/enable');
        }
    }

    disable(id: string) {
        if (this.currentUser) {
            return this.http.get<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + this.type + '/' + id + '/disable');
        }
    }

    delete(id: string) {
        if (this.currentUser) {
            return this.http.delete<any>(`${environment.apiUrl}` + '/admin/' + this.parent_type + '/' + this.type + '/' + id + '/delete');
        }
    }
}