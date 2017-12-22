import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UrlService} from './url.service';

@Injectable()
export class ReservationsService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    url = 'http://10.241.107.19:54321';
    apiGetAll = 'https://jsonplaceholder.typicode.com/posts';


    constructor(private http: Http, public urlservice: UrlService) {
    }

    Reservation_post(Reservation): Observable<any> {
        return this.http.post(this.urlservice.url + '/create_reservation', Reservation, this.options);
    }

    editReservation(Reservation): Observable<any> {
        return this.http.put(`/api/prediction_update${Reservation.id}`, JSON.stringify(Reservation), this.options);
    }


    getReservation(Reservation): Observable<any> {
        return this.http.get(`/api/prediction/${Reservation._id}`).map(res => res.json());
    }

    getReservations(): Observable<any> {
        return this.http.get(this.urlservice.url + '/all_Reservations').map(res => res.json());
    }

    deleteReservation(Reservation): Observable<any> {
        return this.http.delete(this.urlservice.url + `/delete_Reservation/${Reservation.code_res}`, this.options);
    }

    private extractData(res: Response) {

        const body = res.json();
        const sami = body.models;


        return sami || {};
    }
}
