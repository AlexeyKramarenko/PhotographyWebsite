import { Component, ViewChild , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';

import { HttpService } from "../../http.service";
import { Gallery } from '../../viewmodels';

@Component({
    selector: 'edit-gallery-page-app',
    templateUrl: `app/admin/edit.gallery.page/edit.gallery.page.component.html`,
    styleUrls: ['app/admin/edit.gallery.page/edit.gallery.page.component.css'],
    providers: [HttpService]
})
export class EditGalleryPageComponent implements OnInit {

    gallery: Gallery = new Gallery();

    constructor( @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, @Inject(HttpService) private httpService: HttpService) {
        let id = activatedRoute.snapshot.params['galleryId'];
        this.gallery.GalleryID = (id != null) ? id : 1;
    }
    ngOnInit() {
        this.httpService
            .getGalleryByID(this.gallery.GalleryID)
            .subscribe((data) => this.onSuccess(data));
    }
    onSuccess(data: Gallery) {
        this.gallery = data;
    }

    public showLargeImage(path: string) {
        document.getElementById('viewer').innerHTML =
            "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
            "</div><img width='70%'  src='" + path + "'/>";
    }
    public deleteCheckedPics() {

        let ids = this.getCheckedPhotoIDs();

        this.httpService
            .deletePhotosByIDs(ids)
            .subscribe((data: any) => this.removeCheckedPhotosInMarkup(ids));
    }

    getCheckedPhotoIDs(): number[] {
        let ids: number[] = new Array<number>();

        for (var i = 0; i < this.gallery.Pictures.length; i++) {
            let item = this.gallery.Pictures[i];
            if (item.Checked) {
                ids.push(item.PictureID);
            }
        }
        return ids;
    }
    removeCheckedPhotosInMarkup(ids: number[]) {

        for (var i = ids.length - 1; i >= 0; i--) {
            for (var k = this.gallery.Pictures.length - 1; k >= 0; k--) {
                let pictureID = this.gallery.Pictures[k].PictureID;
                let checkedId = ids[i];
                if (pictureID === checkedId) {
                    this.gallery.Pictures.splice(k, 1);
                }
            }
        }
    }
}