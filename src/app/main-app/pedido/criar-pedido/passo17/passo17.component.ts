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
    @ViewChild('upload', { static: false }) upload: FileUpload;

    images: File[] = [];
    visible = false;
    observation = '';

    constructor(
        public pedidoService: PedidoService,
        private imageService: ImageService,
        private toaster: ToasterService
    ) {}

    onFileSelect(event): void {
        const files = event.files; 
        this.images = [];
        for (let i = 0; i < files.length; i++) {
            this.images.push(files[i]);
        }
        this.enviarImagens();
    }

    enviarImagens(): void {
        if (this.images.length > 0) {
            const imagem = this.images[0];
            this.imageService.storeFile(imagem);
        }
    }

    nextTab(): void {
        this.enviarImagens();

        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }

    uploadFile(event: any) {
        this.images.push(event.files[0]);
        this.upload.disabled = false;
        this.imageService.storeFile(event.files[0]);
        this.toaster.success('Imagem enviada com sucesso');
    }

    show() {
        if(this.images.length > 0) {
            this.nextTab()
        }else{
            this.visible = true;
        }
    }

    naoContinuar(): void {
        this.visible = false
    }

    simContinuar(): void {
        this.nextTab()
        this.visible = false
    }

    updateObservation(): void {
        this.pedidoService.pedido.observation = this.observation
    }
}
