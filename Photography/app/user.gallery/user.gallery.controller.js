
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("UserGalleryController", UserGalleryController);


    function UserGalleryController(httpService, $window, $stateParams) {

        var vm = this;
        vm.gallery = new Gallery();
        vm.comment = "";
        vm.showLargeImage = showLargeImage;
        vm.orderPhotos = orderPhotos;

        activate();

        function activate() {
            vm.gallery.GalleryID = $stateParams.galleryId;
            getUserGallery(vm.gallery.GalleryID);
        }

        function getUserGallery(galleryId) {
            httpService.getGalleryByID(galleryId)
                       .then(getUserGallerySucceded)
                       .catch(onError);
        }
        function getUserGallerySucceded(data) {
            for (var i = 0; i < data.Pictures.length; i++)
                data.Pictures[i].Checked = true;

            vm.gallery.Pictures = data.Pictures;
        }
        function showLargeImage(path) {
            document.getElementById('viewer').innerHTML =
                "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
                "</div><img width='70%'  src='" + path + "'/>";
        }
        function orderPhotos() {
            var order = new Order(vm.gallery.GalleryID, vm.comment, []);
            var pics = vm.gallery.Pictures;
            for (var i = 0; i < pics.length; i++) {
                if (pics[i].Checked === true) {
                    order.PictureIDs.push(pics[i].PictureID);
                }
            }
            httpService.order(order)
                       .then($window.alert)
                       .catch(onError);
        }
        function onError(error) {
            $window.alert('Виникли деякi помилки. Спробуйте пiзнiше.');
        }
    }

})()