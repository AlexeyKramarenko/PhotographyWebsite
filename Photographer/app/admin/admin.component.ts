import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'admin-app',
    templateUrl: `app/admin/admin.component.html`,
    styles: [
        `#links{
            margin: 15px auto;
            width: 720px;
            background-color: white;
            padding: 5px 0px 5px 5px;
            font-size: 18px;
            border:1px solid black;
        }`
    ]

})
export class AdminComponent {


}