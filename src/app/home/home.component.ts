import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public usuario = {
    nome: sessionStorage.getItem('01110101 01110011 01100101 01110010')
  }
  constructor(private router: Router, private service: BackendService) { }

  ngOnInit() {
    if (sessionStorage.getItem('01100011') && sessionStorage.getItem('01110101 01110011 01100101 01110010') && sessionStorage.getItem('01101001 01100100 01110101 01110011 01100101 01110010')) {
    }
    else {
      sessionStorage.removeItem('01100011');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('iduser');
      this.router.navigate(['']);
    }
  }
  sair() {
    sessionStorage.removeItem('01100011');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('iduser');
    this.router.navigate(['']);
  }

}
