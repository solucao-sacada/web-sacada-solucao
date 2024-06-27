// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//     providedIn: 'root',
// })
// export class ImageService {
//     apiUrl = environment.API_URL + '/images';

//     constructor(private http: HttpClient) {}

//     uploadImageUser(idUser: string, file: File): Observable<any> {
//         const formData = new FormData();
//         formData.append('image', new Blob([file]), file.name);
//         return this.http.post<any>(this.apiUrl + '/user/' + idUser, formData);
//     }

//     uploadOrderImageFromLocalStorage(idOrder: string): Observable<any> {
//         const formData = new FormData();
//         const file = this.dataURItoBlob();
//         formData.append('images', file, `image.${file.type.split('/')[1]}`);
//         return this.http.post<any>(this.apiUrl + '/order/' + idOrder, formData);
//     }

//     storeFile(base64Image: string | null) {
//         if (base64Image) {
//           localStorage.setItem('imagemBase64', base64Image);
//         }
//       }

//     dataURItoBlob() {
//         const dataURI = localStorage.getItem('imagemBase64');
//         if (dataURI) {
//             const byteString = atob(dataURI.split(',')[1]);
//             const ab = new ArrayBuffer(byteString.length);
//             const ia = new Uint8Array(ab);

//             for (let i = 0; i < byteString.length; i++) {
//                 ia[i] = byteString.charCodeAt(i);
//             }

//             return new Blob([ab], { type: 'image/jpeg' });
//         }
//         return null;
//     }

//     get getImageUrl() {
//         const image = this.dataURItoBlob();
//         if (image) return URL.createObjectURL(image);
//         return '';
//     }


// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    apiUrl = environment.API_URL + '/images';

    constructor(private http: HttpClient) {}

    uploadImageUser(idUser: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', new Blob([file]), file.name);
        return this.http.post<any>(this.apiUrl + '/user/' + idUser, formData);
    }

    uploadOrderImageFromLocalStorage(idOrder: string, formData: FormData): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/order/' + idOrder, formData);
    }

    storeFile(base64Image: string | null) {
        if (base64Image) {
          localStorage.setItem('imagemBase64', base64Image);
        }
      }

    dataURItoBlob() {
        const dataURI = localStorage.getItem('imagemBase64');
        if (dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], { type: 'image/jpeg' });
        }
        return null;
    }

    get getImageUrl() {
        const image = this.dataURItoBlob();
        if (image) return URL.createObjectURL(image);
        return '';
    }


}
