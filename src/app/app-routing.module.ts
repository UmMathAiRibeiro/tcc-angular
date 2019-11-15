import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlimentacaoComponent } from "./alimentacao/alimentacao.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeComponent } from "./home/home.component";
import { IntegrantesComponent } from "./integrantes/integrantes.component";
import { LoginComponent } from "./login/login.component";
import { ReceitasComponent } from "./receitas/receitas.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "integrantes", component: IntegrantesComponent },
  { path: "alimentacao", component: AlimentacaoComponent },
  { path: "receitas", component: ReceitasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
