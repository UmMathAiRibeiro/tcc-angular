import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email_log;
  public senha_log;

  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('30015')) {
      this.router.navigate(['home'])
    }
  }

  logar() {
    if (this.email_log && this.senha_log) {
      let data = {
        email: this.email_log,
        senha: this.senha_log
      }

      this.service.logar(data).subscribe(res => {
        if (res.json().status == 200) {
          if (res.json().result[0].count == 1) {
            localStorage.setItem('user', res.json().nome[0].nome)
            localStorage.setItem('30015', '11100111')
            this.router.navigate(['home'])
          } else {
            swal('Atenção', 'Email ou senha incorretos', 'warning')
          }
        }
      })
    } else {
      swal('ERRO', 'Campos vazios', 'warning')
    }
  }
}
