import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class UtilisateurService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    Utilisateur_post(Utilisateur): Observable<any> {
        return this.http.post(this.urlservice.url + '/save_Admin', Utilisateur, this.options);
    }

    editUtilisateur(Utilisateur): Observable<any> {
        return this.http.put(`/api/prediction_update${Utilisateur.id}`, JSON.stringify(Utilisateur), this.options);
    }


    getUtilisateur(Utilisateur): Observable<any> {
        return this.http.get(`/api/prediction/${Utilisateur._id}`).map(res => res.json());
    }

    getUtilisateurs(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_admins_externes').map(res => res.json());
    }

    deleteUtilisateur(Utilisateur): Observable<any> {
        return this.http.delete(this.urlservice.url + `/delete_Admin/${Utilisateur.code_admin}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }
}
