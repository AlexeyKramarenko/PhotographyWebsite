
(function () {
    'use strict';

    angular.module("photography.app")
           .factory("httpService", httpService);

    function httpService($http) {

        var service = {
            upload: upload,
            addPhotoToGallery: addPhotoToGallery,
            createUser: createUser,
            deleteGalleryByID: deleteGalleryByID,
            deleteUserByName: deleteUserByName,
            deleteOrderByID: deleteOrderByID,
            deletePhotosByIDs: deletePhotosByIDs,
            getArticleByPageName: getArticleByPageName,
            getGalleryByID: getGalleryByID,
            getOrderByID: getOrderByID,
            getOrderList: getOrderList,
            getUserList: getUserList,
            loginUser: loginUser,
            order: order,
            postMessage: postMessage,
            updateArticle: updateArticle
        }
        return service;

        function upload(file) {
            var data = new FormData();
            data.append("file", file);

            return $http.post("/gallery/Upload", data, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } })
                        .then(onSuccess)
                        .catch(onError);
        }
        function addPhotoToGallery(pic) {
            var json = JSON.stringify(pic);
            return $http.post("/gallery/AddPhotoToGallery", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function createUser(user) {
            var json = JSON.stringify(user);
            return $http.post("/user/CreateUser", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function deleteGalleryByID(galleryId) {
            var url = "/gallery/DeleteGalleryByID/" + galleryId;
            return $http.delete(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function deleteUserByName(username) {
            var url = "/user/RemoveUserByName/" + username;
            return $http.delete(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function deleteOrderByID(id) {
            var url = "/order/DeleteOrderByID/" + id;
            return $http.delete(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function deletePhotosByIDs(ids) {
            var json = JSON.stringify(ids);
            return $http.post("/gallery/DeletePhotosByIDs", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function getArticleByPageName(pageName) {
            var url = "/article/GetArticleByPageName/" + pageName;
            return $http.get(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function getGalleryByID(galleryId) {
            var url = "/gallery/GetGalleryByID/" + galleryId;
            return $http.get(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function getOrderByID(orderId) {
            var url = "/order/GetOrderByID/" + orderId;
            return $http.get(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function getOrderList() {
            var url = "/order/GetOrderList";
            return $http.get(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function getUserList() {
            var url = "/user/GetUserList";
            return $http.get(url)
                        .then(onSuccess)
                        .catch(onError);
        }
        function loginUser(login) {
            var json = JSON.stringify(login);
            return $http.post("/user/Login", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function order(order) {
            var json = JSON.stringify(order);
            return $http.post("/order/Order", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function postMessage(msg) {
            var json = JSON.stringify(msg);
            return $http.post("/home/SendMessage", json)
                        .then(onSuccess)
                        .catch(onError);
        }
        function updateArticle(id, article) {
            var url = "/article/UpdateArticle/" + id;
            var data = JSON.stringify(article);
            return $http.put(url, data)
                        .then(onSuccess)
                        .catch(onError);
        }


        function onSuccess(data) {
            return data.data;
        }
        function onError(data) {
            console.log(data);
        }
    }

})()
