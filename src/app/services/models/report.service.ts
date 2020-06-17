import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '..';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ReportService extends BaseService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        super(http, authenticationService, 'reports/builder-contact-requests');
    }
}