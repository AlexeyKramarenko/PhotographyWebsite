
import { Component, OnInit, Inject } from '@angular/core';

import { HttpService } from "../../http.service";
import { UserItem } from '../../viewmodels';

@Component({
    selector: 'user-list-app',
    templateUrl: `app/admin/user.list/user.list.component.html`,
    styleUrls: [`app/admin/user.list/user.list.component.css`],
    providers: [HttpService]

})
export class UserListComponent implements OnInit {

    users: UserItem[] = new Array<UserItem>();

    constructor( @Inject(HttpService) private httpService: HttpService) { }

    
    ngOnInit() {
        this.getUserList();
    }
    getUserList() {
        this.httpService.getUserList()
            .subscribe((data) => this.onSuccess(data));
    }
    onSuccess(data: UserItem[]) {

        for (let i = 0; i < data.length; i++) {
            let jsonDate = data[i].CreatedDate.toString();
            let date = new Date(parseInt(jsonDate.substr(6)));
            data[i].FormatedCreatedDate = date.toLocaleDateString();
        }
        this.users = data;
    }

    removeUser(galleryId: number, username: string) {
        let result: boolean = confirm("При видаленi цього користувача (" + username + ") будуть видаленi всi його фото, а також всi пов'язанi з ним замовлення. Продовжити?")
        if (result === true)
            this.httpService
                .deleteUserByName(username)
                .subscribe((msg: string) => this.removeUserSucceded(msg, galleryId));
    }
    removeUserSucceded(msg, galleryId) {

        alert(msg);

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].GalleryID === galleryId) {
                this.users.splice(i, 1);
                return;
            }
        }
    }
}
