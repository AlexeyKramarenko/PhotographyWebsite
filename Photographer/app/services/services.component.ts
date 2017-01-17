import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { Article } from '../viewmodels';
import { HttpService } from '../http.service';

@Component({
    selector: 'services-app',
    templateUrl: `app/services/services.component.html`,
    styleUrls: ['app/services/services.component.css']
})
export class ServicesComponent implements OnInit {

    article: Article = new Article("");

    constructor( @Inject(HttpService) private httpService: HttpService) { }

    ngOnInit() {
        this.httpService
            .getArticleByPageName("Послуги")
            .subscribe((article: Article) => this.onSuccess(article));
    }

    onSuccess(article: Article) {
        this.article = article;
    }

}