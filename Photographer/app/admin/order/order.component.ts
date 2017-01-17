import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';

import { HttpService } from "../../http.service";
import { UserOrder } from '../../viewmodels';

@Component({
    selector: 'order-app',
    templateUrl: `app/admin/order/order.component.html`,
    styleUrls: ['app/admin/order/order.component.css'],
    providers: [HttpService]
})
export class OrderComponent implements OnInit {

    order: UserOrder = new UserOrder();

    constructor( @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, @Inject(HttpService) private httpService: HttpService) {
        this.order.ID = activatedRoute.snapshot.params['orderId']; 
    }
    ngOnInit() {
        this.getOrder(this.order.ID);
    }

    getOrder(orderId: number) {
        this.httpService
            .getOrderByID(orderId)
            .subscribe((data) => this.getOrderSucceded(data));
    }
    getOrderSucceded(data: UserOrder) {
        this.order.Pictures = data.Pictures;
        this.order.Username = data.Username;
        this.order.Comment = data.Comment;
    }

    public showLargeImage(path: string) {
        document.getElementById('viewer').innerHTML =
            "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
            "</div><img width='70%'  src='" + path + "'/>";
    }
}