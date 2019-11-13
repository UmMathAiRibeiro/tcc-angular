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
  public receitasBanco = [];
  public ingredienteSelecionado;
  public receitas = [];
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
    ingredientes: this.ingredidenteEmUso,
    porcoes: null
  };
  public contador_receita = 1;
  public receitasFiltro;
  public receitasFitradas = [];
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
          this.receitasBanco.push(receita);
        });
      }
      var ultimaReceita;
      this.receitasBanco.forEach(receitaBanco => {
        if (this.receitas.length > 0) {
          this.receitas.forEach(receitas => {
            if (ultimaReceita != receitaBanco.receita_id) {
              ultimaReceita = receitaBanco.receita_id;
              if (receitaBanco.receita_id != receitas.receita_id) {
                this.receitas.push({
                  receita_id: receitaBanco.receita_id,
                  nome_receita: receitaBanco.nome_receita,
                  calorias: receitaBanco.calorias,
                  porcoes: receitaBanco.porcoes,
                  modo_preparo: receitaBanco.modo_preparo,
                  ingredientes: []
                });
              }
            }
          });
        } else {
          ultimaReceita = receitaBanco.receita_id;
          this.receitas.push({
            receita_id: receitaBanco.receita_id,
            nome_receita: receitaBanco.nome_receita,
            calorias: receitaBanco.calorias,
            porcoes: receitaBanco.porcoes,
            modo_preparo: receitaBanco.modo_preparo,
            ingredientes: []
          });
        }
      });
      this.receitas.forEach(receita => {
        receita["kcal_p_p"] = Math.round(receita.calorias / receita.porcoes);
        var ingredienteReceita = [];
        this.receitasBanco.forEach(ingrediente => {
          if (receita.receita_id == ingrediente.receita_id) {
            ingredienteReceita.push({
              nome_ingrediente: ingrediente.nome_ingrediente,
              qtde: ingrediente.qtde,
              tipo_und: ingrediente.tipo_und,
              cal_p_und: ingrediente.cal_p_und
            });
          }
        });
        receita.ingredientes = ingredienteReceita;
      });
    });
    this.receitasFitradas = this.receitas;
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
            document.getElementById("fecharModalIngredientes").click();
            this.ingredientes = [];
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
      calorias: calorias,
      porcoes: this.nova_receita.porcoes
    };
    if (
      data.id_receita &&
      data.ingredientesEmUso &&
      data.modo_preparo &&
      data.nome &&
      data.porcoes
    ) {
      swal({
        title: "Quantidade de calorias",
        text:
          "A sua receita tem aproximadamente " +
          data.calorias +
          "kcal ao total, deseja continuar?",
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
    } else {
      swal("ERRO", "Preencha todos os campos", "warning");
    }
  }
  pesquisar_receitas() {
    this.receitasFiltro = this.receitasFiltro.trim();
    let radios = document.getElementsByName("radio-filtro");
    let tipo;
    let u_element;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i]["checked"]) {
        tipo = radios[i]["value"];
      }
    }
    this.receitasFitradas = [];
    if (!this.receitasFiltro) {
      this.receitasFitradas = this.receitas;
    } else {
      for (let index = 0; index < this.receitas.length; index++) {
        const element = this.receitas[index];
        if (tipo == "receita") {
          if (element.nome_receita.includes(this.receitasFiltro)) {
            this.receitasFitradas.push(element);
          }
        } else if (tipo == "ingrediente") {
          element.ingredientes.forEach(ingrediente => {
            if (u_element != element) {
              if (ingrediente.nome_ingrediente.includes(this.receitasFiltro)) {
                u_element = element;
                this.receitasFitradas.push(element);
              }
            }
          });
        } else if (tipo == "calorias") {
          console.log(element.kcal_p_p);
          if (element.kcal_p_p < this.receitasFiltro) {
            this.receitasFitradas.push(element);
          }
        }
      }
    }
    if (this.receitasFitradas.length == 0) {
      swal("ERRO", "Não foi encontrada receitas nesse parametros", "warning");
    }
  }
}
