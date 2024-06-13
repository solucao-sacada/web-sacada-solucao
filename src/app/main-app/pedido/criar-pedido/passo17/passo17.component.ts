import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo17',
    templateUrl: './passo17.component.html',
    styles: [
        `
        .image-preview {
            text-align: center;
        }

        .img-responsive {
            max-width: 70%;
            height: 10rem;
            margin: 1rem;
        }
        .delete-icon {
            position: absolute;
            font-size: 1em;
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .delete-icon:hover {
            opacity: 0.8;
        }
        `
    ],
})
export class Passo17Component {
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    images: File[] = [];
    visible = false;
    observation = '';

    constructor(
        public pedidoService: PedidoService,
        private imageService: ImageService,
        private toaster: ToasterService
    ) { }

    openFilePicker(): void {
        this.fileInput.nativeElement.click();
    }

    handleFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = input.files;
        if (files && files.length > 0) {
            this.images = [];
            for (let i = 0; i < files.length; i++) {
                this.images.push(files[i]);
            }
            this.sendImages();
        }
    }

    getImageUrl(): any {
        if (this.images.length > 0) {
            return URL.createObjectURL(this.images[0]);
        }
        return '';
    }

    deleteImage(): void {
        this.images = [];
    }

    sendImages(): void {
        const imagem = this.images[0];
        this.imageService.storeFile(imagem);
    }

    nextTab(): void {
        this.sendImages();
        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }

    uploadFile(event: any): void {
        const files = event.target.files;
        if (files && files.length > 0) {
            this.images.push(files[0]);
            this.imageService.storeFile(files[0]);
            this.toaster.success('Imagem enviada com sucesso');
            (event.target as HTMLInputElement).value = '';
        }
    }

    show(): void {
        if (this.images.length > 0) {
            this.nextTab();
        } else {
            this.visible = true;
        }
    }

    naoContinuar(): void {
        this.visible = false;
    }

    simContinuar(): void {
        this.nextTab();
        this.visible = false;
    }

    updateObservation(): void {
        this.pedidoService.pedido.observation = this.observation;
    }
}
