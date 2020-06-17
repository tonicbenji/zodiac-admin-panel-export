
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class PluginService {
    currentUser: User;

    constructor(protected authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    filemanager(target_field: string = null) {
        this.currentUser = this.authenticationService.currentUserValue;
        let endpoint = `${environment.apiUrl}/filemanager?sub=` + this.currentUser.access_token;
        if (target_field)  {
            endpoint = endpoint + "&field_name=" + target_field;
        }
        (<any>window).$.colorbox({
            iframe:true,
            width: 1500,
            height: 1000,
            href: endpoint
        })
    }
}