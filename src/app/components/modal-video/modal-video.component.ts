import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-modal-video',
    templateUrl: './modal-video.component.html',
    styleUrls: ['./modal-video.component.scss'],
})
export class ModalVideoComponent {
    @Input() urlVideo =
        'https://www.youtube.com/embed/u46qWPLSf6I?si=Wl21DMwyFBaEXemT';
    visible: boolean = false;

    showModal() {
        this.visible = true;
    }
}
