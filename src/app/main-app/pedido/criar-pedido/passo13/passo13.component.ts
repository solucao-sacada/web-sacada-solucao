import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { LocationP } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo13',
    templateUrl: './passo13.component.html',
    styles: [],
})
export class Passo13Component implements OnInit {
    @Output() isOk = new EventEmitter();

    qtdVidros = 0;

    vidrosRestantes: number;

    aberturas: LocationP[] = [];

    qtdPecas = this.pedidoService.getQtdPecas();

    optionsPieces: any[] = [];

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    ngOnInit() {
        this.qtdVidros = Math.abs(this.pedidoService.getQuantidadeTotalVidros())

        if(this.qtdVidros > 0){
            this.atualizarQtdVidrosRestantes();
            this.update();
            return
        }

        if(this.qtdVidros === 0){
            this.pedidoService.getObservable().subscribe({
                next: (pedido) => {
                 this.qtdVidros = this.pedidoService.getQuantidadeTotalVidros();
                 this.update();
                 this.atualizarQtdVidrosRestantes();
                }
            });
            return
        }
    }

    update() {
        this.qtdPecas = this.pedidoService.pedido.balcony.format;
        this.optionsPieces = [];
        for (let i = 1; i < this.qtdPecas + 1; i++) {
            this.optionsPieces.push({
                piece: i.toString(),
            });
        }
        this.verifyStep();
    }

    getVidroInicial(index: number): number {
        let ini = 0;
        for (let i = 0; i < index; i++) {
            ini +=
                +this.pedidoService.pedido.balcony.aperture.locations[i]
                    .glasses;
        }
        return ini;
    }

    setDistribuition(index: number) {
        return (this.pedidoService.pedido.balcony.aperture.locations[
            index
        ].distribution = `${this.getVidroInicial(index) + 1} a ${
            this.getVidroInicial(index) +
            +this.pedidoService.pedido.balcony.aperture.locations[index].glasses
        }`);
    }

    delete(index: number) {
        this.pedidoService.pedido.balcony.aperture.locations.splice(index, 1);
        this.atualizarQtdVidrosRestantes();
        this.pedidoService.setPedido(this.pedidoService.pedido);
        this.verifyStep();
    }

    atualizarQtdVidrosRestantes(): void {
        let qtdVidrosRestantes = this.qtdVidros;
        for (let i = 0; i < this.pedidoService.pedido.balcony.aperture.locations.length;i++) {
            const qtdVidros = +this.pedidoService.pedido.balcony.aperture.locations[i].glasses

            qtdVidrosRestantes -= qtdVidros;
        }

        this.vidrosRestantes = qtdVidrosRestantes
        this.verifyStep();
    }

    novaAbertura() {
        this.pedidoService.pedido.balcony.aperture.locations.push({
            tip: 'Abertura',
            distribution: '',
            door_distance: '40',
            glasses: '',
            piece: '',
            stacking: '',
        });
        this.verifyStep();
    }

    novoFixo() {
        this.pedidoService.pedido.balcony.aperture.locations.push({
            tip: 'Fixo',
            distribution: '',
            door_distance: '40',
            glasses: '',
            piece: '',
            stacking: '',
        });
        this.verifyStep();
    }

    nextTab(): void {
        this.verifyStep();
        if(this.pedidoService.pedido.balcony.aperture.locations.length > 0) {
            let isNotHaveStacking = false
            for(let location of this.pedidoService.pedido?.balcony.aperture.locations){
                let doorDistanceString = location.door_distance.toString();
                this.pedidoService.pedido.balcony.aperture.locations[0].door_distance = doorDistanceString
                if(location.stacking === 'Nenhum'){
                    isNotHaveStacking = true
                }
            }
            if(isNotHaveStacking){
                this._toaster.warn('Por favor, defina o tipo de empilhamento!');
                 return
            }
        }

        const mensagensAviso = [];
        if (this.vidrosRestantes < 0) {
            mensagensAviso.push(
                'Número de vidros distribuídos maior que o total disponível'
            );
        }

        if (this.vidrosRestantes > 0) {
            mensagensAviso.push('É necessário distribuir todas as peças');
        }

        if (
            this.pedidoService.pedido.balcony.aperture.locations.some(
                (linha) =>
                    !linha.glasses || !linha.piece || !linha.door_distance
            )
        ) {
            mensagensAviso.push('Por favor, preencha todos os campos');
        }

        if (mensagensAviso.length > 0) {
            mensagensAviso.forEach((mensagem) => {
                this._toaster.warn(mensagem);
            });
        } else {
            this.pedidoService.nextTab();
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }

    verifyStep(): void {

        if (this.vidrosRestantes < 0) {
            this.isOk.emit(false);
        } else if (this.vidrosRestantes > 0) {
            this.isOk.emit(true);
        } else if (
            this.pedidoService.pedido.balcony.aperture.locations.some(
                (linha) =>
                    !linha.glasses || !linha.piece || !linha.door_distance
            )
        ) {
            this.isOk.emit(false);
        } else {
            this.isOk.emit(true);
        }
    }
}
