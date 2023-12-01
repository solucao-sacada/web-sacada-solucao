import { take, finalize } from 'rxjs';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscaCepService } from 'src/app/services/busca-cep.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToasterService } from 'src/app/components/toaster/toaster.service';

@Component({
    selector: 'app-passo1',
    templateUrl: './passo1.component.html',
    styles: [],
})
export class Passo1Component implements OnInit {
    @Input() form: FormGroup;
    @ViewChild('numeroInput') numeroInput!: ElementRef;

    constructor(
        private _buscaCep: BuscaCepService,
        private _loading: LoadingService,
        private _toaster: ToasterService
    ) {}

    ngOnInit(): void {
        this.form.get('CEP')?.valueChanges.subscribe((value) => {
            const cep = (value as string)
                .replace('.', '')
                .replace('-', '')
                .replace('_', '');
            if (cep.length > 7) {
                this.buscaCep(+cep);
                console.log(cep);
            }
        });
    }

    buscaCep(cep: number) {
        this._loading.start();
        this._buscaCep
            .buscaCep(cep)
            .pipe(
                take(1),
                finalize(() => this._loading.stop())
            )
            .subscribe((response) => {
                if (!response.erro) {
                    this.form.patchValue({
                        logradouro: response.logradouro,
                        bairro: response.bairro,
                        cidade: response.localidade,
                        estado: response.uf,
                    });
                    this.numeroInput.nativeElement.focus();
                } else {
                    this._toaster.warn('Cep não encontrado');
                }
            });
    }
}
