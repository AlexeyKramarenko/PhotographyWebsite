import { Component, Inject, OnInit } from '@angular/core';

import { Gallery } from "../viewmodels";
import { HttpService } from "../http.service";

declare var jQuery: any;
declare var ga: any;

@Component({
    selector: 'gallery-app',
    template: `
                <div id="wrapper">
                    <div id='gallery1' style='margin:0px auto;display:none;'>  
                    </div>
                </div>
                `
})
export class GalleryComponent implements OnInit {


    constructor( @Inject(HttpService) private httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService
            .getGalleryByID(1)
            .subscribe((data) => this.onSuccess(data));
    }

    onSuccess(data: Gallery) {

        if (data != null && data.Pictures.length > 0) {
            let elem = document.getElementById('gallery1');
            let child: string = "";

            for (let i = 0; i < data.Pictures.length; i++)
                child += "<a href='#'>" +
                            "<img alt='' src = '" + data.Pictures[i].ThumbnailImagePath + "' data-image = '" + data.Pictures[i].LargeImagePath + "' style = 'display:none' />" +
                         "</a>";

            elem.innerHTML = child;

            jQuery('#gallery1').unitegallery({
                tiles_type: 'justified'
            });
            
        }
    }

}




