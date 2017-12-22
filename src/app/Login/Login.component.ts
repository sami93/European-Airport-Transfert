import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    login = new FormControl('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]);
    pwd = new FormControl('', [Validators.required,
        Validators.minLength(6)]);

    constructor(private auth: AuthService,
                private router: Router,
                private http: Http,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuilder.group({
            login: this.login,
            pwd: this.pwd
        });
    }

    login_server() {
        this.auth.login_server(this.loginForm.value).subscribe(
            res => {
                console.log(res);
                this.router.navigate(['/']);
            },
            erreur => {
                console.log(erreur);
            }
        );
    }


}
