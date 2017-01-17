
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("AddPhotoToGalleryPageController", AddPhotoToGalleryPageController);


    function AddPhotoToGalleryPageController(httpService, $window, $stateParams, $scope) {

        var vm = this;
        vm.picture = new NewGalleryPicture(null,null,null);
        vm.saveImages = saveImages;
        vm.headerName = "";

        $scope.uploadLargeImg = uploadLargeImg;
        $scope.uploadThumbnail = uploadThumbnail;

        activate();

        function activate() {
            var id = $stateParams.galleryId;
            vm.picture.GalleryID = (id == null) ? 1 : id;
            if (id > 1)
                vm.headerName = "Додати фотографiю до галереї користувача #" + id
            else
                vm.headerName = "Додати фотографiю на сторiнку \"Галерея\" (роздiл меню)";
        }

        function uploadLargeImg(element) {
            if (element.files && element.files[0]) {
                var fileToUpload = element.files[0];
                httpService.upload(fileToUpload)
                           .then(uploadLargeImgSucceded);
            }
        }
        function uploadLargeImgSucceded(data) {
            vm.picture.LargeImagePath = data;
        }
        function uploadThumbnail(element) {
            if (element.files && element.files[0]) {
                var fileToUpload = element.files[0];
                httpService.upload(fileToUpload)
                           .then(uploadThumbnailSucceded);
            }
        }
        function uploadThumbnailSucceded(data) {
            vm.picture.ThumbnailImagePath = data;
        }
        function saveImages() {
            if (vm.picture.ThumbnailImagePath != null && vm.picture.LargeImagePath != null) {
                httpService.addPhotoToGallery(vm.picture)
                           .then(onSuccess);
            }
            else {
                $window.alert('Ви обрали не всi зображення.');
            }
        }
        function onSuccess(data) {
            var form = document.getElementById("addPhotoForm");
            form.reset();
            vm.picture.ThumbnailImagePath = "";
            vm.picture.LargeImagePath = "";
        }

    }

})()