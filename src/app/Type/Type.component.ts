import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
import {TypeService} from 'app/services/Type.service';

@Component({
    selector: 'app-type',
    templateUrl: './Type.component.html',
    styleUrls: ['./Type.component.css']
})

export class TypeComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    Liste_Types: any [];
    // dtOptions: DataTables.Settings = {};
    Type: any = {};
    addType: FormGroup;
    nom_type = new FormControl('', Validators.required);
    tarif = new FormControl('', Validators.required);

    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private TypeService: TypeService,
                public toast: ToastComponent) {

    }


    ngOnInit(): void {
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };

        this.myParams = {
            particles: {
                number: {
                    value: 100,
                },
                color: {
                    value: '#ff8000'
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: 5,
                },
                move: {
                    enable: true,
                    speed: 5
                },
            }
        };

        this.addType = this.formBuilder.group({
            nom_type: this.nom_type,
            tarif: this.tarif,

        });
        this.TypeService.getTypes().subscribe(results => {
            this.dtOptions = {
                pagingType: 'full_numbers',
                // Declare the use of the extension in the dom parameter
            };
            this.Liste_Types = results;
            this.dtTrigger.next();
            console.log(this.Liste_Types);
        }, error => {
            this.erreur(error, 'Liste desTypes Erreur');
        });
    }

    editType(Type) {

        this.Type = Type;
        this.TypeService.editType(Type).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.Type = Type;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteType(Type) {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            console.log('s');
            if (result.value) {
                this.toast.setMessage('Type : ' + Type.nom_type + ' deleted successfully.', 'success');

                console.log(Type);
                this.TypeService.deleteType(Type).subscribe(
                    res => {
                        /*    swal(
                         'Supprimé!',
                         'Votre Client ' + client.nom_client + ' a été supprimé.',
                         'success'
                         );
                         */
                        /*   const pos = this.Liste_clients.map(elem => elem._id).indexOf(client._id);
                         this.Liste_clients.splice(pos, 1); */
                        this.toast.setMessage(Type.nom_type + ' deleted successfully.', 'success');
                        window.location.reload();
                    },
                    error => console.log(error)
                );

            }
            if (!result.value) {
                swal(
                    'Cancelled',
                    'Annulé',
                    'error'
                );
            }
            /*  this.TypeService.deleteType(Type).subscribe(
             res => {

             const pos = this.Liste_Types.map(elem => elem._id).indexOf(Type._id);
             this.Liste_Types.splice(pos, 1);
             this.toast.setMessage(Type.Name + ' deleted successfully.', 'success');
             window.location.reload();
             },
             error => console.log(error)
             );
             */
        }, (dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your Type ',
                    'error'
                );
            }
        });

    }


    getInfoType(Type) {
        swal({
            title: '  <span style="color:#6495ED;font-weight:bold"> Type : '
            + Type.nom_type + '</span> ',
            showConfirmButton: true,
            html: `<center><table id="table" border=1 class="table .table-bordered">

               
       
            </tr>
     
        <tbody>
         <tr>
            <td>Matricule</td>
            <td>` + Type.nom_type + `</td>
         </tr>
                
                    <tr>
            <td>Marque</td>
               <td>` + Type.tarif + `</td>
     </tr>
 
        
             
          </tbody>
</table>
</center>`,

            type: 'info'
        });
    }


    generatePdf(Type) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Type : ' + Type.nom_type).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Name': Type.nom_type,
            'Adresse': Type.tarif,
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(Type.nom_type + '.pdf');
    }


    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }

    ajouterType() {
        // console.log(this.addClient.value);
        this.TypeService.Type_post(this.addType.value).subscribe(res => {
            /*console.log(typeof res._body);
            const resjson = JSON.parse(res._body);
            console.log(resjson);*/
            window.location.reload();
        }, err => {
            console.error(err);
            this.erreur(err, 'Type erreur');
        });
    }

}
