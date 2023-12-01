import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    constructor(private service: MessageService) {}

    info(msg: string, title: string = 'Info'): void {
        this.service.add({
            key: 'tst',
            severity: 'info',
            summary: title,
            detail: msg,
        });
    }

    warn(msg: string, title: string = 'Aviso!'): void {
        this.service.add({
            key: 'tst',
            severity: 'warn',
            summary: title,
            detail: msg,
        });
    }

    error(msg: string, title: string = 'Erro!'): void {
        this.service.add({
            key: 'tst',
            severity: 'error',
            summary: title,
            detail: msg,
        });
    }

    success(msg: string, title: string = 'Sucesso!'): void {
        this.service.add({
            key: 'tst',
            severity: 'success',
            summary: title,
            detail: msg,
        });
    }
}
