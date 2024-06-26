import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';


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
    capturedImage: string;
    visibleChoice: boolean = false; // para o p-dialog de escolha

    constructor(
        public pedidoService: PedidoService,
        private imageService: ImageService,
        private toaster: ToasterService,
        private platform: Platform
    ) { }

    openCameraOrGallery() {
        this.visibleChoice = true; // Abre o diálogo de escolha
      }

      async selectSource(source: 'camera' | 'gallery') {
        this.visibleChoice = false; // Fecha o diálogo de escolha

        if (Capacitor.isNativePlatform()) {
          const permissions = await Camera.requestPermissions();
          if (permissions.camera === 'denied' || permissions.photos === 'denied') {
            this.toaster.warn('Permissão negada');
            return;
          }

          try {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos,
            });

            if (image) {
              this.images.push(image.dataUrl);
              this.sendImages();
            }
          } catch (error) {
            console.error('Erro ao obter a foto:', error);
          }
        }
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

    deleteImage(index: number) {
        this.images.splice(index, 1);
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
