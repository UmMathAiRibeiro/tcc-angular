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
    iduser: localStorage.getItem('01101001 01100100 01110101 01110011 01100101 01110010'),
    nome: null,
    altura: null,
    peso: null,
    data_nasc: null,
    imc: null,
    classificacao: null,
    objetivo: null
  }

  constructor(private router: Router, private service: BackendService) { }

  ngOnInit() {
    if (localStorage.getItem('01100011') && localStorage.getItem('01110101 01110011 01100101 01110010') && localStorage.getItem('01101001 01100100 01110101 01110011 01100101 01110010')) {
    }
    else {
      localStorage.removeItem('01100011')
      localStorage.removeItem('user')
      localStorage.removeItem('iduser')
      this.router.navigate([''])
    }
  }
  sair() {
    localStorage.removeItem('01100011')
    localStorage.removeItem('user')
    localStorage.removeItem('iduser')
    window.location.reload();
  }
  cadastroIntegrante() {
    this.imc()
    if (this.integrante.altura && this.integrante.data_nasc && this.integrante.iduser
      && this.integrante.nome && this.integrante.peso) {
      this.service.cadastroIntegrante(this.integrante).subscribe(res => {
        if (res.json().status == 500) {
          swal("ERRO", 'Ocorreu um erro em nossos servidores, por favor contate o suporte', 'erro')
        } else {
          swal("SUCESSO", 'Cadastro feito com sucesso', "success")
        }
      })
    } else {
      swal('ERRO', 'Preencha todos os campos', 'warning');
    }
  }

  imc() {
    this.integrante.imc = this.integrante.peso / Math.pow((this.integrante.altura * 0.01), 2);// Calcula o IMC do integrante
    if (this.integrante.imc < 17) {
      this.integrante.classificacao = "Muito abaixo do peso"
      this.integrante.objetivo = "Ganhar peso"
    } else if (this.integrante.imc >= 17 && this.integrante.imc < 18.5) {
      this.integrante.classificacao = "Abaixo do peso"
      this.integrante.objetivo = "Ganhar peso"
    } else if (this.integrante.imc >= 18.5 && this.integrante.imc < 25) {
      this.integrante.classificacao = "Peso normal"
      this.integrante.objetivo = "Manter peso"
    } else if (this.integrante.imc >= 25 && this.integrante.imc < 30) {
      this.integrante.classificacao = "Acima do peso"
      this.integrante.objetivo = "Perder peso"
    } else if (this.integrante.imc >= 30 && this.integrante.imc < 35) {
      this.integrante.classificacao = "Obesidade 1"
      this.integrante.objetivo = "Perder peso"
    } else if (this.integrante.imc >= 35 && this.integrante.imc < 40) {
      this.integrante.classificacao = "Obesidade 2(severa)"
      this.integrante.objetivo = "Perder peso"
    } else if (this.integrante.imc >= 40) {
      this.integrante.classificacao = "Obesidade 3(mórbida)"
      this.integrante.objetivo = "Perder peso"
    }
  }
}
