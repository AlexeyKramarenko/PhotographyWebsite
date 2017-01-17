import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { HttpService } from "../../http.service";
import { OrderItem } from '../../viewmodels';

@Component({
    selector: 'order-list-app',
    templateUrl: `app/admin/order.list/order.list.component.html`,
    styleUrls: [`app/admin/order.list/order.list.component.css`],
    providers: [HttpService]
})
export class OrderListComponent implements OnInit {

    items: OrderItem[];

    constructor( @Inject(HttpService) private httpService: HttpService) { }

    ngOnInit() {
        this.getOrderList();
    }

    getOrderList() {
        this.httpService
            .getOrderList()
            .subscribe((data: OrderItem[]) => this.getOrderListSucceded(data))
    }

    private getOrderListSucceded(items: OrderItem[]) {

        for (let i = 0; i < items.length; i++) {
            let jsonDate = items[i].OrderDate.toString();
            let date = new Date(parseInt(jsonDate.substr(6)));
            items[i].FormatedOrderDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }

        this.items = items;
    }
     
    removeOrder(orderId: number) {
        this.httpService
            .deleteOrderByID(orderId)
            .subscribe((msg: string) => alert(msg));
    }
}