import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Response, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import {
    Article, Message, Picture, PictureItem, NewGalleryPicture, GalleryItem,
    Order, OrderItem, UserItem, NewUser, Login, Gallery, UserOrder
} from "./viewmodels";


@Injectable()
export class HttpService {

    constructor( @Inject(Http) private http: Http) { }

    upload(file: any): Observable<any> {
        let data = new FormData();
        data.append("file", file);

        return this.http.post("/gallery/Upload", data)
            .map((resp: Response) => resp)
            .catch(this.catchBadResponse);        
    }
    addPhotoToGallery(pic: NewGalleryPicture): Observable<any> {
        let json = JSON.stringify(pic);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/gallery/AddPhotoToGallery", json, { headers: headers })
            .map((resp: Response) => resp.json().data);
    }
    createUser(user: NewUser): Observable<any> {
        let json = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/user/CreateUser", json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.catchBadResponse);
    }
    deleteGalleryByID(galleryId: number): Observable<any> {
        return this.http.delete("/gallery/DeleteGalleryByID/" + galleryId)
            .map((resp: Response) => resp.json());
    }
    deleteUserByName(username: string): Observable<any> {
        return this.http.delete("/user/RemoveUserByName/" + username)
            .map((resp: Response) => resp.json());
    }
    deleteOrderByID(id: number): Observable<any> {
        return this.http.delete("/order/DeleteOrderByID/" + id)
            .map((resp: Response) => resp.json());
    }
    deletePhotosByIDs(ids: number[]): Observable<any> {
        let json = JSON.stringify(ids);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/gallery/DeletePhotosByIDs", json, { headers: headers })
            .map((resp: Response) => resp.json());
    }
    getArticleByPageName(pageName: string): Observable<any> {
        return this.http.get("/article/GetArticleByPageName/" + pageName)
            .map((resp: Response) => <Article>resp.json())
            .catch(this.catchBadResponse);
    }
    getGalleryByID(galleryId: number): Observable<any> {
        return this.http.get("/gallery/GetGalleryByID/" + galleryId)
            .map((resp: Response) => <Gallery>resp.json())
            .catch(this.catchBadResponse);
    }

    getOrderByID(orderId: number): Observable<any> {
        return this.http.get("/order/GetOrderByID/" + orderId)
            .map((resp: Response) => <UserOrder>resp.json())
            .catch(this.catchBadResponse);
    }
    getOrderList(): Observable<any> {
        return this.http.get("/order/GetOrderList")
            .map((resp: Response) => <OrderItem[]>resp.json())
            .catch(this.catchBadResponse);
    }
    getUserList(): Observable<any> {
        return this.http.get("/user/GetUserList")
            .map((resp: Response) => <UserItem[]>resp.json())
            .catch(this.catchBadResponse);
    }
    loginUser(login: Login): Observable<any> {
        let json = JSON.stringify(login);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/user/Login", json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.catchBadResponse);
    }
    order(order: Order): Observable<any> {
        let json = JSON.stringify(order);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/order/Order", json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.catchBadResponse);
    }
    postMessage(msg: Message): Observable<any> {
        let json = JSON.stringify(msg);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post("/home/SendMessage", json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.catchBadResponse);
    }
    updateArticle(id:number, article: Article): Observable<any> {
        let json = JSON.stringify(article);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.put("/article/UpdateArticle/"+id, json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.catchBadResponse);
    }
    private catchBadResponse(err: any, source: Observable<any>) {
        // log and handle the exception
        return new Observable();
        //alert(err.statusText);
    }



}