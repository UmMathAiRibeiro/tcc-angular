import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

const URL = 'http://localhost:3005' //endereço do server


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: Http) { }

    //login
    logar(data) {
        return this.http.post(URL + '/login', data)
    }
    cadastro(data) {
        return this.http.post(URL + '/cadastro', data)
    }
    //---------------------------------------------------

    //home

}