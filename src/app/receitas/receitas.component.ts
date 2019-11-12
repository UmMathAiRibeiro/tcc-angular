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
  public novo_ingrediente = {
    nome: null,
    cal_p_und: null,
    tipo_und: null
  };
  public nova_receita = {
    nome: null,
    modo_preparo: null,
    calorias: null,
    ingredientes: this.ingredidenteEmUso
  };
  public contador_receita = 1;
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
          ingrediente["qtde"] = 1;
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
          this.contador_receita++;
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
  adicionarIngredientes() {
    let data = this.novo_ingrediente;
    this.service.adicionarIngredientes(data).subscribe(res => {
      if (res.json().status == 500) {
        swal(
          "ERRO",
          "Ocorreu um erro em nossos servidores por favor contate o suporte",
          "error"
        );
      } else {
        swal("SUCESSO", "Ingrediente cadastrado com sucesso", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    });
  }
  adicionarReceita() {
    let idreceita = this.contador_receita;
    let calorias = 0;
    this.ingredidenteEmUso.forEach(ingredientes => {
      calorias += ingredientes.cal_p_und * ingredientes.qtde;
    });
    let data = {
      id_receita: idreceita,
      ingredientesEmUso: this.ingredidenteEmUso,
      nome: this.nova_receita.nome,
      modo_preparo: this.nova_receita.modo_preparo,
      calorias: calorias
    };
    swal({
      title: "Quantidade de calorias",
      text:
        "A sua receita tem aproximadamente " +
        data.calorias +
        ", deseja continuar?",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.service.adicionarReceitas(data).subscribe(res => {
          if (res.json().status == 500) {
            swal(
              "ERRO",
              "Ocorreu um erro em nossos servidores por favor contate o suporte",
              "error"
            );
          } else {
            swal("SUCESSO", "Receita cadastrada com sucesso", "success").then(
              () => {
                window.location.reload();
              }
            );
          }
        });
      }
    });
  }
}
