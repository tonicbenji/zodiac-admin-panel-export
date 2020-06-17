import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '..';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class FaqService extends BaseService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        super(http, authenticationService, 'faq');
    }
}