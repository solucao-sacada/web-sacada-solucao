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

    create(orcamento: OrcamentoRequestModel): Observable<any> {
        return this.http.post<any>(this.apiUrl, orcamento);
    }

    list(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    listByClient(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/client/${id}`);
    }
}
