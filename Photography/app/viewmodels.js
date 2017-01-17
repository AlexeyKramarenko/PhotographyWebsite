
//Контакти
function Message(name, email, text) {
    this.Name = name;
    this.Email = email;
    this.Text = text;
}

//стр "Галлерея"
function Picture(pictureID, largeImagePath, thumbnailImagePath) {
    this.PictureID = pictureID;
    this.LargeImagePath = largeImagePath;
    this.ThumbnailImagePath = thumbnailImagePath;
}

//стр "Login"
function Login(username, password) {
    this.Username = username;
    this.Password = password;
}

function PictureItem(pictureID, galleryID, largeImagePath, thumbnailImagePath, checked) {
    this.PictureID = pictureID;
    this.GalleryID = galleryID;
    this.LargeImagePath = largeImagePath;
    this.ThumbnailImagePath = thumbnailImagePath;
    this.Checked = checked;
}

//галлерея юзера  
function Gallery(galleryID, pictures) {
    this.GalleryID = galleryID;
    this.Pictures = pictures;
}

//ADMIN
//add.photo.to.gallery.page
//add.photo.to.user.gallery
function NewGalleryPicture(galleryID, largeImagePath, thumbnailImagePath) {
    this.GalleryID = galleryID;
    this.LargeImagePath = largeImagePath;
    this.ThumbnailImagePath = thumbnailImagePath;
}
//ADMIN
//edit.gallery.page
//edit.user.gallery
function GalleryItem(pictureID, thumbnailImagePath, checked) {
    this.PictureID = pictureID;
    this.ThumbnailImagePath = thumbnailImagePath;
    this.Checked = checked;
}

//user.gallery
function Order(galleryID, comment, pictureIDs) {
    this.GalleryID = galleryID;
    this.Comment = comment;
    this.PictureIDs = pictureIDs;
}
//ADMIN
//user.gallery
function UserOrder(id, username, pictures, comment) {
    this.Id = id;
    this.Username = username;
    this.Pictures = pictures;
    this.Comment = comment;
}
//ADMIN
//order.list
function OrderItem(id, username, orderDate, formatedOrderDate, galleryID) {
    this.Id = id;
    this.Username = username;
    this.OrderDate = orderDate;
    this.FormatedOrderDate = formatedOrderDate;
    this.GalleryID = galleryID;
    //Comment: string;
}
//ADMIN
//user.list
function UserItem(username, createdDate, galleryID, formatedCreatedDate) {
    this.Username = username;
    this.CreatedDate = createdDate;
    this.GalleryID = galleryID;
    this.FormatedCreatedDate = formatedCreatedDate;
}
//ADMIN
//add.user 
function NewUser(username, password) {
    this.Username = username;
    this.Password = password;
}
function Article(articleID, text, pageName) {
    this.ArticleID = articleID;
    this.Text = text;
    this.PageName = pageName;
}