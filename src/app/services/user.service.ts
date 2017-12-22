import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UrlService} from "app/services/url.service";


@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, public urlservice: UrlService) {
    }

    register(user): Observable<any> {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    }

    login_server(credentials): Observable<any> {
        const data = new URLSearchParams();
        data.append('login', credentials.login)
        data.append('pwd', credentials.pwd);

        return this.http.post(this.urlservice.url + '/login', data);
    }

    getUsers(): Observable<any> {
        return this.http.get('/api/users').map(res => res.json());
    }

    countUsers(): Observable<any> {
        return this.http.get('/api/users/count').map(res => res.json());
    }

    addUser(user): Observable<any> {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    }

    getUser(user): Observable<any> {
        return this.http.get(`/api/user/${user._id}`).map(res => res.json());
    }

    editUser(user): Observable<any> {
        return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
    }

    deleteUser(user): Observable<any> {
        return this.http.delete(`/api/user/${user._id}`, this.options);
    }

}
