import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { HttpService } from "../../http.service";
import { Article } from '../../viewmodels';

declare var tinymce: any;
declare var tinyMCE: any;

@Component({
    selector: 'edit-service-page-app',
    templateUrl: `app/admin/edit.service.page/edit.service.page.component.html`,
    styleUrls: ['app/admin/edit.service.page/edit.service.page.component.css'],
    providers: [HttpService]
})
export class EditServicePageComponent implements OnInit {

    article: Article = new Article(null);
    
    constructor(@Inject(HttpService) private httpService: HttpService) {
    }

    ngOnInit() {
        
        tinymce.init({
            selector: 'textarea',
            height: 250,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
            image_advtab: true,
            templates: [
                { title: 'Test template 1', content: 'Test 1' },
                { title: 'Test template 2', content: 'Test 2' }
            ],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });

        this.httpService
            .getArticleByPageName("Послуги")
            .subscribe((article: Article) => this.onSuccess(article));
    }

    onSuccess(article: Article) {
        this.article = article;
        tinyMCE.activeEditor.setContent(article.Text);
    }

    updateArticle() {
        this.article.Text = tinyMCE.activeEditor.getContent({ format: 'html' });          
        this.httpService
            .updateArticle(this.article.ArticleID, this.article)
            .subscribe((data) => alert(data));
    }
}