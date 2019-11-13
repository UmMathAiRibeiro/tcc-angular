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
          "error"
        );
      } else {
        res.json().result.forEach(integrante => {
          integrante["idade"] =
            new Date().getFullYear() - integrante.data_nasc.split("-")[0];
          if (integrante.sexo == "Masculino") {
            integrante["TMB"] = Math.round(
              1.2 *
                (66.5 +
                  13.8 * integrante.peso +
                  5 * integrante.altura -
                  6.8 * integrante["idade"])
            );
          } else {
            integrante["TMB"] = Math.round(
              1.2 *
                (665 +
                  9.6 * integrante.peso +
                  1.8 * integrante.altura -
                  4.7 * integrante["idade"])
            );
          }
          if (integrante.objetivo == "Ganhar peso") {
            integrante["peso_ideal"] = Math.round(
              19 * Math.pow(integrante.altura * 0.01, 2)
            );
            integrante["kcal_p_d"] = Math.round(integrante["TMB"] + 500);
          } else if (integrante.objetivo == "Perder peso") {
            integrante["peso_ideal"] = Math.round(
              25 * Math.pow(integrante.altura * 0.01, 2)
            );
            integrante["kcal_p_d"] = Math.round(integrante["TMB"] - 500);
          } else if (integrante.objetivo == "Manter peso") {
            integrante["peso_ideal"] = Math.round(
              25 * Math.pow(integrante.altura * 0.01, 2)
            );
            integrante["kcal_p_d"] = Math.round(integrante["TMB"]);
          }
          this.integrantes.push(integrante);
        });
      }
      console.log(this.integrantes);
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
