import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuscaCepResponse } from '../models/busca-cep-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BuscaCepService {
    constructor(private http: HttpClient) {}

    url = environment.URL_BUSCA_CEP;

    buscaCep(cep: number): Observable<BuscaCepResponse> {
        return this.http.get<BuscaCepResponse>(this.url + `/${cep}` + '/json');
    }
}
