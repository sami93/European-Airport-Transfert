import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class ClientService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    client_post(client): Observable<any> {
        return this.http.post(this.urlservice.url + '/nbrResClient', client, this.options);
    }
    client_add(client): Observable<any> {
        return this.http.post(this.urlservice.url + '/save_Client', client, this.options);
    }

    editClient(client): Observable<any> {
        return this.http.put(`/api/prediction_update${client.id}`, JSON.stringify(client), this.options);
    }


    getClient(Client): Observable<any> {
        return this.http.get(`/api/prediction/${Client._id}`).map(res => res.json());
    }

    getClientTop5(): Observable<any> {
        return this.http.get(this.urlservice.url + '/top5_client').map(res => res.json());
    }

    getClients(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_clients').map(res => res.json());
    }

    deleteClient(client): Observable<any> {
        return this.http.delete(this.urlservice.url + `/delete_Client/${client.code_client}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }
}
