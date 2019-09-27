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
    nome: localStorage.getItem('user')
  }
  constructor(private router: Router, private service: BackendService) { }

  ngOnInit() {
    if (localStorage.getItem('30015')) {
    }
    else {
      this.router.navigate([''])
    }

  }
  sair() {
    localStorage.removeItem('30015')
    localStorage.removeItem('user')
    window.location.reload();
  }

}
