
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("EditGalleryPageController", EditGalleryPageController);


    function EditGalleryPageController(httpService, $window, $stateParams, $state) {

        var vm = this;
        vm.gallery = new Gallery();
        vm.showLargeImage = showLargeImage;
        vm.deleteCheckedPics = deleteCheckedPics;
        vm.goToAddPhotoToGalleryPage = goToAddPhotoToGalleryPage;

        activate();

        function activate() {
            vm.gallery.GalleryID = $stateParams.galleryId;
            httpService.getGalleryByID(vm.gallery.GalleryID)
                       .then(onSuccess);
        }
        function onSuccess(gallery) {
            vm.gallery = gallery;
        }

        function showLargeImage(path) {
            document.getElementById('viewer').innerHTML =
                "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
                "</div><img width='70%'  src='" + path + "'/>";
        }
        function deleteCheckedPics() {
            var ids = getCheckedPhotoIDs();
            if (ids != null)
                httpService.deletePhotosByIDs(ids)
                           .then(function () { removeCheckedPhotosInMarkup(ids) });

        }
        function goToAddPhotoToGalleryPage() {
            if (vm.gallery.GalleryID == 1)
                $state.go('add_photo_to_gallery_page', { galleryId: vm.gallery.GalleryID });
            else
                $state.go('add_photo_to_user_gallery_page', { galleryId: vm.gallery.GalleryID });
        }

        function removeCheckedPhotosInMarkup(ids) {
            for (var i = ids.length - 1; i >= 0; i--) {
                for (var k = vm.gallery.Pictures.length - 1; k >= 0; k--) {
                    var pictureID = vm.gallery.Pictures[k].PictureID;
                    var checkedId = ids[i];
                    if (pictureID === checkedId) {
                        vm.gallery.Pictures.splice(k, 1);
                    }
                }
            }
        }
        function getCheckedPhotoIDs() {
            var ids = [];
            for (var i = 0; i < vm.gallery.Pictures.length; i++) {
                var item = vm.gallery.Pictures[i];
                if (item.Checked) {
                    ids.push(item.PictureID);
                }
            }
            return ids;
        }

    }

})()