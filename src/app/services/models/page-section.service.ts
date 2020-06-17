import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '..';
import { RelatedService } from './related.service';

@Injectable({ providedIn: 'root' })
export class PageSectionService extends RelatedService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService) {
        super(http, authenticationService, 'pages', 'sections');
    }

}