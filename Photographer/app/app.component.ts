import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template:  `
                <a id='homeLink' routerLink="/home"></a>
                <a id='contactsLink' routerLink="/contacts"></a>
                <a id='galleryLink' routerLink="/gallery" ></a>
                <a id='loginLink' routerLink="/login"></a> 
                <a id='servicesLink' routerLink="/services"></a>  

                <router-outlet></router-outlet>`
})
export class AppComponent { }

                                                                                                                                                                                                            