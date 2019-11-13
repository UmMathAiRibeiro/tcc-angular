import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeComponent } from "./home/home.component";
import { HttpModule } from "@angular/http";
import { IntegrantesComponent } from "./integrantes/integrantes.component";
import { AlimentacaoComponent } from "./alimentacao/alimentacao.component";
import { ReceitasComponent } from "./receitas/receitas.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    IntegrantesComponent,
    AlimentacaoComponent,
    ReceitasComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
