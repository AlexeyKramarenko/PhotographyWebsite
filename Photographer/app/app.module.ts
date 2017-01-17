
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminCreateGalleryComponent } from './admin/admin.create.gallery/admin.create.gallery.component';
import { AdminEditGalleryComponent } from './admin/admin.edit.gallery/admin.edit.gallery.component';
import { AddPhotoToGalleryPageComponent } from './admin/add.photo.to.gallery.page/add.photo.to.gallery.page.component';
import { AddUserComponent } from './admin/add.user/add.user.component';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditServicePageComponent } from './admin/edit.service.page/edit.service.page.component';
import { EditGalleryPageComponent } from './admin/edit.gallery.page/edit.gallery.page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryPageComponent } from './admin/gallery.page/gallery.page.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from "./http.service";
import { LoginComponent } from './login/login.component';
import { UserGalleryComponent } from './user.gallery/user.gallery.component';
import { UserListComponent } from './admin/user.list/user.list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderComponent } from './admin/order/order.component';
import { OrderListComponent } from './admin/order.list/order.list.component';
import { ServicesComponent } from './services/services.component';


// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user_gallery/:galleryId', component: UserGalleryComponent },
    {
        path: 'admin', component: AdminComponent,

        children: [
            {
                path: 'gallery_page', component: GalleryPageComponent,
                children: [
                    { path: 'add_photo_to_gallery_page/:galleryId', component: AddPhotoToGalleryPageComponent },
                    { path: 'edit_gallery_page/:galleryId', component: EditGalleryPageComponent }
                ]
            },
            { path: 'edit_service_page', component: EditServicePageComponent },
            { path: 'edit_gallery_page/:galleryId', component: EditGalleryPageComponent },
            { path: 'add_photo_to_gallery_page/:galleryId', component: AddPhotoToGalleryPageComponent },
            { path: 'add_user', component: AddUserComponent },
            { path: 'user_list', component: UserListComponent },
            { path: 'order_list', component: OrderListComponent },
            { path: 'order/:orderId', component: OrderComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes)],
    providers: [HttpService],
    declarations: [AppComponent, HomeComponent, ContactsComponent, EditServicePageComponent, LoginComponent, UserGalleryComponent, AdminComponent,
        AdminEditGalleryComponent, AdminCreateGalleryComponent, ServicesComponent,
        GalleryComponent, NotFoundComponent, GalleryPageComponent, AddPhotoToGalleryPageComponent, AddUserComponent,
        EditGalleryPageComponent, OrderComponent, OrderListComponent, UserListComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }








