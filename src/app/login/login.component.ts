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
    if (sessionStorage.getItem('01100011') && sessionStorage.getItem('01110101 01110011 01100101 01110010') && sessionStorage.getItem('01101001 01100100 01110101 01110011 01100101 01110010')) {
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
        if (res.json().status === 500) {
          swal('ERRO', 'Ocorreu um erro em nossos servidos, entre em contato com o suporte :' + res.json().err.code, 'error')
        } else {
          if (res.json().logado) {
            sessionStorage.setItem('01100011', '01101100 01101111 01100111 01100001 01100100 01101111');
            sessionStorage.setItem('01110101 01110011 01100101 01110010', res.json().usuario);
            sessionStorage.setItem('01101001 01100100 01110101 01110011 01100101 01110010', res.json().iduser);
            this.router.navigate(['home'])
          }
          if (res.json().errado) {
            swal('ERRO', res.json().errado, 'warning');
          }
        }
      })
    } else {
      swal('ERRO', 'Campos vazios', 'warning')
    }
  }
}
