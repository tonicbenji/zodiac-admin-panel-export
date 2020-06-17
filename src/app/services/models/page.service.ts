import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { AuthenticationService } from '..';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PageService extends BaseService {

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService, protected route: Router) {
        super(http, authenticationService, '')
    }
    
}