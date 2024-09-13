import { Component } from '@angular/core';
import { SortEvent, SharedModule } from 'primeng/api';
import { Observable } from 'rxjs';
import { IClient } from '../../interfaces/client.interface';
import { select, Store } from '@ngrx/store';
import * as fromClients from '../../store/client';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

interface People {
  firstname?: string;
  lastname?: string;
  age?: string;
}

@Component({
    selector: 'app-filiere',
    templateUrl: './filiere.component.html',
    styleUrls: ['./filiere.component.css'],
    standalone: true,
    imports: [ToolbarModule, SharedModule, ButtonModule, TableModule]
})
export class FiliereComponent {

  tableData: People[] = [];
    cols: any[] = [];
    cols1: any[] = [];

    clients$!: Observable<IClient[]>;
    clients: IClient[] = [];
    isLoading$!: Observable<boolean>;

    constructor(private readonly store: Store) {}

    sortField: string = '';
    sortOrder: number = 1;
  
    ngOnInit() {
        this.cols1 = [
            { 
                field: 'firstname', 
                header: 'First Name' 
            },
            { 
                field: 'lastname', 
                header: 'Last Name' 
            },
            { 
                field: 'age', 
                header: 'Age' 
            },
        ];
        this.tableData = [
            {
                firstname: 'David',
                lastname: 'ace',
                age: '40',
            },
            {
                firstname: 'AJne',
                lastname: 'west',
                age: '40',
            },
            {
                firstname: 'Mak',
                lastname: 'Lame',
                age: '40',
            },
            {
                firstname: 'Peter',
                lastname: 'raw',
                age: '40',
            },
            {
                firstname: 'Kane',
                lastname: 'James',
                age: '40',
            },
            {
                firstname: 'Peter',
                lastname: 'raw',
                age: '40',
            },
            {
                firstname: 'Kane',
                lastname: 'James',
                age: '40',
            },
            {
                firstname: 'Peter',
                lastname: 'raw',
                age: '40',
            },
            {
                firstname: 'Kane',
                lastname: 'James',
                age: '40',
            },
            {
                firstname: 'Peter',
                lastname: 'raw',
                age: '40',
            },
            {
                firstname: 'Kane',
                lastname: 'James',
                age: '40',
            },
            {
                firstname: 'Peter',
                lastname: 'raw',
                age: '40',
            },
            {
                firstname: 'Kane',
                lastname: 'James',
                age: '40',
            },
        ];

        this.cols = [
          { field: 'id', header: 'id', sort: true},
          { field: 'code', header: 'code', sort: true},
          { field: 'telephone', header: 'telephone', sort: true},
          { field: 'email', header: 'email', sort: true},
    
    
          ];

          this.initDispatch();
          this.initSubscriptions();
          console.log(this.tableData);

          
    }

    private initDispatch(): void {
      this.store.dispatch(fromClients.getClients());
  }
  
  private initSubscriptions(): void {
      this.clients$ = this.store.pipe(select(fromClients.selectClientsList));
      this.isLoading$ = this.store.pipe(select(fromClients.selectClientIsLoading));
  
      this.clients$.subscribe(
        res => console.log(res),
      )
  
   
  
      this.clients$.subscribe((data) => {
        //this.clients = data;
        this.clients = data.map(device => {return {...device};});
       });

      
  }
}

