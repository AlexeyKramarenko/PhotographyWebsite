import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { Inject } from '@angular/core';

import { HttpService } from "../http.service";
import { Message } from '../viewmodels';
 

@Component({
    selector: 'contacts-app',
    templateUrl: 'app/contacts/contacts.component.html',
    styleUrls: ['app/contacts/contacts.component.css'],
    providers: [HttpService]
})

export class ContactsComponent {

    public msg: Message = new Message();

    constructor( @Inject(HttpService) private httpService: HttpService) { }

    submitMessage() {
         
            this.httpService
                .postMessage(this.msg)
                .subscribe((text) => {
                    alert(text);
                    this.msg.Name = "";
                    this.msg.Email = "";
                    this.msg.Text = "";                    
                });        
    }

}