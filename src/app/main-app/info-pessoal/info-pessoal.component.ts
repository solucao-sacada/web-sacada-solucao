import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    ImageCroppedEvent,
    ImageCropperModule,
    LoadedImage,
} from 'ngx-image-cropper';
import { ComponentsModule } from 'src/app/components/components.module';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-info-pessoal',
    templateUrl: './info-pessoal.component.html',
    styles: [
        `
        img {
            object-fit: cover;
        }`,
    ],
    standalone: true,
    imports: [CommonModule, ImageCropperModule, ComponentsModule],
})
export class InfoPessoalComponent {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    visible = false;
    user: User = this.auth.getUser();

    constructor(private sanitizer: DomSanitizer, private auth: AuthService) {}

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
            event.objectUrl
        );
        // event.blob can be used to upload the cropped image
    }
    imageLoaded(image: LoadedImage) {
        this.visible = true;
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    save() {
        this.user.image = this.croppedImage;
        this.visible = false;
    }
}
