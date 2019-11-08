import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";
import swal from "sweetalert";

@Component({
  selector: "app-integrantes",
  templateUrl: "./integrantes.component.html",
  styleUrls: ["./integrantes.component.css"]
})
export class IntegrantesComponent implements OnInit {
  public integrante = {
    iduser: sessionStorage.getItem(
      "01101001 01100100 01110101 01110011 01100101 01110010"
    ),
    nome: null,
    altura: null,
    peso: null,
    data_nasc: null,
    imc: null,
    classificacao: null,
    objetivo: null
  };

  @ViewChild("pesoAtual") pesoAtual: ElementRef;
  @ViewChild("alturaAtual") alturaAtual: ElementRef;
  public integrantes = [];
  public integranteAtual = [this.integrante];
  public nenhumIntegrante: boolean;

  constructor(private router: Router, private service: BackendService) {}

  ngOnInit() {
    if (
      !sessionStorage.getItem("01100011") &&
      !sessionStorage.getItem("01110101 01110011 01100101 01110010") &&
      !sessionStorage.getItem(
        "01101001 01100100 01110101 01110011 01100101 01110010"
      )
    ) {
      sessionStorage.removeItem("01100011");
      sessionStorage.removeItem("01110101 01110011 01100101 01110010");
      sessionStorage.removeItem(
        "01101001 01100100 01110101 01110011 01100101 01110010"
      );
      this.router.navigate([""]);
    }
    let data = {
      iduser: sessionStorage.getItem(
        "01101001 01100100 01110101 01110011 01100101 01110010"
      )
    };
    this.service.listarIntegrantes(data).subscribe(res => {
      if (res.json().status == 500) {
        swal(
          "ERRO",
          "Ocorreu um erro em nossos servidores por favor contate o suporte",
          "erro"
        );
      } else {
        res.json().result.forEach(integrante => {
          if (integrante.objetivo == "Ganhar peso") {
            integrante["peso_ideal"] = Math.round(
              19 * Math.pow(integrante.altura * 0.01, 2)
            );
          } else {
            integrante["peso_ideal"] = Math.round(
              25 * Math.pow(integrante.altura * 0.01, 2)
            );
          }
          this.integrantes.push(integrante);
        });
      }
    });
  }
  sair() {
    sessionStorage.removeItem("01100011");
    sessionStorage.removeItem("01110101 01110011 01100101 01110010");
    sessionStorage.removeItem(
      "01101001 01100100 01110101 01110011 01100101 01110010"
    );
    this.router.navigate([""]);
  }
  cadastroIntegrante() {
    this.imc();
    if (
      this.integrante.altura &&
      this.integrante.data_nasc &&
      this.integrante.iduser &&
      this.integrante.nome &&
      this.integrante.peso
    ) {
      this.service.cadastroIntegrante(this.integrante).subscribe(res => {
        if (res.json().status == 500) {
          swal(
            "ERRO",
            "Ocorreu um erro em nossos servidores, por favor contate o suporte",
            "erro"
          );
        } else {
          swal("SUCESSO", "Cadastro feito com sucesso", "success").then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      swal("ERRO", "Preencha todos os campos", "warning");
    }
  }

  imc() {
    this.integrante.imc =
      this.integrante.peso / Math.pow(this.integrante.altura * 0.01, 2); // Calcula o IMC do integrante
    if (this.integrante.imc < 17) {
      this.integrante.classificacao = "Muito abaixo do peso";
      this.integrante.objetivo = "Ganhar peso";
    } else if (this.integrante.imc >= 17 && this.integrante.imc < 18.5) {
      this.integrante.classificacao = "Abaixo do peso";
      this.integrante.objetivo = "Ganhar peso";
    } else if (this.integrante.imc >= 18.5 && this.integrante.imc < 25) {
      this.integrante.classificacao = "Peso normal";
      this.integrante.objetivo = "Manter peso";
    } else if (this.integrante.imc >= 25 && this.integrante.imc < 30) {
      this.integrante.classificacao = "Acima do peso";
      this.integrante.objetivo = "Perder peso";
    } else if (this.integrante.imc >= 30 && this.integrante.imc < 35) {
      this.integrante.classificacao = "Obesidade 1";
      this.integrante.objetivo = "Perder peso";
    } else if (this.integrante.imc >= 35 && this.integrante.imc < 40) {
      this.integrante.classificacao = "Obesidade 2(severa)";
      this.integrante.objetivo = "Perder peso";
    } else if (this.integrante.imc >= 40) {
      this.integrante.classificacao = "Obesidade 3(mórbida)";
      this.integrante.objetivo = "Perder peso";
    }
  }

  atualizarImc(peso, altura) {
    this.integranteAtual[0].imc = peso / Math.pow(altura * 0.01, 2); // Calcula o IMC do integrante
    if (this.integranteAtual[0].imc < 17) {
      this.integranteAtual[0].classificacao = "Muito abaixo do peso";
      this.integranteAtual[0].objetivo = "Ganhar peso";
    } else if (
      this.integranteAtual[0].imc >= 17 &&
      this.integranteAtual[0].imc < 18.5
    ) {
      this.integranteAtual[0].classificacao = "Abaixo do peso";
      this.integranteAtual[0].objetivo = "Ganhar peso";
    } else if (
      this.integranteAtual[0].imc >= 18.5 &&
      this.integranteAtual[0].imc < 25
    ) {
      this.integranteAtual[0].classificacao = "Peso normal";
      this.integranteAtual[0].objetivo = "Manter peso";
    } else if (
      this.integranteAtual[0].imc >= 25 &&
      this.integranteAtual[0].imc < 30
    ) {
      this.integranteAtual[0].classificacao = "Acima do peso";
      this.integranteAtual[0].objetivo = "Perder peso";
    } else if (
      this.integranteAtual[0].imc >= 30 &&
      this.integranteAtual[0].imc < 35
    ) {
      this.integranteAtual[0].classificacao = "Obesidade 1";
      this.integranteAtual[0].objetivo = "Perder peso";
    } else if (
      this.integranteAtual[0].imc >= 35 &&
      this.integranteAtual[0].imc < 40
    ) {
      this.integranteAtual[0].classificacao = "Obesidade 2(severa)";
      this.integranteAtual[0].objetivo = "Perder peso";
    } else if (this.integranteAtual[0].imc >= 40) {
      this.integranteAtual[0].classificacao = "Obesidade 3(mórbida)";
      this.integranteAtual[0].objetivo = "Perder peso";
    }
  }

  modalEditar(integrante) {
    this.integranteAtual = [integrante];
    document.getElementById("btnModalEditar").click();
  }

  atualizarIntegrante(id) {
    var peso = this.pesoAtual.nativeElement.value;
    var altura = this.alturaAtual.nativeElement.value;
    if (peso && altura) {
      this.atualizarImc(peso, altura);
      let data = {
        id: id,
        peso: peso,
        altura: altura,
        imc: this.integranteAtual[0].imc,
        classificacao: this.integranteAtual[0].classificacao,
        objetivo: this.integranteAtual[0].objetivo
      };
      console.log(data);
      this.service.atualizarIntegrante(data).subscribe(res => {
        if (res.json().status == 500) {
          swal(
            "ERRO",
            "Ocorreu um erro em nossos servidores, por favor contate o suporte",
            "error"
          );
        } else {
          swal("SUCESSO", "Integrante atualizado com sucesso", "success").then(
            () => {
              window.location.reload();
            }
          );
        }
      });
    } else {
      swal("ERRO", "Preencha todos os campos", "warning");
    }
  }

  deletarIntegrante(idintegrante) {
    swal({
      title: "Você tem certeza?",
      text:
        "Ao apertar em 'OK', você irá deletar o integrante (essa ação é irreversível)",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.service.deletarIntegrante(idintegrante).subscribe(res => {
          if (res.json().status == 500) {
            swal(
              "ERRO",
              "Ocorreu um erro em nossos servidores, por favor contate o suporte",
              "error"
            );
          } else {
            swal("SUCESSO", "Integrante deletado com sucesso", "success").then(
              () => {
                window.location.reload();
              }
            );
          }
        });
      }
    });
  }

  redirecionarAddIntegrante() {
    document.getElementById("AddIntegrante-tab").click();
  }
}
