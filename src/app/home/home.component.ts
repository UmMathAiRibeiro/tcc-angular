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
    nome: localStorage.getItem('01110101 01110011 01100101 01110010')
  }
  constructor(private router: Router, private service: BackendService) { }

  ngOnInit() {
    if (localStorage.getItem('01100011') && localStorage.getItem('01110101 01110011 01100101 01110010') && localStorage.getItem('01101001 01100100 01110101 01110011 01100101 01110010')) {
    }
    else {
      localStorage.removeItem('01100011');
      localStorage.removeItem('user');
      localStorage.removeItem('iduser');
      this.router.navigate(['']);
    }
  }
  sair() {
    localStorage.removeItem('01100011');
    localStorage.removeItem('user');
    localStorage.removeItem('iduser');
    this.router.navigate(['']);
  }

}
