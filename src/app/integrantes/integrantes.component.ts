import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  public integrante = {
    iduser: localStorage.getItem('iduser'),
    nome: null,
    altura: null,
    peso: null,
    data_nasc: null,
    imc: null
  }

  constructor(private router: Router, private service: BackendService) { }

  ngOnInit() {
    if (localStorage.getItem('30015') && localStorage.getItem('user') && localStorage.getItem('iduser')) {
    }
    else {
      localStorage.removeItem('30015')
      localStorage.removeItem('user')
      localStorage.removeItem('iduser')
      this.router.navigate([''])
    }
  }
  sair() {
    localStorage.removeItem('30015')
    localStorage.removeItem('user')
    localStorage.removeItem('iduser')
    window.location.reload();
  }
  cadastroIntegrante() {
    this.integrante.imc = this.integrante.peso / Math.pow((this.integrante.altura * 0.01), 2);
    if (this.integrante.altura && this.integrante.data_nasc && this.integrante.iduser
      && this.integrante.imc && this.integrante.nome && this.integrante.peso) {
      this.service.cadastroIntegrante(this.integrante).subscribe(res => {
        if (res.json().status == 500) {
          swal("ERRO", 'Revise os campos', 'warning')
        } else {
          swal("SUCESSO", 'Cadastro feito com sucesso', "success")
        }
      })
    } else {
      swal('ERRO', 'Preencha todos os campos', 'warning');
    }
  }
}
