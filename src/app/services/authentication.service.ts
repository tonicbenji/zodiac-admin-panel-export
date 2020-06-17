import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { environment } from '../../environments/environment';
import { map, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public loginPopup: boolean = false;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    setAccessToken(access_token) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            user.access_token = access_token;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
    }

    check() {
        return this.http.post(`${environment.apiUrl}/auth/check`, {}).pipe(first())
        .subscribe(
            data => {
                this.loginPopup = false;
            },
            error => {
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
            });   
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/auth/register`, user);
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    
    loggedIn() {
        this.loginPopup = false;
        console.log(this.currentUserValue);
    }

    showLogin() {
        this.loginPopup = true;
    }
}