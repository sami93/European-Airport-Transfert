import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class VehiculeService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    Vehicule_post(Vehicule): Observable<any> {
        return this.http.post(this.urlservice.url + '/save_Vehicule', JSON.stringify(Vehicule), this.options);
    }

    editVehicule(Vehicule): Observable<any> {
        return this.http.put(`/api/prediction_update${Vehicule.id}`, JSON.stringify(Vehicule), this.options);
    }


    getVehicule(Vehicule): Observable<any> {
        return this.http.get(`/api/prediction/${Vehicule._id}`).map(res => res.json());
    }

    getVehiculeTop5(): Observable<any> {
        return this.http.get(this.urlservice.url + '/top5_vehicules').map(res => res.json());
    }

    getVehicules(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_vehicules').map(res => res.json());
    }

    deleteVehicule(Vehicule): Observable<any> {
        return this.http.delete(`/api/Vehicule/${Vehicule.id}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }
}
