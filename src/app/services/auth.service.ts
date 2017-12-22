import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

import {UserService} from '../services/user.service';
import {UrlService} from './url.service';

@Injectable()
export class AuthService {
    loggedIn = false;
    isAdmin = false;

    jwtHelper: JwtHelper = new JwtHelper();

    currentUser = {nom_admin: '', type_admin: ''};

    constructor(private userService: UserService,
                private router: Router,
                public urlservice: UrlService) {
        const sami = localStorage.getItem('sami');
        if (sami) {
            const session_user = JSON.parse(sami);
            this.setCurrentUser(session_user);
        }
    }

    login_server(emailAndPassword) {
        return this.userService.login_server(emailAndPassword).map(res => res.json()).map(
            res => {
                console.log('auth');
                console.log(res);
                localStorage.setItem('sami', JSON.stringify(res));
                console.log(res);
                this.loggedIn = true;
                this.setCurrentUser(res);
                return this.loggedIn;
            },
            err => {
                console.log(err);
            }
        );
    }

    logout() {
        localStorage.removeItem('sami');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = {nom_admin: '', type_admin: ''};
        this.router.navigate(['/']);
    }


    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        this.currentUser.nom_admin = decodedUser.nom_admin;
        this.currentUser.type_admin = decodedUser.type_admin;
        this.currentUser.type_admin === 'interne' ? this.isAdmin = true : this.isAdmin = false;
        delete  this.currentUser.type_admin;
    }

}
