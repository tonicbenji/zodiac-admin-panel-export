import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '..';
import { RelatedService } from './related.service';

@Injectable({ providedIn: 'root' })
export class ProductFeatureService extends RelatedService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        super(http, authenticationService, 'products', 'features')
    }
}