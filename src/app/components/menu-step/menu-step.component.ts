import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-menu-step',
    templateUrl: './menu-step.component.html',
    styleUrls: ['./menu-step.component.scss'],
})
export class MenuStepComponent {
    @Input() title = '';
    @Input() step = '';
    @Input() urlVideo =
        'https://www.youtube.com/embed/u46qWPLSf6I?si=Wl21DMwyFBaEXemT';

    @Output() limpar = new EventEmitter();

    visible = false;
    items = [
        {
            label: 'Opções',
            items: [
                {
                    label: 'Limpar Passo',
                    icon: 'pi pi-times',
                    command: () => {
                        this.limpar.emit();
                    },
                },
                {
                    label: 'Zerar Checklist',
                    icon: 'pi pi-times',
                    command: () => {},
                },
            ],
        },
        {
            label: 'Dúvidas',
            items: [
                {
                    label: 'WhatsApp',
                    icon: 'pi pi-whatsapp',
                    command: () => {
                        this.pedidoService.sendMessageQuestion(this.step);
                    },
                },
                {
                    label: 'Video',
                    icon: 'pi pi-video',
                    command: () => {
                        this.visible = true;
                    },
                },
            ],
        },
    ];

    constructor(public pedidoService: PedidoService) {}
}
