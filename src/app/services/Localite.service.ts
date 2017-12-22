import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class LocaliteService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    Localite_post(Localite): Observable<any> {
        return this.http.post(this.urlservice.url + '/save_Localite', Localite, this.options);
    }

    editLocalite(Localite): Observable<any> {
        return this.http.put(`/api/prediction_update${Localite.id}`, JSON.stringify(Localite), this.options);
    }


    getLocalite(Localite): Observable<any> {
        return this.http.get(`/api/prediction/${Localite._id}`).map(res => res.json());
    }

    getLocalites(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_Localites').map(res => res.json());
    }

    deleteLocalite(Localite): Observable<any> {
        return this.http.delete(this.urlservice.url + `/delete_Localite/${Localite.code_local}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }


}
