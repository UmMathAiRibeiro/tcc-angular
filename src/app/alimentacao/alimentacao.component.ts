import { Router } from "@angular/router";
import { BackendService } from "./../backend.service";
import { Component, OnInit } from "@angular/core";
import swal from "sweetalert";

@Component({
  selector: "app-alimentacao",
  templateUrl: "./alimentacao.component.html",
  styleUrls: ["./alimentacao.component.css"]
})
export class AlimentacaoComponent implements OnInit {
  public integrantes = [];

  constructor(private service: BackendService, private router: Router) {}
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
          integrante["peso_ideal"] = Math.round(
            21 * Math.pow(integrante.altura * 0.01, 2)
          );
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
  redirecionarAddIntegrante() {
    this.router.navigate(["integrantes"]);
  }
}
