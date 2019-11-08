import { Component, OnInit } from "@angular/core";
import { BackendService } from "../backend.service";
import swal from "sweetalert";
import { Router } from "@angular/router";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {
  public usuario = {
    nome: null,
    user: null,
    email: null,
    confirmEmail: null,
    senha: null,
    confirmSenha: null
  };

  constructor(private service: BackendService, private router: Router) {}

  ngOnInit() {
    if (
      sessionStorage.getItem("01100011") &&
      sessionStorage.getItem("01110101 01110011 01100101 01110010") &&
      sessionStorage.getItem(
        "01101001 01100100 01110101 01110011 01100101 01110010"
      )
    ) {
      this.router.navigate(["home"]);
    }
  }
  cadastrar() {
    if (
      this.usuario.email &&
      this.usuario.senha &&
      this.usuario.confirmEmail &&
      this.usuario.confirmSenha &&
      this.usuario.nome
    ) {
      if (
        this.usuario.senha == this.usuario.confirmSenha &&
        this.usuario.email == this.usuario.confirmEmail
      ) {
        let data = {
          nome: this.usuario.nome,
          user: this.usuario.user,
          email: this.usuario.email,
          senha: this.usuario.senha
        };
        this.service.cadastro(data).subscribe(res => {
          if (res.json().status != 200) {
            swal(
              "ERRO",
              "Ocorreu algum erro em nossos servidores, entre em contado com o suporte",
              "error"
            );
          } else {
            if (res.json().email) {
              swal("ERRO", res.json().email, "warning");
            } else {
              swal("SUCESSO", "Cadastro feito com sucesso", "success").then(
                () => {
                  this.router.navigate([""]);
                }
              );
            }
          }
        });
      } else {
        swal("ERRO", "As senhas ou os emails não coincidem", "warning");
      }
    } else {
      console.log(this.usuario);
      swal("ERRO", "Campos vazios", "warning");
    }
  }
}
