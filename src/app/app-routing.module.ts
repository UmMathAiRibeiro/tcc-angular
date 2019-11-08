import { ReceitasComponent } from "./receitas/receitas.component";
import { AlimentacaoComponent } from "./alimentacao/alimentacao.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { IntegrantesComponent } from "./integrantes/integrantes.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "integrantes", component: IntegrantesComponent },
  { path: "alimentacao", component: AlimentacaoComponent },
  { path: "receitas", component: ReceitasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
