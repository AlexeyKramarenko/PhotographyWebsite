
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';


import { HttpService } from "../../http.service";
import { NewGalleryPicture } from '../../viewmodels';


@Component({
    selector: 'add-photo-to-gallery-page-app',
    templateUrl: `app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.component.html`,
    styleUrls: ['app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.component.css'],
    providers: [HttpService]
})
export class AddPhotoToGalleryPageComponent {

    @ViewChild("largeImage") largeImage: any;
    @ViewChild("thumbnail") thumbnail: any;
    @ViewChild('form') form;

    public LargeImagePath: string;
    public Thumbnail: string;

    picture: NewGalleryPicture = new NewGalleryPicture();

    constructor( @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, @Inject(HttpService) private httpService: HttpService) {
        let id = activatedRoute.snapshot.params['galleryId'];
        this.picture.GalleryID = (id == null) ? 1 : id;
    }

    public uploadLargeImg() {
        let fi = this.largeImage.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.httpService
                .upload(fileToUpload)
                .subscribe(
                (data: any) => this.uploadLargeImgSucceded(data));
        }
    }
    uploadLargeImgSucceded(data) {
        this.picture.LargeImagePath = data.json();
        this.LargeImagePath = data.json();
    }
    public uploadThumbnail() {
        let fi = this.thumbnail.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.httpService
                .upload(fileToUpload)
                .subscribe((data: any) => this.uploadThumbnailSucceded(data));
        }
    }
    uploadThumbnailSucceded(data) {
        this.picture.ThumbnailImagePath = data.json();
        this.Thumbnail = data.json();
    }
    public saveImages() {
        if (this.largeImage != null && this.thumbnail != null) {
            
            this.httpService
                .addPhotoToGallery(this.picture)
                .subscribe((data: any) => this.onSuccess(data));

        }
        else {
            alert('Ви обрали не всi зображення.');
        }
    }

    onSuccess(data) {
        this.form.nativeElement.reset();
        this.LargeImagePath = null;
        this.Thumbnail = null;
    }
    onError(data) {
        alert(data);
    }
}