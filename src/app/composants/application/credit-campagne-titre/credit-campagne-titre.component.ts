import { ChipModule } from 'primeng/chip';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-credit-campagne-titre',
  standalone: true,
  imports: [ToastModule, ToolbarModule, SharedModule, NgIf, ChipModule],
  templateUrl: './credit-campagne-titre.component.html',
  styleUrl: './credit-campagne-titre.component.css',
})
export class CreditCampagneTitreComponent implements OnInit {
  constructor(public router: Router, public loginService: LoginService,public appService: AppService,) {}

  ngOnInit() {}
}
