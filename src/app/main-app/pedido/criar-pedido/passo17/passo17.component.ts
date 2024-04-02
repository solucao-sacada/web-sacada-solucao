import { Component, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo17',
    templateUrl: './passo17.component.html',
    styles: [],
})
export class Passo17Component {
    @ViewChild('upload') upload: FileUpload;
    constructor(
        public pedidoService: PedidoService,
        private imageService: ImageService,
        private toaster: ToasterService
    ) {}

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }

    uploadFile(event: any) {
        this.imageService.storeFile(event.files[0]);
        this.upload.disabled = true;
        this.toaster.success('Imagem enviada com sucesso');
    }
}
