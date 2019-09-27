import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public usuario = {
    nome: null,
    user: null,
    email: null,
    confirmEmail: null,
    senha: null,
    confirmSenha: null,
  }


  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
  }
  cadastrar() {
    if (this.usuario.email && this.usuario.senha && this.usuario.confirmEmail && this.usuario.confirmSenha && this.usuario.nome) {
      if (this.usuario.senha == this.usuario.confirmSenha && this.usuario.email == this.usuario.confirmEmail) {
        let data = {
          nome: this.usuario.nome,
          user: this.usuario.user,
          email: this.usuario.email,
          senha: this.usuario.senha,
        }
        this.service.cadastro(data).subscribe(res => {
          if (res.json().status == 500) {
            swal("ERRO", 'Revise os campos', 'warning')
          } else {
            swal("SUCESSO", 'Cadastro feito com sucesso', "success")
            this.router.navigate(['']);
          }
        })

      } else {
        swal("ERRO", 'As senhas ou os emails não coincidem', 'warning')
      }

    } else {
      console.log(this.usuario)
      swal('ERRO', 'Campos vazios', 'warning')
    }
  }

}
