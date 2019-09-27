import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  public altura;

  constructor(private router: Router) { }

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
  testar() {
    console.log(this.altura * 0.01);
  }
}
