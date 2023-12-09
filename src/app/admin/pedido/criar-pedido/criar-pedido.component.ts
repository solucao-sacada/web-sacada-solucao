import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent {
    pedido: Pedido = {
        passo2: {
            better_adjustment: false,
            defined: {
                glass_quantity: null,
                isDefined: false,
            },
        },
        passo3: {
            cor_vidro: null,
            espessura_vidro: null,
            tipo_vidro: null,
            identificacao_cor: null,
        },
        passo4: {
            cor_aluminio: null,
            identificacao_cor: null,
        },
        passo5: {
            formato_sacada: null,
            quantidade_aluminio: null,
            quantidade_vidro: null,
        },
        passo6: {
            alinhamento_viga: null,
        },
        passo7: {
            tipo_aba: null,
        },
    };

    pedidoJson: PedidoJson = {
        accessories: {
            aparador_aluminio: false,
            aparador_inox: true,
            selante: true,
        },
        balcony: {
            aluminium: {
                color: {
                    black: false,
                    bz1001: false,
                    bz1002: false,
                    bz1003: false,
                    mat: false,
                    white: true,
                },
            },
            aperture: {
                inside: true,
                locations: [
                    {
                        distribution: '1 a 11',
                        door_distance: '40',
                        glasses: '11',
                        piece: '1',
                        stacking: 'À Esquerda',
                        tip: 'Abertura',
                    },
                    {
                        distribution: '12 a 15',
                        door_distance: '40',
                        glasses: '4',
                        piece: '1',
                        stacking: 'À Direita',
                        tip: 'Abertura',
                    },
                ],
                outside: false,
            },
            beam: {
                position: {
                    aligned: true,
                    inside: false,
                    outside: false,
                },
            },
            dimensions: {
                data: [
                    ['1', '90.00', '6310', '11'],
                    ['2', '90.00', '2005', '4'],
                ],
                total: '90.00',
            },
            glass: {
                color: {
                    bronze: false,
                    colorless: true,
                    green: false,
                    tinted: false,
                },
                laminated: false,
                tempered: true,
                thickness: {
                    '10mm': false,
                    '8mm': true,
                },
            },
            levels: {
                full_aperture: '1080',
                measures: {
                    data: [['1000', '80']],
                    highest_ceiling: '1000',
                    highest_floor: '80',
                    lower_ceiling: '1000',
                    lower_floor: '80',
                },
            },
            lock: {
                fechadura_para_porta: false,
                fechadura_vidro_vidro: true,
            },
            plumb: {
                left_wall: {
                    bottom: '0',
                    top: '0',
                },
                right_wall: {
                    bottom: '0',
                    top: '0',
                },
            },
            rails: {
                lower_rail: {
                    built_in: {
                        ref: {
                            A: false,
                            B: false,
                            C: false,
                            other: false,
                        },
                        tip: {
                            A: false,
                            B: false,
                            C: false,
                            D: false,
                        },
                    },
                    normal: {
                        tip: {
                            A: false,
                            B: false,
                            C: false,
                            other: false,
                        },
                    },
                    tab: {
                        inside: false,
                        outside: false,
                        tip: {
                            A: false,
                            B: false,
                            C: false,
                            D: false,
                            E: false,
                        },
                    },
                    tip: {
                        built_in: false,
                        normal: false,
                        tab: false,
                    },
                },
                upper_rail: {
                    tab: {
                        inside: false,
                        outside: false,
                    },
                    tip: {
                        normal: true,
                        tab: false,
                    },
                },
            },
            tip: {
                better_adjustment: false,
                defined: {
                    glass_quantity: '15',
                    isDefined: true,
                },
            },
            format: null,
        },
        client: {
            address: 'X',
            apartment: 'X',
            building: 'VIDROALTO',
            city: 'X',
            name: 'TRISSIA CHURRASQUEIRA',
            neighborhood: 'X',
            state: 'SC',
        },
        technician: 'solução sacadas - DENISE SOUZA',
    };

    activeIndex: number = 0;
    form1: FormGroup = this._fb.group({
        nomeCliente: ['', Validators.required],
        CEP: [null, Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        apLojaCasa: ['', Validators.required],
        nomeEdificio: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        idOrcamento: [''],
    });

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {}

    print(): void {
        console.info(this.form1.getRawValue());
    }

    nextTab(): void {
        this.activeIndex += 1;
    }
    prevTab(): void {
        if (this.activeIndex > 0) this.activeIndex -= 1;
    }

    show() {
        console.log(this.pedidoJson);
    }
}
