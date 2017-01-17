
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("GalleryController", GalleryController);


    function GalleryController(httpService, $window) {
         
        activate();

        function activate() {
            httpService.getGalleryByID(1)
                       .then(onSuccess, onError);
        } 
        function onSuccess(data) {            
            if (data != null && data.Pictures.length > 0) {
                var elem = document.getElementById('gallery1');
                var child  = "";
                for (var i = 0; i < data.Pictures.length; i++)
                    child += "<a href='#'>" +
                                "<img alt='' src = '" + data.Pictures[i].ThumbnailImagePath + "' data-image = '" + data.Pictures[i].LargeImagePath + "' style = 'display:none' />" +
                             "</a>";
                elem.innerHTML = child;
                jQuery('#gallery1').unitegallery({
                    tiles_type: 'justified'
                });            
            }
        }
        function onError(error) {
            $window.alert('Виникли деякi помилки. Спробуйте пiзнiше.');
        }
    }

})()