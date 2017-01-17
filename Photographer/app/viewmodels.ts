

//Контакти
export class Message {

    Name: string;
    Email: string;
    Text: string;
}

//стр "Галлерея"
export class Picture {
    PictureID: number;
    LargeImagePath: string;
    ThumbnailImagePath: string;
}

//стр "Login"
export class Login {
    Username: string;
    Password: string;
}

export class PictureItem {
    PictureID: number;
    GalleryID: number;
    LargeImagePath: string;
    ThumbnailImagePath: string;
    Checked: boolean;
}

//галлерея юзера  
export class Gallery {
    GalleryID: number;
    Pictures: PictureItem[];
}

//ADMIN
//add.photo.to.gallery.page
//add.photo.to.user.gallery
export class NewGalleryPicture {
    GalleryID: number;
    LargeImagePath: string;
    ThumbnailImagePath: string;
}
//ADMIN
//edit.gallery.page
//edit.user.gallery
export class GalleryItem {
    PictureID: number;
    ThumbnailImagePath: string;
    Checked: boolean;
}

//user.gallery
export class Order {
    GalleryID: number;
    Comment: string;
    PictureIDs: number[] = new Array<number>();
}
//ADMIN
//user.gallery
export class UserOrder {
    ID: number;
    Username: string;
    Pictures: PictureItem[];
    Comment: string;
}
//ADMIN
//order.list
export class OrderItem {
    ID: number;
    Username: string;
    OrderDate: Date;
    FormatedOrderDate: string;
    GalleryID: number;
    //Comment: string;
}
//ADMIN
//user.list
export class UserItem {
    Username: string;
    CreatedDate: Date;
    GalleryID: number;
    FormatedCreatedDate: string;
}
//ADMIN
//add.user 
export class NewUser {
    Username: string;
    Password: string;
}

export class Article {
    ArticleID: number;
    Text: string;
    PageName: string;
    constructor(text: string) {        
        this.Text = text;
    }
}