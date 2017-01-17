
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("GalleryPageController", GalleryPageController);


    function GalleryPageController($stateParams) {

        var vm = this;
        vm.galleryId = $stateParams.galleryId;
        vm.pageName ="";

        activate();

        function activate() {
            if ($stateParams.galleryId == 1) {
                vm.pageName = "ГАЛЕРЕЯ (роздiл меню)";
            }
            else {
                vm.pageName = "галереї користувача";
            }
        }
    }

})()