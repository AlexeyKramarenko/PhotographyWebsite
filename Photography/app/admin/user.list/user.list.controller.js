
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("UserListController", UserListController);


    function UserListController(httpService, $window) {

        var vm = this;
        vm.users = [];
        vm.removeUser = removeUser;

        activate();

        function activate() {
            getUserList();
        }
        function getUserList() {
            httpService.getUserList()
                       .then(onSuccess);
        }
        function removeUser(galleryId, username) {
            var result = confirm("При видаленi цього користувача (" + username + ") будуть видаленi всi його фото, а також всi пов'язанi з ним замовлення. Продовжити?")
            if (result === true)
                httpService.deleteUserByName(username)
                           .then(function (msg) { removeUserSucceded(msg, galleryId); });

        }
        function removeUserSucceded(msg, galleryId) {

            $window.alert(msg);

            for (var i = 0; i < vm.users.length; i++) {
                if (vm.users[i].GalleryID === galleryId) {
                    vm.users.splice(i, 1);
                    return;
                }
            }
        }
        function onSuccess(data) {

            for (var i = 0; i < data.length; i++) {
                var jsonDate = data[i].CreatedDate.toString();
                var date = new Date(parseInt(jsonDate.substr(6)));
                data[i].FormatedCreatedDate = date.toLocaleDateString();
            }
            vm.users = data;
        }
    }

})()