import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";
import swal from "sweetalert";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public usuario = {
    nome: sessionStorage.getItem("01110101 01110011 01100101 01110010")
  };
  public integrantes = [];
  public n_integrantes = 0;
  public receitas = 0;

  constructor(private service: BackendService, private router: Router) { }
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
          this.n_integrantes++;
          this.integrantes.push(integrante);
        });
      }
    });
    this.service.contarReceitas().subscribe(res => {
      if (res.json().status == 500) {
        swal(
          "ERRO",
          "Ocorreu um erro em nossos servidores por favor contate o suporte",
          "error"
        );
      } else {
        this.receitas = res.json().result[0]['count(*)']
      }
    })
  }
  sair() {
    sessionStorage.removeItem("01100011");
    sessionStorage.removeItem("01110101 01110011 01100101 01110010");
    sessionStorage.removeItem(
      "01101001 01100100 01110101 01110011 01100101 01110010"
    );
    this.router.navigate([""]);
  }
}
