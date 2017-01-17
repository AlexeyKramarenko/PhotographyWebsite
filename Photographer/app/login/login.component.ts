import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';

import { HttpService } from "../http.service";
import { Login } from '../viewmodels';

@Component({
    selector: 'login-app',
    templateUrl: `app/login/login.component.html`,
    styleUrls: ['app/login/login.component.css'],
    providers: [HttpService]
})
export class LoginComponent {

    login: Login = new Login();

    constructor( @Inject(Router) private router: Router, @Inject(HttpService) private httpService: HttpService) { }

    public loginUser(): void {

        this.httpService
            .loginUser(this.login)
            .subscribe(
            res => this.redirect(res),
            error => this.onError(error));
    }

    redirect(data: any) {
        if (data.isAdmin === true)
            this.router.navigate(['./admin']);
        else {
            this.router.navigate(['./user_gallery', data.galleryId]);
        }
    }

    onError(error) {
        alert("Ви ввели невiрне iм'я або пароль.")
    }

}