import { Component, OnInit } from "@angular/core";
import { BackendService } from "../backend.service";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: "app-receitas",
  templateUrl: "./receitas.component.html",
  styleUrls: ["./receitas.component.css"]
})
export class ReceitasComponent implements OnInit {
  public ingredientes = [];
  public receitas = [];
  public ingredienteSelecionado;
  public ingredidenteEmUso = [];
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
    this.service.selecionaIngredientes().subscribe(res => {
      if (res.json().status == 500) {
        swal(
          "ERRO",
          "Ocorreu um erro em nossos servidores por favor contate o suporte",
          "error"
        );
      } else {
        res.json().result.forEach(ingrediente => {
          this.ingredientes.push(ingrediente);
        });
      }
    });
    this.service.listarReceitas().subscribe(res => {
      if (res.json().status == 500) {
        swal(
          "ERRO",
          "Ocorreu um erro em nossos servidores por favor contate o suporte",
          "error"
        );
      } else {
        res.json().result.forEach(receita => {
          this.receitas.push(receita);
        });
      }
      console.log(this.receitas);
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

  addIngredienteReceita(id_ingrediente) {
    this.ingredientes.forEach(ingrediente => {
      if (ingrediente.id == id_ingrediente) {
        this.ingredidenteEmUso.push(ingrediente);
      }
    });
  }

  retirarIngrediente(id_ingrediente) {
    let contador = -1;
    this.ingredidenteEmUso.forEach(ingrediente => {
      contador++;
      if (ingrediente.id == id_ingrediente) {
        this.ingredidenteEmUso.splice(contador, 1);
        id_ingrediente = -10;
      }
    });
  }
}
