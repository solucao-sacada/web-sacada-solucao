import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrcamentoRequestModel } from '../models/orcamento';

@Injectable({
    providedIn: 'root',
})
export class OrcamentoService {
    apiUrl = environment.API_URL + '/budgets';

    constructor(private http: HttpClient) {}

    create({
        idUser,
        area,
        pricePlates,
        priceGlasses,
        priceAcessories,
        priceProlongador,
        chapaInferior,
        chapaSuperior,
        qtdAparador,
        emailClient,
        qtdProlongador,
        qtdSelante,
        client,
        height,
        width,
        address,
        selante,
        price,
        aparador,
        prolongador,
        priceKitSolutions,
    }: OrcamentoRequestModel): Observable<any> {
        return this.http.post<any>(this.apiUrl, {
            idUser,
            area,
            pricePlates,
            priceGlasses,
            priceAcessories,
            priceProlongador,
            chapaInferior,
            chapaSuperior,
            qtdAparador,
            qtdProlongador,
            qtdSelante,
            height,
            width,
            selante,
            price,
            aparador,
            prolongador,
            priceKitSolutions,
            client:{
                name: client,
                email: emailClient,
                address
            }
        });
    }

    list(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    listByClient(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/client/${id}`);
    }
}
