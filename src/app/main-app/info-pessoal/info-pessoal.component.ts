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
import { ImageService } from 'src/app/services/image.service';

@Component({
    selector: 'app-info-pessoal',
    templateUrl: './info-pessoal.component.html',
    styles: [
        `
            img {
                object-fit: cover;
            }
        `,
    ],
    standalone: true,
    imports: [CommonModule, ImageCropperModule, ComponentsModule],
})
export class InfoPessoalComponent {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    visible = false;
    user: User = this.auth.getUser();
    isEdit = false;

    constructor(
        private sanitizer: DomSanitizer,
        private auth: AuthService,
        private imageService: ImageService
    ) {}

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
        this.imageService
            .uploadImageUser(this.user._id, this.croppedImage)
            .subscribe((data) => {
                console.log(data);
                this.user.image = this.croppedImage;
                this.visible = false;
            });
    }
}
