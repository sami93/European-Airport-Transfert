import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class TypeService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    Type_post(Type): Observable<any> {
        return this.http.post(this.urlservice.url + '/save_type', Type, this.options);
    }

    editType(Type): Observable<any> {
        return this.http.put(`/api/prediction_update${Type.id}`, JSON.stringify(Type), this.options);
    }


    getType(Type): Observable<any> {
        return this.http.get(`/api/prediction/${Type._id}`).map(res => res.json());
    }

    getTypeTop5(): Observable<any> {
        return this.http.get(this.urlservice.url + '/top5_Type').map(res => res.json());
    }

    getTypes(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_types').map(res => res.json());
    }

    deleteType(Type): Observable<any> {
        return this.http.delete(this.urlservice.url + `/delete_Type/${Type.code_type}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }
}
