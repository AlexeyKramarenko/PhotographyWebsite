import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';


import { HttpService } from "../http.service";
import { Gallery, Order, Picture } from '../viewmodels';

@Component({
    selector: 'user-gallery-app',
    templateUrl: `app/user.gallery/user.gallery.component.html`,
    styleUrls: [`app/user.gallery/user.gallery.component.css`],
    providers: [HttpService]
})
export class UserGalleryComponent implements OnInit {

    @ViewChild('comment') comment;

    gallery: Gallery = new Gallery();


    constructor( @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, @Inject(HttpService) private httpService: HttpService) {
        this.gallery.GalleryID = activatedRoute.snapshot.params['galleryId'];
    }
    ngOnInit() {
        this.getUserGallery(this.gallery.GalleryID);
    }
    public getUserGallery(galleryId: number) {
        this.httpService
            .getGalleryByID(galleryId)
            .subscribe((data: Gallery) => this.getUserGallerySucceded(data));
    }
    public showLargeImage(path: string) {
        document.getElementById('viewer').innerHTML =
            "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
            "</div><img width='70%'  src='" + path + "'/>";
    }
    public orderPhotos() {
        let order = new Order(); 
        order.GalleryID = this.gallery.GalleryID;
        order.Comment = this.comment.nativeElement.innerText;
        let pics = this.gallery.Pictures;
        for (let i = 0; i < pics.length; i++) {
            if (pics[i].Checked === true) {
                order.PictureIDs.push(pics[i].PictureID);
            }
        }
        this.httpService
            .order(order)
            .subscribe((data: any) => this.orderPhotosSucceded(data));
    }


    private orderPhotosSucceded(msg: string) {
        alert(msg);
    }
    private getUserGallerySucceded(data: Gallery) {
        for (let i = 0; i < data.Pictures.length; i++)
            data.Pictures[i].Checked = true;

        this.gallery.Pictures = data.Pictures;
    }

}
