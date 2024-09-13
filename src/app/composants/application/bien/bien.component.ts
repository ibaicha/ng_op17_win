import { Component, ElementRef, ViewChild } from '@angular/core';
import { LazyLoadEvent, SortEvent, MessageService, ConfirmationService, MenuItem, SharedModule } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import * as fromBiens from '../../../store/bien';
import { Observable, Subscription } from 'rxjs';
import { IBien, IBienAutomobile, IBienCommercial, IBienResidence } from '../../../interfaces/bien.interface';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../interfaces/client.interface';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NgIf, NgFor, NgSwitch, NgSwitchDefault } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-bien',
    templateUrl: './bien.component.html',
    styleUrls: ['./bien.component.css'],
    standalone: true,
    imports: [ToastModule, SharedModule, NgIf, ToolbarModule, ButtonModule, AccordionModule, ChipModule, TableModule, InputTextModule, NgFor, NgSwitch, NgSwitchDefault]
})
export class BienComponent {

  colsAutomobile: any[] = [];
  colsAutomobileCustom: any[] = [];
  colsResidence: any[] = [];
  colsResidenceCustom: any[] = [];
  colsCommercial: any[] = [];
  colsCommercialCustom: any[] = [];
  @ViewChild('dt') dt: any;
  @ViewChild('mapElement') mapElement!: ElementRef;

  biens$!: Observable<IBien[]>;
  private biensSubscription: Subscription | undefined;

  
  biens: IBien[] = [];
  bien: any = {};
  selectedBiens: IBien[] | undefined;
  isLoading$: Observable<boolean> | undefined;

  biensAutomobile: IBien[] = [];
  bienAutomobile: any = {}
  biensAutomobileCustom: IBienAutomobile[] = [];
  biensResidenceCustom: IBienResidence[] = [];
  biensCommercialCustom: IBienCommercial[] = [];

  biensResidence: IBien[] = [];
  bienResidence: any = {}

  biensCommercial: IBien[] = [];
  bienCommercial: any = {}

  client: any = {};



  isPersonne: boolean = false;
  isSociete: boolean = false;

  activeState: boolean[] = [false, false, false];
  activeIndex: number | undefined;

  chip_auto: string = '';
  chip_residence: string = '';
  chip_commercial: string = '';

  
  
  constructor(
    private readonly store: Store, 
    public clientService: ClientService,
    //private el:ElementRef, 
    private messageService: MessageService) {
      
      this.biens$ = this.store.pipe(select(fromBiens.selectBiensOnClient(this.clientService.editedClient!)));
    }
  
  ngBeforeViewInit () {
    

  }

  ngOnInit() {
//

this.colsAutomobile = [
  { field: 'id', header: 'ID', sort: false, filter: false},
  { field: 'code', header: 'CODE', sort: false, filter: false},
  { field: 'valeur', header: 'VALEUR', sort: true, filter: true},
  ];

  this.colsAutomobileCustom = [
    { field: 'id', header: 'ID', sort: false, filter: false},
    { field: 'code', header: 'CODE', sort: false, filter: false},
    { field: 'numero', header: 'NUMERO', sort: true, filter: false},
    { field: 'marque', header: 'MARQUE', sort: true, filter: true},
    { field: 'modele', header: 'MODELE', sort: true, filter: false},
    { field: 'utilisation', header: 'UTILISATION', sort: true, filter: false},
    { field: 'valeur', header: 'VALEUR', sort: true, filter: false},
    ];

    this.colsResidenceCustom = [
      { field: 'id', header: 'ID', sort: false, filter: false},
      { field: 'typeResidence', header: 'TYPE RESIDENCE', sort: true, filter: true},
      { field: 'typeConstruction', header: 'TYPE CONSTRUCTION', sort: true, filter: true},
      { field: 'superficie', header: 'SUPERFICIE', sort: true, filter: true},
      { field: 'valeur', header: 'VALEUR', sort: true, filter: true},
      ];

      this.colsCommercialCustom = [
        { field: 'id', header: 'ID', sort: false, filter: false},
        { field: 'name', header: 'NAME', sort: true, filter: true},
        { field: 'sigle', header: 'SIGLE', sort: true, filter: true},
        { field: 'superficie', header: 'SUPERFICIE', sort: true, filter: true},
        { field: 'typeSociete', header: 'TYPE SOCIETE', sort: true, filter: true},
        { field: 'valeur', header: 'VALEUR', sort: true, filter: true},


      ]

  this.colsResidence = [
    { field: 'id', header: 'ID', sort: false, filter: false},
    { field: 'code', header: 'CODE', sort: false, filter: false},
    { field: 'valeur', header: 'VALEUR', sort: true, filter: true},
    ];

    this.colsCommercial = [
      { field: 'id', header: 'ID', sort: false, filter: false},
      { field: 'code', header: 'CODE', sort: false, filter: false},
      { field: 'valeur', header: 'VALEUR', sort: true, filter: true},
      ];
    this.initDispatch();
    this.viderBien();
    
    this.client = this.clientService.editedClient;
    console.log('LINKED CLIENT',this.client)
    this.isPersonneOrSociete(this.client);

  }

  private initDispatch(): void {
    this.store.dispatch(fromBiens.getBiens());
    
}

private initSubscriptions(): void {
  
  //console.log('this.clientService.editedClient!: ', this.clientService.editedClient!);
  
  //this.biens$ = this.store.pipe(select(fromBiens.selectBiensOnClient(this.clientService.editedClient!)));
  this.biensSubscription = this.biens$.subscribe((datas: any[]) => {
    // Votre logique lors de la réception des biens
    this.biens = datas.map((device: any) => {return {...device};});

    console.log('this.biens: ', this.biens);

    this.biensAutomobile = datas.map((device: any) => {return {...device};}).filter((item: { typeBien: { name: string; }; }) => item.typeBien.name === 'AUTOMOBILE');
    this.biensResidence = datas.map((device: any) => {return {...device};}).filter((item: { typeBien: { name: string; }; }) => item.typeBien.name === 'RESIDENCE');
    this.biensCommercial = datas.map((device: any) => {return {...device};}).filter((item: { typeBien: { name: string; }; }) => item.typeBien.name === 'COMMERCIAL');
    console.log('this.biensCommercial: ', this.biensCommercial);
    /*
    this.biens.forEach((item) => {
    console.log(item);
    });
    */
    

    //this.bienAutomobile = this.biens.filter((item) => item.typeBien.name === 'AUTOMOBILE');
    //console.log('this.bienAutomobile: ', this.bienAutomobile);
    this.biensAutomobileCustom = [];
    this.biensAutomobile.forEach((item) => {
      this.biensAutomobileCustom.push(
        {
          id: item.id,
          code: item.code,
          numero: item.automobile.numero,
          marque: item.automobile.modeleAutomobile.marqueAutomobile.name,
          modele: item.automobile.modeleAutomobile.name,
          utilisation: item.automobile.utilisationAutomobile.name,
          valeur: item.valeur
          
        }
      );
      
      });

      if(this.biensAutomobileCustom.length == 0){
        this.chip_auto = 'my-chip_auto_empty';
      } else{
        this.chip_auto = 'my-chip_auto_not_empty';
      }

      //console.log('this.chip_auto: ', this.chip_auto);

      this.biensResidenceCustom = [];
      this.biensResidence.forEach((item) => {
        this.biensResidenceCustom.push(
          {
            id: item.id,
            adresse: item.residence.adresse,
            superficie: item.residence.superficie,
            typeResidence: item.residence.typeResidence.name,
            typeConstruction: item.residence.typeConstruction.name,
            valeur: item.valeur
          }
        );
      })

      if(this.biensResidenceCustom.length == 0){
        this.chip_residence = 'my-chip_residence_empty';
      } else{
        this.chip_residence = 'my-chip_residence_not_empty';
      }


      
      this.biensCommercialCustom = [];
      this.biensCommercial.forEach((item) => {
        this.biensCommercialCustom.push(
          {
            id: item.id,
            name: item.commercial.name,
            sigle: item.commercial.sigle,
            adresse: item.commercial.adresse,
            superficie: item.commercial.superficie,
            typeSociete: item.commercial.typeSociete.sigle,    
            valeur: item.valeur
          }
        );
      })

      console.log('this.biensCommercialCustom: ', this.biensCommercialCustom);

      if(this.biensCommercialCustom.length == 0){
        this.chip_commercial = 'my-chip_commercial_empty';
      } else{
        this.chip_commercial = 'my-chip_commercial_not_empty';
      }

      


  });

  
  this.isLoading$ = this.store.pipe(select(fromBiens.selectBienIsLoading));
    
/*
    this.biens$.subscribe((data) => {
      this.biens = data.map(device => {return {...device};});
      this.biens.forEach((item) => {
      console.log(item);
      });
      
     });
*/
     
}

viderBien (){
this.initSubscriptions();
//this.isPersonneOrSociete();
}

isPersonneOrSociete(client: IClient): void {
  if(client.typeClient.name === 'PERSONNE'){
    this.isPersonne = true;
    this.isSociete = false;

  

  }else if(client.typeClient.name === 'SOCIETE'){
    this.isPersonne = false;
    this.isSociete = true;

 
}   else{
    this.isPersonne = false;
    this.isSociete = false;
}

  
}

toggle(index: number) {

  this.activeState[index] = !this.activeState[index];
}

onTabShow(tabIndex: number) {
  // Mettez à jour l'état actif de chaque onglet en fonction de l'index passé en paramètre.
  this.activeState = this.activeState.map((state, index) => index === tabIndex);
}
  ngOnDestroy() {
    this.biensSubscription?.unsubscribe();
    this.biensAutomobileCustom = [];
    console.log('Component destroyed.');
  }

}
function HostListener(arg0: string, arg1: string[]): (target: BienComponent, propertyKey: "onBeforeUnload", descriptor: TypedPropertyDescriptor<(event: any) => void>) => void | TypedPropertyDescriptor<(event: any) => void> {
  throw new Error('Function not implemented.');
}

