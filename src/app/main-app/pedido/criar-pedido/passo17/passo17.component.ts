import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

    images: (File | string)[] = [];  // Pode conter arquivos ou URLs de imagens
    visible = false;
    observation = '';

    constructor(
        public pedidoService: PedidoService,
        private imageService: ImageService,
        private toaster: ToasterService
    ) { }

    async openCamera() {
        try {
            const permission = await Camera.requestPermissions();
            if (permission.camera === 'granted') {
                const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: false,
                    resultType: CameraResultType.DataUrl,  // Usar DataUrl para facilitar a conversão
                    source: CameraSource.Camera
                });

                if (image.dataUrl) {
                    // Converte a imagem DataUrl para Blob e então para File
                    const response = await fetch(image.dataUrl);
                    const blob = await response.blob();
                    const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
                    this.images = [file];
                    this.sendImages();
                }
            } else {
                console.log('Permissão para usar a câmera foi negada');
            }
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
        }
    }

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
            const image = this.images[0];
            return typeof image === 'string' ? image : URL.createObjectURL(image);
        }
        return '';
    }

    deleteImage(): void {
        this.images = [];
    }

    async sendImages(): Promise<void> {
        if (this.images.length > 0) {
            const image = this.images[0];
            if (typeof image === 'string') {
                // Handle URL image (from camera)
                const response = await fetch(image);
                const blob = await response.blob();
                const file = new File([blob], 'uploaded_image.jpg', { type: 'image/jpeg' });
                this.imageService.storeFile(file);
            } else {
                // Handle File object (from file picker)
                this.imageService.storeFile(image);
            }
        } else {
            this.imageService.storeFile(null); 
        }
    }

    nextTab(): void {
        this.sendImages();
        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
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
