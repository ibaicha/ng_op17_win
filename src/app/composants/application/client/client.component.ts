import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MessageService, SharedModule } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { IClient } from '../../../interfaces/client.interface';
import { select, Store } from '@ngrx/store';
import * as fromClients from '../../../store/client';
import * as fromOps from '../../../store/op';
import * as fromPersonnes from '../../../store/personne';
import * as fromSocietes from '../../../store/societe';
import * as fromTypeOps from '../../../store/type_op';
import * as fromTypeClients from '../../../store/type_client';
import * as fromProfessions from '../../../store/profession';
import * as fromTypeSocietes from '../../../store/type_societe';
import moment from 'moment';

import { Table, TableModule } from 'primeng/table';
import { IPersonne } from '../../../interfaces/personne.interface';
import { ITypeClient } from '../../../interfaces/type-client.interface';
import { TypeClientService } from '../../../services/type-client.service';
import { IProfession } from '../../../interfaces/profession.interface';
import { ITypeSociete } from '../../../interfaces/type-societe.interface';
import { ITypeOp } from '../../../interfaces/type-op.interface';
import { Router } from '@angular/router';
import { clone } from 'lodash';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { NgFor, NgIf, NgSwitch, NgSwitchDefault } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { IOp, IOpCustom } from '../../../interfaces/op.interface';
import { OpService } from '../../../services/op.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    SharedModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchDefault,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
})
export class ClientComponent {
  cols: any[] = [];
  @ViewChild('dt') dt: any;
  @ViewChild('mapElement') mapElement!: ElementRef;

  submitted: boolean = false;
  titleHeader = 'New Client';
  clientDialog: boolean = false;

  clients$: Observable<IClient[]> | undefined;
  clients: IClient[] = [];
  client: any = {};
  selectedClients: IClient[] | undefined;

  opWithFilters$!: Observable<IOpCustom[]>;
  private opWithFiltersSubscription: Subscription | undefined;
  opWithFilters: IOpCustom[] = [];
  op: any = {};
  selectedopWithFilters: IOpCustom[] | undefined;

  ops$: Observable<IOp[]> | undefined;
  ops: IOp[] = [];
  selectedOps: IOp[] | undefined;

  isPersonne: boolean = false;
  isSociete: boolean = false;

  typeOps$!: Observable<ITypeOp[]>;
  typeOps: ITypeOp[] = [];

  typeClients$!: Observable<ITypeClient[]>;
  typeClients: ITypeClient[] = [];

  professions$!: Observable<IProfession[]>;
  professions: IProfession[] = [];

  typeSocietes$!: Observable<ITypeSociete[]>;
  typeSocietes: ITypeSociete[] = [];

  isLoading$: Observable<boolean> | undefined;
  isLoadingOps$: Observable<boolean> | undefined;

  disableAdd = false;
  loading: boolean = false;

  constructor(
    //private router: Router,
    @Inject(Router) private router: Router,
    private readonly store: Store,
    private typeClientService: TypeClientService,
    private clientService: ClientService,
    private opService: OpService,
    public appService: AppService,
    private messageService: MessageService
  ) {}

  ngBeforeViewInit() {
    this.client = {
      id: null,
      code: '',
      name: '',
      adresse: '',
      telephone: '',
      email: '',
      firstName: '',
      lastName: '',
      societe: '',
      sigle: '',
      typeClient: {
        id: null,
        name: '',
      },
    };
  }
  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'zoneName', header: 'ZONE', sort: true, filter: true },
      { field: 'sousZoneName', header: 'SOUS ZONE', sort: true, filter: true },
      { field: 'localiteName', header: 'LOCALITE', sort: true, filter: true },
      { field: 'pointName', header: 'PC', sort: true, filter: true },
      { field: 'typeOpName', header: 'TYPE OP', sort: true, filter: true },
      {
        field: 'name',
        header: 'ORGANISATION PAYSANNE',
        sort: true,
        filter: true,
      },
    ];
    this.initDispatch();
    //this.initSubscriptions();
    this.viderClient();
  }

  onCreateClient(client: IClient): void {
    this.store.dispatch(fromClients.createClient({ client }));
  }

  onUpdateClient(client: IClient): void {
    this.store.dispatch(fromClients.updateClient({ client }));
  }

  onDeleteClient(client: IClient): void {
    this.store.dispatch(fromClients.deleteClient({ client }));
  }

  onGetClient(id: number, listClients: IClient[]): any {
    const _Client = listClients.find((item) => item.id === id);
    //console.log(_Client);
    return _Client;
  }

  onGetPersonne(id: number, listPersonnes: IPersonne[]): any {
    const _Personne = listPersonnes.find((item) => item.id === id);
    //console.log(_Personne);
    return _Personne;
  }
  /*
  onGetPersonneByClient(id: number, listPersonnes: IPersonne[]): any {
    const _Personne = listPersonnes.find((item) => item.client.id === id)
    console.log(_Personne);
    return _Personne!;

    }
*/

  private initDispatch(): void {
    this.store.dispatch(fromClients.getClients());
    this.store.dispatch(fromOps.getOps());
    this.store.dispatch(fromPersonnes.getPersonnes());
    this.store.dispatch(fromSocietes.getSocietes());
    this.store.dispatch(fromTypeClients.getTypeClients());
    this.store.dispatch(fromTypeOps.getTypeOps());
    this.store.dispatch(fromTypeSocietes.getTypeSocietes());
    this.store.dispatch(fromProfessions.getProfessions());

    const myFilter: IFilter = {
      societeId: null,
      agenceId: null,
      pointId: null,
      typeOpId: null,
      opId: null,
    };

    myFilter.societeId = this.appService.getLocalselectedSocieteId();
    myFilter.agenceId = this.appService.getLocalselectedAgenceId();

    //console.log('myFilter before: ', myFilter);

    this.appService.removeNullProperties(myFilter);
    //console.log('myFilter after: ', myFilter);
    this.store.dispatch(
      fromOps.getAllOpWithFilters({
        filter: {
          ...myFilter,
        },
      })
    );
    this.opWithFilters$ = this.store.pipe(
      select(fromOps.selectOpWithFiltersList)
    );
  }

  private initSubscriptions(): void {
    this.clients$ = this.store.pipe(select(fromClients.selectClientsList));
    this.isLoading$ = this.store.pipe(
      select(fromClients.selectClientIsLoading)
    );

    this.ops$ = this.store.pipe(select(fromOps.selectOpsList));
    this.isLoadingOps$ = this.store.pipe(select(fromOps.selectOpIsLoading));

    this.typeOps$ = this.store.pipe(select(fromTypeOps.selectTypeOpsList));
    this.typeClients$ = this.store.pipe(
      select(fromTypeClients.selectTypeClientsList)
    );
    this.typeSocietes$ = this.store.pipe(
      select(fromTypeSocietes.selectTypeSocietesList)
    );
    this.professions$ = this.store.pipe(
      select(fromProfessions.selectProfessionsList)
    );

    this.clients$.subscribe((data: any[]) => {
      //this.clients = data;
      this.clients = data.map((device: any) => {
        return { ...device };
      });
      /*
      this.clients.forEach((item) => {
      console.log(item);
      });
      */
    });

    this.opWithFiltersSubscription = this.opWithFilters$.subscribe(
      (datas: any[]) => {
        if (datas) {
          this.opWithFilters = datas.map((device: any) => {
            return { ...device };
          });
        }
      }
    );

    this.ops$.subscribe((data: any[]) => {
      this.ops = data;
      this.ops = data.map((device: any) => {
        return { ...device };
      });
    });

    this.typeClients$.subscribe((data: any[]) => {
      this.typeClients = data.map((device: any) => {
        return { ...device };
      });

      /*
      this.typeClients.forEach((item) => {
      console.log(item);
      });
      */
    });

    this.typeOps$.subscribe((data: any[]) => {
      this.typeOps = data.map((device: any) => {
        return { ...device };
      });

      this.typeOps.forEach((item) => {
        console.log(item);
      });
    });

    this.typeSocietes$.subscribe((data: any[]) => {
      this.typeSocietes = data.map((device: any) => {
        return { ...device };
      });
      /*
    this.typeSocietes.forEach((item) => {
      console.log(item);

      });
     */
    });

    this.professions$.subscribe((data: any[]) => {
      this.professions = data.map((device: any) => {
        return { ...device };
      });
      /*
      this.professions.forEach((item) => {
      console.log(item);
      });
    */
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }
  openNew() {
    this.submitted = false;
    this.titleHeader = 'New Client';
    this.clientDialog = true;
    this.viderClient();
  }

  editClient(client: IClient) {
    this.client = { ...client };
    this.isPersonneOrSociete();
    console.log(' this.client    --- ', client);
    this.titleHeader = 'Update Client';
    this.clientDialog = true;
  }

  saveClient() {
    this.submitted = true;

    this.isPersonneOrSociete();
    console.log(' this.client    --- ', this.client);

    if (this.client.id) {
      console.log('Update this.client --- ', this.client);
      /* UPDATE CLIENT */
      // this.store.dispatch(fromPointServiceActions.updatePointService({ body }));
      this.store.dispatch(
        fromClients.updateClient({
          client: this.client,
        })
      );
      this.viderClient();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Client Updated',
        life: 3000,
      });
    } else {
      //this.client = {id: 1, code: '0009', name: 'Astou DIOP', adresse: 'ras', telephone: '0778451236', fax: '0778451236', email: 'i3fXU@example.com', typeClient: {id: 1, name: 'PERSONNE'} };
      console.log('Add this.client --- ', this.client);
      /* CREATE CLIENT */
      //this.store.dispatch(fromPointServiceActions.createPointService({ body }));
      this.store.dispatch(
        fromClients.createClient({
          client: this.client,
        })
      );
      this.viderClient();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Client Created',
        life: 3000,
      });
    }

    this.clients = [...this.clients];
    this.clientDialog = false;
  }

  isMoment(MyMomment: any) {
    const newDate = moment(MyMomment).format('DD/MM/YYYY');
    return newDate;
  }

  isMomentAutre(MyMomment: any) {
    const newDate = moment(MyMomment).format('YYYY-MM-DD');
    return newDate;
  }

  viderClient() {
    this.client = {
      id: null,
      code: '',
      name: '',
      adresse: '',
      telephone: '',
      email: '',
      firstName: '',
      lastName: '',
      profession: {
        id: null,
        name: '',
      },
      societe: '',
      sigle: '',
      typeSociete: {
        id: null,
        name: '',
        sigle: '',
      },
      typeClient: {
        id: null,
        name: '',
      },
    };

    this.isPersonneOrSociete();
    this.chargerClient();
  }

  chargerClient() {
    //this.initDispatch();
    this.initSubscriptions();
  }

  clear(table: Table) {
    table.clear();
  }
  detailClient(idClient: number): void {}

  onClicked(event: any) {
    console.log(event.value);
  }

  getValue($event: any): string {
    console.log(($event.target as HTMLInputElement).value);
    return ($event.target as HTMLInputElement).value;
  }

  onFilter(event: any, dt: any) {
    dt.filteredValues = event.filteredValue;
  }

  tableauPointServicesXLSX(): void {}

  onRowExpandRetourne(event: any): any {
    console.log('event   --- ', event.data);
    console.log('event.data --- ', event.data.id);
    console.log('event.data --- ', event.data.name);
  }

  onRowExpandRetournePersonne(event: any): any {
    console.log('event   --- ', event.data);
    console.log('event.data --- ', event.data.id);
    console.log('event.data --- ', event.data.name);

    if (event.data.typeClient.name === 'PERSONNE') {
      return null;
    }
  }

  onChangeTypeClient(event: any): void {
    console.log(event.value);
    console.log('event_id :' + event.value['id']);

    this.client.typeClient.id = event.value['id'];
    this.client.typeClient.name = event.value['name'];

    this.isPersonneOrSociete();
  }

  isPersonneOrSociete(): void {
    if (this.client.typeClient.name === 'PERSONNE') {
      this.client.name = this.client.firstName + ' ' + this.client.lastName;
      this.client.societe = '';
      this.client.sigle = '';
      this.client.typeSociete.id = null;
      this.client.typeSociete.name = '';
      this.isPersonne = true;
      this.isSociete = false;
    } else if (this.client.typeClient.name === 'SOCIETE') {
      this.client.name = this.client.sigle;
      this.client.firstName = '';
      this.client.lastName = '';
      this.client.profession.id = null;
      this.client.profession.name = '';
      this.isPersonne = false;
      this.isSociete = true;
    } else {
      this.client.name = '';
      this.isPersonne = false;
      this.isSociete = false;
    }
  }

  onClearTypeClient(): void {
    this.isPersonne = false;
    this.isSociete = false;
  }

  getTypeSociete(option: ITypeSociete): string {
    return option.sigle + ' ' + option.name;
  }

  showDetailClient(client: IClient) {
    if (!client) {
      this.messageService.add({
        severity: 'error',
      });
      return;
    }
    //console.log(client);
    this.clientService.editedClient = clone(client);
    this.router.navigate(['/credit']);
  }
}

export interface IFilter {
  societeId: number | null;
  agenceId: number | null;
  pointId: number | null;
  typeOpId: string | null;
  opId: number | null;
}
